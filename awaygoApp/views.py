from django.shortcuts import render, redirect

from .models import *

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .decorators import unauthenticated_user, allowed_users

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *

from django.views.decorators.csrf import ensure_csrf_cookie

from datetime import datetime

# Create your views here.
def restaurant_menu(request):
    return render(request, 'restaurant-menu/build/index.html', context={})

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
def restaurant(request):
    return render(request, 'restaurant/build/index.html', context={})

@unauthenticated_user
def loginPage(request):

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            if user.is_superuser:
                return redirect('/admin')
            return redirect('restaurant')

    return render(request, 'awaygoApp/login.html', context={})

def logoutUser(request):
    logout(request)
    return redirect('loginPage')


# REST API's

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET', 'PUT'])
def my_restaurant(request):
    try:
        restaurant = request.user.restaurant
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        print(request.data)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def customers_list(request):
    customers = Customer.objects.filter(order__in=Order.objects.filter(restaurant=request.user.restaurant))
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def orders_list(request):
    orders = Order.objects.filter(restaurant=request.user.restaurant)
    serializer = DetailedOrderSerializer(orders, many=True)
    return Response(serializer.data)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def dishes_list(request):
    foodCategories = FoodCategory.objects.filter(restaurant=request.user.restaurant)
    dishes = Dish.objects.filter(category__in=foodCategories)
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def foodCategories_list(request, restaurant_pk):
    foodCategories = FoodCategory.objects.filter(restaurant=Restaurant.objects.get(id=restaurant_pk))
    serializer = FoodCategorySerializer(foodCategories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def restaurant_details(request, restaurant_pk):
    restaurant = Restaurant.objects.get(id=restaurant_pk)
    serializer = RestaurantSerializer(restaurant)
    return Response(serializer.data)


@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['PUT'])
def order_detail(request, order_pk):
    try:
        order = Order.objects.get(pk=order_pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def order_add(request):

    # example of correct input:
    # {
    #     "restaurant": 1,
    #     "city": "רעננה",
    #     "street": "תפוח",   not required
    #     "number": "2",      not required
    #     "apartment": "",    not required
    #     "customer": {
    #         "phone_number": "0544737689",
    #         "first_name": "יונה",
    #         "last_name": "מדרכי",
    #         "email": "asd@asd.com"  not required
    #     },
    #     "remark": "לא לאחר",  not required
    #     "dishes_in_order": [
    #         {
    #             "dish": 1,
    #             "remark": "בלי חריף",  not required
    #             "quantity": 5,
    #             "extras": ["1", "2", "3"] not required
    #         },
    #         {
    #             "dish": 2,
    #             "remark": "כולם לקום",
    #             "quantity": 4,
    #             "extras": []
    #         }
    #     ]
    # }

    # fixing IntegerField not accepting empty string
    if request.data["number"] == "":
            request.data["number"] = None
    if request.data["apartment"] == "":
        request.data["apartment"] = None

    customer = None

    # check if customer exists by phone_number
    if Customer.objects.filter(phone_number=request.data['customer']['phone_number']).exists():
        # if exists - use it
        print("customer exists")
        customer = Customer.objects.get(phone_number=request.data['customer']['phone_number']).id
    else:
        # if not - create a new customer with same address and use it
        print("customer doesn't exists, trying to create")
        
        customer = request.data["customer"]
        customer["city"] = request.data["city"]
        customer["street"] = request.data["street"]
        customer["number"] = request.data["number"]
        customer["apartment"] = request.data["apartment"]

        customerSerializer = CustomerSerializer(data=customer)
        if customerSerializer.is_valid():
            customer = customerSerializer.save().id
            print("New customer saved")
        else:
            print("Customer not valid")
            return Response(customerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    # create order with the customer

    order = {
        "restaurant": request.data["restaurant"],
        "remark": request.data["remark"],
        "customer": customer,
        "city": request.data["city"],
        "street": request.data["street"],
        "number": request.data["number"],
        "apartment": request.data["apartment"],
    }

    if "status" in request.data.keys():
        order["status"] = request.data["status"]

    if "date_time" in request.data.keys():
        order["date_time"] = request.data["date_time"]

    orderSerializer = OrderSerializer(data=order)
    if orderSerializer.is_valid():
        order = orderSerializer.save().id
        print("New order saved")
    else:
        print("New order not valid")
        return Response(orderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # create multiple dishes in order
    for dishInOrder in request.data["dishes_in_order"]:
        newDishInOrder = dishInOrder.copy()
        newDishInOrder["order"] = order

        dishInOrderSerializer = DishInOrderSerializer(data=newDishInOrder)
        if dishInOrderSerializer.is_valid():
            dishInOrderSerializer.save()
            print("Dish in order saved")
        else:
            print("Dish in order not valid")
            return Response(dishInOrderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    return Response(orderSerializer.data, status=status.HTTP_201_CREATED)

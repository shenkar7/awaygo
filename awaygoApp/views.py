from django.shortcuts import render, redirect

from .models import Dish, Customer, Order, FoodCategory, DishInOrder

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .decorators import unauthenticated_user, allowed_users

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CustomerSerializer, OrderSerializer, DishSerializer, DishInOrderSerializer

# Create your views here.

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
def restaurant(request):
    return render(request, 'index.html', context={})

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


# API's

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def customers_list(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def orders_list(request):
    orders = Order.objects.filter(restaurant=request.user.restaurant)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def dishes_list(request):
    foodCategories = FoodCategory.objects.filter(restaurant=request.user.restaurant)
    dishes = Dish.objects.filter(category__in=foodCategories)
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data)

@login_required(login_url='loginPage')
@allowed_users(allowed_roles=['restaurant'])
@api_view(['GET'])
def dishes_in_order(request, order_pk):
    dishes_in_orders = None
    if Order.objects.get(id=order_pk) in Order.objects.filter(restaurant=request.user.restaurant):
        dishes_in_orders = DishInOrder.objects.filter(order=order_pk)
    serializer = DishInOrderSerializer(dishes_in_orders, many=True)
    return Response(serializer.data)
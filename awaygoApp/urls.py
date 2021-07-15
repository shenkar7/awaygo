from django.urls import path

from . import views

urlpatterns = [
    path('', views.loginPage, name='loginPage'),    # main login page
    path('logout', views.logoutUser, name='logout'),    # logout functionality
    path('restaurant', views.restaurant, name='restaurant'),    # page for restaurant staff
    path('my_restaurant', views.my_restaurant, name='my_restaurant'),    #  used by restaurant staff to see details and update: menu_open, delivery_cost 
    path('restaurant/<int:restaurant_pk>/', views.restaurant_details),    # used by restaurant_menu/?id=<id> for clients to see details
    path('restaurant_menu/', views.restaurant_menu, name='restaurant_menu'),     # clients restaurant page
    path('customers', views.customers_list),    # used by /restaurant for customer auto fill by phone
    path('order/<int:order_pk>/', views.order_detail),     # used by /restaurant to update order status and timing
    path('orders', views.orders_list),    # used by /restaurant for lsit of all orders
    path('dishes', views.dishes_list),    # used by restaurant for dishes list
    path('foodcategories/<int:restaurant_pk>/', views.foodCategories_list),     # used by restaurant and clients to see a full detailed menu
    path('order_add', views.order_add),    # used by staff or client to create an order
    path('dishes_visibility', views.dishes_visibility),     # used for staff to update all dishes visibility in once
]
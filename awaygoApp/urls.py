from django.urls import path

from . import views

urlpatterns = [
    path('', views.loginPage, name='loginPage'),    ### in use
    path('logout', views.logoutUser, name='logout'),    ### in use
    path('restaurant', views.restaurant, name='restaurant'),    ### in use
    path('my_restaurant', views.my_restaurant, name='my_restaurant'),
    path('restaurant/<int:restaurant_pk>/', views.restaurant_details),    ### in use
    path('restaurant_menu/', views.restaurant_menu, name='restaurant_menu'),     ### in use
    path('customers', views.customers_list),    ### in use
    path('order/<int:order_pk>/', views.order_detail),     ### in use
    path('orders', views.orders_list),    ### in use
    path('dishes', views.dishes_list),    ### in use
    path('foodcategories/<int:restaurant_pk>/', views.foodCategories_list),     ### in use
    # path('dishesinorder/<int:order_pk>/', views.dishes_in_order),
    path('order_add', views.order_add),    ### in use
]
from django.urls import path

from . import views

urlpatterns = [
    path('', views.loginPage, name='loginPage'),
    path('logout', views.logoutUser, name='logout'),
    path('restaurant', views.restaurant, name='restaurant'),
    path('restaurant_menu', views.restaurant_menu, name='restaurant_menu'),
    path('customers', views.customers_list),
    path('order/<int:order_pk>/', views.order_detail),
    path('orders', views.orders_list),
    path('dishes', views.dishes_list),
    path('foodCategories', views.foodCategories_list),
    path('dishesinorder/<int:order_pk>/', views.dishes_in_order),
]
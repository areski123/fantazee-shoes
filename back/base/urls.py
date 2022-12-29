from django.contrib import admin
from django.urls import path
from .views import user_views, product_views, order_views

urlpatterns = [
    # orders
    path('add_order', order_views.add_new_order),
    path('user_orders', order_views.get_user_orders),
    # signin
    path('login', user_views.MyTokenObtainPairView.as_view()),
    # signup
    path('register', user_views.register),
    # logout
    path('logout', user_views.do_logout),
    # products  
    path('products/<product_category>', product_views.getProductsByCategory),
    path('products/<product_category>/<name>', product_views.getProductsByName),
    #Admin paths
    path('posts/', product_views.ImageViews.as_view()),
    path('get_images', product_views.get_images),
    path('get_users', user_views.get_users),
    path('product_size', product_views.new_product_sizes),
    path('all_products', product_views.ProductView.as_view()),
    path('product/<id>', product_views.ProductDetailView.as_view()),
    path('orders', order_views.get_orders),
]

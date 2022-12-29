from rest_framework import serializers
from .models import *

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Image
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product 
        fields = '__all__'
        depth = 1

class DeliveryDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryDetail
        fields = '__all__'
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User 
        fields = ("id",'username','email', 'date_joined', 'is_superuser', 'date_joined')


class OrederDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderDetail
        fields = '__all__'
        depth = 2

class OrderSerializer(serializers.ModelSerializer):
    order_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order 
        fields = '__all__'
        depth = 2

    def get_order_details(self, object):
        items = object.orderdetail_set.all()
        serializer = OrederDetailSerializer(items,many=True)
        return serializer.data
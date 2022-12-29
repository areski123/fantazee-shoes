# Django Import
from rest_framework import status
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
# Local Import
from ..models import DeliveryDetail, Order, OrderDetail, Product
from ..serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_new_order(request):
    """
    Create a new order.
    """
    current_user = request.user
    data = request.data
    cart = data["cart"]
    delivery_details = data['deliveryDetails'][0]
    if not cart or len(cart) == 0:
        return Response({'detail': 'No Items in Cart', "status": status.HTTP_400_BAD_REQUEST})
    else:
        # (1) Create Delivery Details
        delivery = DeliveryDetail.objects.create(
            first_name=delivery_details['firstName'],
            last_name=delivery_details['lastName'],
            country=delivery_details['country'],
            city=delivery_details['city'],
            zip=delivery_details['zip'],
            mobile_phone=delivery_details['PhoneInput'],
        )
        # (2) Create Order
        new_order = Order.objects.create(
            user = current_user,
            delivery_details = delivery,
            total=data['total'],
            payment_method=data['paymentMethod'],
            shipping_price = data['shippingPrice'],
        )
        # (3) Create order detail
        for item in cart:
            product_cart = Product.objects.get(_id = item['productCart']['_id'])
            OrderDetail.objects.create(
                product = product_cart,
                order = new_order,
                quantity = item['productQuantity'],
                subtotal = item['subtotal']
            )
        # (4) Update Stock
            product_cart.count_in_stock -= item['productQuantity']
            product_cart.save()
        serializer = OrderSerializer(new_order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    """
    List user orders.
    """
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders(request):
    """
    List of all orders.
    """
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

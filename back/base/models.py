from django.db import models
from django.contrib.auth.models import User
from .modelsData import BRANDS, GENDER_CATEGORIES, TYPES, SIZES


class MetaModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        abstract = True


class Image(models.Model):
    title=models.CharField(max_length=100)
    image=models.ImageField(upload_to='Posted_Images')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'Product Images'


class Product(MetaModel):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50, choices=BRANDS)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL,null=True)
    gender_category = models.CharField(max_length=10, choices=GENDER_CATEGORIES)
    description = models.TextField(blank=True, null=True)
    size = models.CharField(max_length=2, choices=SIZES)
    type = models.CharField(max_length=50, choices=TYPES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    count_in_stock = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Products'


class DeliveryDetail(MetaModel):
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    country = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    zip = models.CharField(max_length=16)
    mobile_phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'Delivery Detail'

class Order(MetaModel):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    delivery_details = models.ForeignKey(DeliveryDetail, on_delete=models.SET_NULL,null=True)
    total = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    payment_method = models.CharField(max_length=20,null=True,blank=True)
    shipping_price = models.DecimalField(max_digits=5, decimal_places=2, null=True,blank=True)

    class Meta:
        db_table = 'Orders'


class OrderDetail(MetaModel):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order  = models.ForeignKey(Order,on_delete=models.CASCADE,null=True)
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField() 

    class Meta:
        db_table = 'Orders Detail'


    def __str__(self):
        return str(self.product)

# Django Import 
from django.http import JsonResponse
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
# Local Import
from ..models import Product, Image
from ..serializers import ImageSerializer, ProductSerializer


@api_view(['GET'])
def getProductsByCategory(request, product_category):
    """
    List products by gender category.
    """
    products = Product.objects.filter(gender_category = product_category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsByName(request,product_category, name):
    """
    List products by products name.
    """
    products = Product.objects.filter(name = name).exclude(count_in_stock = 0) #returns only products that are in stock
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)   


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_images(request):
    """
    List of all product images.
    """
    res = []
    for img in Image.objects.all():  # run on every row in the table...
        res.append({
            "_id": img.id,
            "title": img.title,
            "image":str(img.image)
                    })  # append row by to row to res list
    return JsonResponse(res, safe=False)  # return array as json response


@api_view(['POST'])
@permission_classes([IsAdminUser])
def new_product_sizes(request):
    """
    Create list of new products by sizes.
    """
    product = request.data['data']
    sizes = request.data['sizes']
    product_image = Image.objects.get(id = int(product["image"]["id"]))
    for s in sizes: #goes through the list of sizes and adds a new product with that size
        new_product = Product.objects.create(
            name = product["name"],
            brand = product["brand"],
            image = product_image,
            gender_category = product["gender_category"],
            description = product["description"],
            size = s['size'],
            type = product["type"],
            price = product["price"],
            count_in_stock = product["count_in_stock"],
        )
    message = {"detail":f"{len(sizes)} pair {product['name']} shoes were added"}
    return Response(message, status=status.HTTP_201_CREATED)



class ImageViews(APIView):
    parser_class = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]
    """
    Add a new product image to DB.
    """
    def post(self, request, *args, **kwargs):
        api_serializer = ImageSerializer(data=request.data)
        if api_serializer.is_valid():  # the serializer check the data
            api_serializer.save()  # save to DB (path,str) and save the actual file to directory
            return Response(api_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', api_serializer.errors)
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    permission_classes = [IsAdminUser]
    """
    List of all products, or create a new product.
    """
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        data=request.data
        product_image = Image.objects.get(id = int(data["image"]["_id"]))
        new_product = Product.objects.create(
            name = data["name"],
            brand = data["brand"]["name"],
            image = product_image,
            gender_category = data["category"]["category"],
            description = data["description"],
            size = data["size"]["size"],
            type = data["type"]["type"],
            price = data["price"],
            count_in_stock = data["quantity"]
        )
        product_serializer = ProductSerializer(new_product, many=False)
        return Response(product_serializer.data, status=status.HTTP_201_CREATED)


# Create a new Product
class ProductDetailView(APIView):
    parser_class = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]
    """
    Retrieve, update or delete a product.
    """
    # Get single products
    def getProduct(self, id):
        try:
            return Product.objects.get(_id=id)
        except Product.DoesNotExist:
            raise Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, id):
        product = self.getProduct(id)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    
    def delete(self, request, id):
        product = self.getProduct(id)
        product.delete()
        return Response({'id': id})

    def put(self, request, id):
        data = request.data
        price = (float(data["price"]))
        product = self.getProduct(id)
        product.name = data["name"]
        product.brand = data["brand"]
        product.count_in_stock = data["quantity"]
        product.image = Image.objects.get(id = int(data["image"]["id"]))
        product.gender_category = data["category"]
        product.description = data["description"]
        product.size = data["size"]
        product.type = data["type"]
        product.price = price
        product.save()
        
        product_serializer = ProductSerializer(product, many=False)
        return Response(product_serializer.data, status=status.HTTP_201_CREATED)
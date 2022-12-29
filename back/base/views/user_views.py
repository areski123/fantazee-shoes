# Django Import 
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.http import JsonResponse
# Rest Framework Import
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
# Rest Framework JWT Import
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# Local Import 
from ..serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_admin'] = user.is_superuser
        return token

#  signin/Login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# signup/register
@api_view(['POST'])
def register(request):
    data = request.data
    try:
        User.objects.create_user(
            password = data["password"],
            username = data["username"],
            email = data["email"]
        )
        return JsonResponse({"Register user": data["username"]})
    except:
        message = {"detail":"User with this email is already registered"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def do_logout(request):
    logout(request)
    return Response({"detail":"logout"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    """
    List of all users.
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)




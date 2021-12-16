from rest_framework import generics, views
from rest_framework.decorators import api_view
from .models import City, User
from .serializers import PasswordResetSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model, authenticate
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_403_FORBIDDEN
from rest_framework.authtoken.models import Token
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token
from django.core.mail import send_mail
from django.conf import settings

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()

@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        if 'password' not in serializer.validated_data:
            return Response({ "error": "Password requiring for creating account" }, status=HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(**serializer.validated_data,  city=City.objects.get(id=1))
        current_site = get_current_site(request)
        mail_subject = 'Activate your account!'
        print(user)
        message = render_to_string('users/account_verify.html', {
            'user': user,
            'domain': current_site.domain,
            'path': 'user/verify-email',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user)
        })
        to_email = serializer.validated_data.get('email')
        send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])
        return Response(data={ "detail": "Account activation link was sent to your email. Please check your email!" },status=HTTP_200_OK)
    return Response({ "error": "Account couldn't be created with received data" }, status=HTTP_400_BAD_REQUEST)


def check_token(uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        return user
    else:
        return None


@api_view(['POST'])
def activate(request):
    uidb64 = request.data.get("uid")
    token = request.data.get("token")
    user = check_token(uidb64, token) 
    if user is not None:
        user.is_active = True
        user.save()
        auth_token, created = Token.objects.get_or_create(user=user)
        return Response({ "detail": "Your account was successfully activated" ,'token': auth_token.key }, status=HTTP_201_CREATED)
    else:
        return Response({ 'error': 'Activation link is invalid!' }, status=HTTP_403_FORBIDDEN)

@api_view(['POST'])
def reset_password_email(request):
    email = request.data.get("email")
    print(email)
    try:
        user = User.objects.get(email=email)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None:
        current_site = get_current_site(request)
        mail_subject = 'Confirm your email!'
        print(user)
        message = render_to_string('users/account_verify.html', {
            'user': user,
            'domain': current_site.domain,
            'path': 'user/password-reset',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user)
        })
        send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [email])
        return Response({ "detail": "Password reset confirmation link was sent to your email. Please check your email!" },status=HTTP_200_OK)
    else:
        return Response({ "error": "User with this email doesn't exist" },status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def reset_password(request):
    serilizer = PasswordResetSerializer(data=request.data)
    if serilizer.is_valid():
        uidb64 = serilizer.validated_data.get("uid")
        token = serilizer.validated_data.get("token")
        user = check_token(uidb64, token)
        if user is not None:
            password = serilizer.validated_data.get("password")
            user.set_password(password)
            user.save()
            return Response({ "detail": "Your password was successfully reseted" },status=HTTP_200_OK)
        else:
            return Response({ "error": "Your token is invalid" }, status=HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def custom_login(request):
    data = request.data
    try:
        username = data['username']
        password = data['password']
    except:
        return Response(status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    print(user)
    if user is None:
        return Response(status=HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)
    return Response(data={ 'token': token.key }, status=HTTP_200_OK)

class CheckUserAPIView(views.APIView):
    
    def post(self, request, *args, **kwargs):
        if request.data.get('username'):
            try:
                user = get_user_model().objects.get(username=request.data.get('username'))
                return Response(status=HTTP_403_FORBIDDEN)
            except:
                return Response(status=HTTP_200_OK)
        if request.data.get('email'):
            try:
                user = get_user_model().objects.get(email=request.data.get('email'))
                return Response(status=HTTP_403_FORBIDDEN)
            except:
                return Response(status=HTTP_200_OK)
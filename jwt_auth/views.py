from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated

import jwt
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer, PopulatedPublicUserSerializer


User = get_user_model()
class RegisterView(APIView):
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response(
                {'message': 'Registration Successful'},
                status=status.HTTP_201_CREATED
            )
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user_to_login = self.get_user(email=email)
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            { 'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response(
            {'token': token, 'message': f'Welcome Back {user_to_login.username}'}
        )

class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class ProfileDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        user_to_find = self.get_user(pk=pk)
        serialized_user = PopulatedPublicUserSerializer(user_to_find)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

class ProfileFollowView(ProfileDetailView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        user_to_follow = self.get_user(pk=pk)
        user_to_follow.followed_by.add(request.user.id)
        user_to_follow.save()
        return Response(
            {'Message': f'User {pk} followed by {request.user.id}!'},
            status=status.HTTP_202_ACCEPTED
        )

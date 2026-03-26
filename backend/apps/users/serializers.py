from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    
    ## Definir el campo de contraseña como solo escritura
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")


    ## Crear un nuevo usuario con los datos validados y devolver la instancia del usuario excepto la contraseña
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user

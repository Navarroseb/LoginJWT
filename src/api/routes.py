"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime

api = Blueprint('api', __name__)


@api.route("/register", methods=["POST"])
def register():
    body = request.get_json()
    email = body['email']
    password = body['password']

    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({'email': email,
    "password": password})


@api.route('/user', methods=['GET','POST'])
def handle_hello():
     
    if request.method =='GET':
        all_people = User.query.all()
        all_people = list(map(lambda x: x.serialize(), all_people))
    
        return jsonify(all_people), 200
    
    else:
        body = request.get_json() 
        if body is None:
            return "The request body is null", 400
        if 'email' not in body:
            return 'Especificar email', 400
        if 'password' not in body:
            return 'Especificar password',400
        
        onePeople = User.query.filter_by(email=body["email"]).first()
        if onePeople:
            if (onePeople.password == body["password"] ):
                #CUANDO VALIDAMOS LA PASSWORD CREAREMOS EL TOKEN
                expira = datetime.timedelta(minutes=2)
                access_token = create_access_token(identity=onePeople.email, expires_delta=expira)
                data = {
                    "info_user": onePeople.serialize(),
                    "token": access_token,
                    "expires": expira.total_seconds()
                }
                return(jsonify(data))
            else:
                return(jsonify({"mensaje":False}))
        else:
            return(jsonify({"mensaje":"mail no se encuentra registrado"}))    


@api.route("/token", methods=['POST'])
def iniciar_sesion():
    
    data = request.get_json()
    oneUser = User.query.filter_by(email=data['email'], password= data['password']).first()
    if(oneUser):
        expiracion  = datetime.timedelta(minutes=1)
        acceso = create_access_token(identity=oneUser.email, expires_delta=expiracion)
        response = {"Token":acceso , "expiracion":expiracion.total_seconds(), "email":oneUser.email}

        return jsonify(response)
    else:
        return "mail o contraseña no son válidos"    


@api.route("/privada", methods=["GET"])
@jwt_required()
def get_privada():

    token = get_jwt_identity()
    return jsonify({
        "mensaje": "Acceso concedido",
        "usuario": token
    })

    
    """ email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != 'email' or password != 'password':
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token) """


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
    #cuando es un get conseguiremos todos los usuarios 
    if request.method =='GET':
        all_people = User.query.all()
        all_people = list(map(lambda x: x.serialize(), all_people))
    
        return jsonify(all_people), 200
    
    else:
        body = request.get_json() # obtener el request body de la solicitud
        if body is None:
            return "The request body is null", 400
        if 'email' not in body:
            return 'Especificar email', 400
        if 'password' not in body:
            return 'Especificar password',400
        #estoy consultando si existe alguien con el email que mande en la api y consigo la primera coincidencia
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




""" @api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token) 


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    dictionary = {
        "message": "Finally!!! " + email
    }
    

    return jsonify(dictionary)  """   

    

   
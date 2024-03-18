# controllers/main_controller.py
from flask import request, jsonify
from model.createStudent import Student

def createStudentControl():
    # get info
    data = request.json
    
    name = data.get('name') 
    student_id = data.get('student_id') 
    birthdate = data.get('birthdate') 

    # Criando o estudante
    Student(name, birthdate, student_id).CreateNewStudent()

    return jsonify({"mensagem": "Estudante criado com sucesso"}), 201

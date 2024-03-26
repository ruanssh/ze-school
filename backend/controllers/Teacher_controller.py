from flask import request, jsonify
from model.Teacher import Teacher

def createTeacherControl():
    data = request.json
    
    name = data.get('name') 

    Teacher(name).CreateNewTeacher()

    return jsonify({"mensagem": "Professor criado com sucesso"}), 201

def viewAllTeachers():
    teachers_data = Teacher().ViewAll()

    return jsonify({"teachers": teachers_data}), 201

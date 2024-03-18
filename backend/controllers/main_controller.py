# controllers/main_controller.py
from flask import request, jsonify
from model.createStudent import Student
from model.createTeacher import Teacher
from model.createSubject import Subject

def createStudentControl():
    # get info
    data = request.json
    
    name = data.get('name') 
    student_id = data.get('student_id') 
    birthdate = data.get('birthdate') 

    # Criando o estudante
    Student(name, birthdate, student_id).CreateNewStudent()

    return jsonify({"mensagem": "Estudante criado com sucesso"}), 201

def createTeacherControl():
    data = request.json
    
    name = data.get('name') 

    Teacher(name).CreateNewTeacher()

    return jsonify({"mensagem": "Professor criado com sucesso"}), 201

def createSubjectControl():
    data = request.json
    
    subject_name = data.get('subject_name') 
    id_teacher = data.get('id_teacher') 

    Subject(subject_name, id_teacher).CreateNewSubject()

    return jsonify({"mensagem": "Materia criada com sucesso"}), 201
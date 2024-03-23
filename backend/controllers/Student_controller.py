from flask import request, jsonify
from model.Student import Student

def createStudentControl():
    # get info
    data = request.json
    
    name = data.get('name') 
    birthdate = data.get('birthdate') 

    # Criando o estudante
    Student(name, birthdate).CreateNewStudent()

    return jsonify({"mensagem": "Estudante criado com sucesso"}), 201

def viewAllStudents():
    students_data = Student().ViewAllStudents()

    return jsonify({"students": students_data}), 201

def addSubjectToStudent():
    # Supondo que request e jsonify estejam importados corretamente
    data = request.json
    
    id_student = data.get('id_student') 
    id_subject = data.get('id_subject') 

    # Criando um objeto Student
    student = Student()

    # Adicionando a matéria ao estudante
    student.AddSubject(id_student, id_subject)

    return jsonify({"mensagem": "Matéria adicionada com sucesso"}), 201

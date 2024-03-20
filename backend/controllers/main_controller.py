# controllers/main_controller.py
from flask import request, jsonify
from model.Student import Student
from model.Teacher import Teacher
from model.Subject import Subject


# create models

def createStudentControl():
    # get info
    data = request.json
    
    name = data.get('name') 
    birthdate = data.get('birthdate') 

    # Criando o estudante
    Student(name, birthdate).CreateNewStudent()

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

# read modells

def viewAllStudents():
    students_data = Student().ViewAllStudents()

    return jsonify({"students": students_data}), 201

def viewAllTeachers():
    teachers_data = Teacher().ViewAllTeachers()

    return jsonify({"teachers": teachers_data}), 201

def viewAllSubjects():
    subjects_data = Subject().ViewAllSubjects()

    return jsonify({"subjects": subjects_data}), 201
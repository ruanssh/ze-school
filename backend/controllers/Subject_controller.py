from flask import request, jsonify
from model.Subject import Subject

def createSubjectControl():
    data = request.json
    
    subject_name = data.get('subject_name') 
    id_teacher = data.get('id_teacher') 

    Subject(subject_name, id_teacher).CreateNewSubject()

    return jsonify({"mensagem": "Materia criada com sucesso"}), 201


def viewAllSubjects():
    subjects_data = Subject().ViewAllSubjects()

    return jsonify({"subjects": subjects_data}), 201
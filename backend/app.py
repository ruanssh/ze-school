from flask import Flask
from controllers.main_controller import createStudentControl, createTeacherControl, createSubjectControl, viewAllStudents, viewAllTeachers, viewAllSubjects
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# insert
@app.route('/createStudent', methods=['POST'])
def create_student():
    return createStudentControl()

@app.route('/createTeacher', methods=['POST'])
def create_teacher():
    return createTeacherControl()

@app.route('/createSubject', methods=['POST'])
def create_subject():
    return createSubjectControl()

# view

@app.route('/students', methods=['GET'])
def view_students():
    return viewAllStudents()
@app.route('/teachers', methods=['GET'])
def view_teachers():
    return viewAllTeachers()
@app.route('/subjects', methods=['GET'])
def view_subjects():
    return viewAllSubjects()


if __name__ == "__main__":
    app.run(debug=True)

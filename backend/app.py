from flask import Flask
from flask_cors import CORS
#students
from controllers.Student_controller import createStudentControl, viewAllStudents, addSubjectToStudent, viewAllStudentsSubjects
#teachers
from controllers.Teacher_controller import createTeacherControl, viewAllTeachers
#subjects
from controllers.Subject_controller import createSubjectControl, viewAllSubjects

app = Flask(__name__)
CORS(app) 

# insert
@app.route('/createStudent', methods=['POST'])
def create_student():
    return createStudentControl()

@app.route('/addSubjectToStudent', methods=['POST'])
def add_subject_student():
    return addSubjectToStudent()

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

@app.route('/viewStudentSubjects', methods=['GET'])
def view_student_subjects():
    return viewAllStudentsSubjects()


if __name__ == "__main__":
    app.run(debug=True)

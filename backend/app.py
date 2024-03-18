from flask import Flask
from controllers.main_controller import createStudentControl, createTeacherControl, createSubjectControl
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/createStudent', methods=['POST'])
def create_student():
    return createStudentControl()

@app.route('/createTeacher', methods=['POST'])
def create_teacher():
    return createTeacherControl()

@app.route('/createSubject', methods=['POST'])
def create_subject():
    return createSubjectControl()

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask
from controllers.main_controller import createStudentControl
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
@app.route('/createStudent', methods=['POST'])
def create_student():
    return createStudentControl()

if __name__ == "__main__":
    app.run(debug=True)

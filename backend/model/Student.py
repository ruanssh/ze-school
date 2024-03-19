from model.db import DatabaseConnection
import mysql.connector
import random

class Student:
    def __init__(self, name=None, birthdate=None):
        self.student_id = random.randint(100000, 999999)
        self.name = name
        self.birthdate = birthdate
        
    def CreateNewStudent(self):
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()
                
                self.sql = "INSERT INTO school.Student (matricula, nome, dt_nasc) VALUES (%s, %s, %s)"
                
                cursor.execute(self.sql, (self.student_id, self.name, self.birthdate))
                
                db_connection.conn.commit() 
                
                cursor.close()
                print("Estudante criado com sucesso!")
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")

    @staticmethod
    def ViewAllStudents():
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()

                sql = "SELECT id, matricula, nome, dt_nasc FROM school.Student;"
                cursor.execute(sql)
                
                rows = cursor.fetchall() 

                students_data = []

                for row in rows:
                    student = {
                        'id': row[0],
                        'matricula': row[1],
                        'nome': row[2],
                        'dt_nasc': row[3]
                    }
                    students_data.append(student) 

                cursor.close()
                return students_data 
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")
        
    def EditStudent(self):
        pass

from model.db import DatabaseConnection
import mysql.connector

class Student:

    def __init__(self, name, birthdate, student_id):
        self.student_id = student_id
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
    def EditStudent(self):
        pass

from model.db import DatabaseConnection
import mysql.connector

class Teacher:
    def __init__(self, teacher_name):
        self.teacher_name = teacher_name
        
    def CreateNewTeacher(self):
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()
                
                self.sql = "INSERT INTO school.Teacher (nome) VALUES (%s)"
                
                cursor.execute(self.sql, (self.teacher_name,))
                
                db_connection.conn.commit() 
                
                cursor.close()
                print("Professor criado com sucesso!")
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")
            
    def EditTeacher():
        pass


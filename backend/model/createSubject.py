from model.db import DatabaseConnection
import mysql.connector

class Subject:
    def __init__(self, subject_name, id_teacher):
        self.subject_name = subject_name
        self.id_teacher = id_teacher
        
    def CreateNewSubject(self):
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()
                
                self.sql = "INSERT INTO school.Subject (nome, id_teacher) VALUES (%s, %s)"
                
                cursor.execute(self.sql, (self.subject_name, self.id_teacher))
                
                db_connection.conn.commit() 
                
                cursor.close()
                print("Professor criado com sucesso!")
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")
    
    def AddNewTeacher(self, id_teacher):
        pass
    
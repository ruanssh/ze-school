from model.db import DatabaseConnection
import mysql.connector

class Teacher(DatabaseConnection):
    def __init__(self, teacher_name=None):
        super().__init__()  
        self.teacher_name = teacher_name
        
    def CreateNewTeacher(self):
        if self.conn is not None:
            try:
                cursor = self.conn.cursor()
                                
                self.sql = "INSERT INTO school.Teacher (nome) VALUES (%s)"
                cursor.execute(self.sql, (self.teacher_name,))
                self.conn.commit() 
                
                cursor.close()
                print("Professor criado com sucesso!")
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                self.close()
        else:
            print("Não há conexão com o banco de dados.")
            
    @staticmethod
    def ViewAllTeachers():
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()

                sql = "SELECT id, nome FROM school.Teacher;"
                cursor.execute(sql)
                
                rows = cursor.fetchall() 

                teachers_data = []

                for row in rows:
                    teacher = {
                        'id': row[0],
                        'nome': row[1],
                    }
                    teachers_data.append(teacher) 

                cursor.close()
                return teachers_data 
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")


from model.db import DatabaseConnection
import mysql.connector

class Teacher:
    def __init__(self, teacher_name=None):
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
            
    @staticmethod
    # depois essa função tem que retornar as materias que esse professor da aula também.
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


from model.db import DatabaseConnection
import mysql.connector

class Subject():
    def __init__(self, subject_name=None, id_teacher=None):
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
    
    @staticmethod
    def ViewAllSubjects():
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()

                sql = "SELECT sb.id, sb.nome, tc.nome FROM school.Subject sb, school.Teacher as tc where tc.id = sb.id_teacher;"
                cursor.execute(sql)
                
                rows = cursor.fetchall() 

                teachers_data = []

                for row in rows:
                    teacher = {
                        'id': row[0],
                        'subject_name': row[1],
                        'teacher_name': row[2],
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

    
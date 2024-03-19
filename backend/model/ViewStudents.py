from model.db import DatabaseConnection
import mysql.connector

class ViewStudents:
    def __init__(self):
        pass

    def ViewAllStudents(self):
        db_connection = DatabaseConnection()
        if db_connection.conn is not None:
            try:
                cursor = db_connection.conn.cursor()

                sql = "SELECT id, matricula, nome, dt_nasc FROM school.Student;"
                cursor.execute(sql)
                
                rows = cursor.fetchall()  # Obter todos os resultados da consulta

                students_data = []  # Lista para armazenar os dados dos alunos

                for row in rows:
                    # Criar um dicionário com os dados de cada aluno
                    student = {
                        'id': row[0],
                        'matricula': row[1],
                        'nome': row[2],
                        'dt_nasc': row[3]
                    }
                    students_data.append(student)  # Adicionar o aluno à lista

                cursor.close()
                return students_data  # Retornar os dados dos alunos
            except mysql.connector.Error as err:
                print(f"Erro ao executar a consulta: {err}")
            finally:
                db_connection.close()
        else:
            print("Não há conexão com o banco de dados.")
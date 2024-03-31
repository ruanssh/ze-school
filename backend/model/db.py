from abc import ABC, abstractmethod
import mysql.connector

class DatabaseConnection(ABC):
    def __init__(self):
        self.conn = None
        self.connect()

    def connect(self):
        config = {
            'user': 'schoolc',
            'password': '123',
            'host': 'localhost',
            'port': 9595,  # Adicione a porta separadamente
            'database': 'school',
            'raise_on_warnings': True
        }

        try:
            self.conn = mysql.connector.connect(**config)
            print("Conexão bem-sucedida!")
        except mysql.connector.Error as err:
            print(f"Erro ao conectar ao banco de dados: {err}")

    def close(self):
        if self.conn is not None:
            self.conn.close()
            print("Conexão fechada.")
            

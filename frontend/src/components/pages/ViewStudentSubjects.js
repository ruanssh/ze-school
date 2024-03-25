import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';


export default function ViewStudentSubject({handleOk, handleCancel, isModalOpen, id})
{
    const [data, setData] = useState([]);
    
    function fetchData() 
    {
        fetch(`http://127.0.0.1:5000/viewStudentSubjects?id_student=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data.subjects);
                console.log(data)
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            })
      }

      const dataSource = data && data.map((item, index) => ({
        index: index + 1,
        subject: item.nome,
      }));
     
      const columns = [
        {
          title: '#',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: 'Materia',
          dataIndex: 'subject',
          key: 'subject',
        },
      ];

      useEffect(() => {
        fetchData();
      }, [id]);

    const pagination = {
        defaultPageSize: 6, // Defina o número desejado de linhas por página
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30'], // Opções para o usuário escolher a quantidade de linhas por página
      };
  
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Table dataSource={dataSource} columns={columns} pagination={pagination} />
        </Modal>
    );
}
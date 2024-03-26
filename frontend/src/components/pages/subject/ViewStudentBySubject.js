import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
export default function ViewStudentBySubject({handleOk, handleCancel, isModalOpen, id})
{
    const [data, setData] = useState([]);
    
    function fetchData() 
    {
        fetch(`http://127.0.0.1:5000/viewAllStudentsBySubject?id_subject=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data.students);
                console.log(data)
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            })
      }

      const dataSource = data && data.map((item, index) => ({
        index: index + 1,
        student_name: item.nome,
      }));
     
      const columns = [
        {
          title: '#',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: 'Nome',
          dataIndex: 'student_name',
          key: 'student_name',
        },
      ];

      useEffect(() => {
        fetchData();
      }, [id]);

    const pagination = {
        defaultPageSize: 6,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30'], 
      };
  
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Table dataSource={dataSource} columns={columns} pagination={pagination} />
        </Modal>
    );
}
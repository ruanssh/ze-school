import { Result } from "antd";
import SideBar from "../layout/SideBar"
import { useState, useEffect } from "react"
import { Space, Table, Row, Col, Button } from 'antd';
import WrapperCenter from "../layout/WrapperCenter";
import { PlusCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from "./Students.module.css"

export default function Students()
{
    const [data, setData] = useState([])
    let navigate = useNavigate()
    
    const goToCreate = () => {
        navigate('/CreateStudent');
    };
    const fetchAllStudents = async () => {
        try {
          const response = await fetch(`http://localhost:5000/students`);
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          const response_data = await response.json();
          setData(response_data["students"])
      
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };

    useEffect(() => {
        fetchAllStudents();
    }, []); 
    const dataSource = data.map((item, index) => ({
        index: index + 1,
        date: item.dt_nasc,
        name: item.nome,
        id_student: item.matricula,
    }));
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Matricula',
        dataIndex: 'id_student',
        key: 'id_student',
      },
      {
        title: 'Data de nascimento',
        dataIndex: 'date',
        key: 'date',
      },
    ];
    return(
        <>
        <SideBar page='2' >
            <Row justify="end">
                <Col style={{ margin: '10px' }}>
                    <Button onClick={goToCreate} type="primary" icon={<PlusCircleOutlined />}>Adicionar Aluno</Button>
                </Col>
            </Row>
            <WrapperCenter>
                 <Table className={styles.tableWW} columns={columns} dataSource={dataSource} />
            </WrapperCenter>
        </SideBar>
        </>
    )
}
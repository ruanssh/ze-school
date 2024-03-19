import { Result } from "antd";
import SideBar from "../../layout/SideBar"
import { useState, useEffect } from "react"
import { Space, Table, Row, Col, Button } from 'antd';
import WrapperCenter from "../../layout/WrapperCenter";
import { PlusCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from "../../layout/Datagrid.module.css"

export default function Teachers()
{
    const [data, setData] = useState([])
    let navigate = useNavigate()
    
    const goToCreate = () => {
        navigate('/CreateTeacher');
    };
    const fetchAllStudents = async () => {
        try {
          const response = await fetch(`http://localhost:5000/teachers`);
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          const response_data = await response.json();
          setData(response_data["teachers"])
      
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };

    useEffect(() => {
        fetchAllStudents();
    }, []); 
    const dataSource = data.map((item, index) => ({
        index: index + 1,
        name: item.nome,
    }));
    const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
    ];
    return(
        <>
        <SideBar page='4' >
            <Row justify="end">
                <Col style={{ margin: '10px' }}>
                    <Button onClick={goToCreate} type="primary" icon={<PlusCircleOutlined />}>Adicionar Professor</Button>
                </Col>
            </Row>
            <WrapperCenter>
                 <Table className={styles.tableWW} columns={columns} dataSource={dataSource} />
            </WrapperCenter>
        </SideBar>
        </>
    )
}
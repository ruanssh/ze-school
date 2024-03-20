import { Result } from "antd";
import SideBar from "../../layout/SideBar"
import { useState, useEffect } from "react"
import { Space, Table, Row, Col, Button } from 'antd';
import WrapperCenter from "../../layout/WrapperCenter";
import { PlusCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from "../../layout/Datagrid.module.css"

export default function Subjects()
{
    const [data, setData] = useState([])
    let navigate = useNavigate()
    
    const goToCreate = () => {
        navigate('/CreateSubject');
    };
    const fetchAllSubjects = async () => {
        try {
          const response = await fetch(`http://localhost:5000/subjects`);
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          const response_data = await response.json();
          setData(response_data["subjects"])
      
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };

    useEffect(() => {
      fetchAllSubjects();
    }, []); 
    const dataSource = data.map((item, index) => ({
        index: index + 1,
        subject_name: item.subject_name,
        teacher_name: item.teacher_name,

    }));
    const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Materia',
        dataIndex: 'subject_name',
        key: 'subject_name',
      },
      {
        title: 'Professor',
        dataIndex: 'teacher_name',
        key: 'teacher_name',
      },
    ];
    return(
      <>
      <SideBar page='3' >
          <Row justify="end">
              <Col style={{ margin: '10px' }}>
                  <Button onClick={goToCreate} type="primary" icon={<PlusCircleOutlined />}>Adicionar Materia</Button>
              </Col>
          </Row>
          <WrapperCenter>
               <Table className={styles.tableWW} columns={columns} dataSource={dataSource} />
          </WrapperCenter>
      </SideBar>
      </>
    )
}
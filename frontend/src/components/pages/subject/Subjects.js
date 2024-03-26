import { Result } from "antd";
import SideBar from "../../layout/SideBar"
import { useState, useEffect } from "react"
import { Space, Table, Row, Col, Button } from 'antd';
import WrapperCenter from "../../layout/WrapperCenter";
import { PlusCircleOutlined, EyeOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ViewStudentBySubject from "./ViewStudentBySubject";
import styles from "../../layout/Datagrid.module.css"

export default function Subjects()
{
    const [data, setData] = useState([])
    const [idSubject, setIdSubject] = useState()
    
    async function ViewStudents(idSubject)
    {
      setIdSubject(idSubject)
      showModalStudents()
    }
    
    const [isModalStudentsOpen, setModalStudentsOpen] = useState(false);
    const showModalStudents = () => {
      setModalStudentsOpen(true);
    };
    const handleOkStudent = () => {
      setModalStudentsOpen(false);
    };
    const handleCancelStudent = () => {
      setModalStudentsOpen(false);
    };

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
        subject_id: item.id,
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
      {
        title: '',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (text, record) => (
          <Button 
            type="dashed" 
            icon={<EyeOutlined />} 
            onClick={() => ViewStudents(record.subject_id)}> {/* Use uma função de callback */}
            Visualizar Alunos
          </Button>
        )
      },
      
    ];
    return(
      <>
      <ViewStudentBySubject handleOk={handleOkStudent} isModalOpen={isModalStudentsOpen} handleCancel={handleCancelStudent} id={idSubject} />

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
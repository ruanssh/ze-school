import { Result } from "antd";
import SideBar from "../layout/SideBar"
import { useState, useEffect } from "react"
import { Space, Table, Row, Col, Button, Menu,Dropdown } from 'antd';
import WrapperCenter from "../layout/WrapperCenter";
import { PlusCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, DownOutlined   } from '@ant-design/icons';
import ViewStudentSubject from "./ViewStudentSubjects";
import styles from "../layout/Datagrid.module.css"
import AddSubject from "./AddSubject";
export default function Students()
{
    const [data, setData] = useState([])
    const [studentId, setStudentId] = useState()

    let navigate = useNavigate()
    
    async function addSubject(id)
    {
      showDrawer()
      setStudentId(id)
    }
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
      fetchAllStudents()
    };

    async function viewSubject(id)
    {
      showModalSubjects()
      setStudentId(id)
    }
    const [isModalSubjectsOpen, setModalSubjectOpen] = useState(false);
    const showModalSubjects = () => {
      setModalSubjectOpen(true);
    };
    const handleOkSubject = () => {
      setModalSubjectOpen(false);
    };
    const handleCancelSubject = () => {
      setModalSubjectOpen(false);
    };
  
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
        studentid: item.matricula,
        id_student: item.id
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
      {
        title: 'Matricula',
        dataIndex: 'studentid',
        key: 'studentid',
      },
      {
        title: 'Data de nascimento',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Ações',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (text, record) => (
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => viewSubject(record.id_student)} icon={<EyeOutlined  />}>Visualizar Materias</Menu.Item>
              <Menu.Item key="2" onClick={() => addSubject(record.id_student)}  icon={<PlusCircleOutlined />}>Adicionar Materia</Menu.Item>
            </Menu>
          }>
          <a>
              <Space>
                Ações
                <DownOutlined />
              </Space>
          </a>
          </Dropdown>
        )
      },
    ];
    return(
        <>
        <ViewStudentSubject handleOk={handleOkSubject} isModalOpen={isModalSubjectsOpen} handleCancel={handleCancelSubject} id={studentId} />
        <AddSubject onClose={onClose} open={open} id={studentId} />
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
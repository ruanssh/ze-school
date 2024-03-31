import WrapperCenter from "../../layout/WrapperCenter";

import SideBar from "../../layout/SideBar"

import styles from './CreateSubject.module.css'

import { Button, Form, Input, Card, Select  } from 'antd';

import Modal from "../../layout/Modal";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function CreateSubject()
{
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [teachers, setTeachers] = useState([])
    const [teacherId, setTeacherId] = useState()
    const backTo = () =>{
        navigate(-1)
    }
    const showModal = () => {
    setIsModalOpen(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };
    const onChangeTeacher = (teacher_id) =>
    {
        setTeacherId(teacher_id)
    }
    const fetchAllTeachers = async () => {
        try {
          const response = await fetch(`http://localhost:5000/teachers`);
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          const response_data = await response.json();
          setTeachers(response_data["teachers"])
      
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
      fetchAllTeachers();
    }, []); 
    const data_teachers = teachers.map((item, index) => ({
        value: item.id,
        label: item.nome,
    }));
    const onFinish = (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "subject_name": values.name,
            "id_teacher": teacherId,

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        try {
            fetch("http://127.0.0.1:5000/createSubject", requestOptions)
            showModal()
            form.resetFields();
          } 
          catch (error) {
            console.log('error', error);
          }
    }

    return(
        <>  
            <Modal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} Tittle={'Sucesso'} Text='Professor cadastrado com sucesso.' />
            <SideBar page='3'>
            <WrapperCenter>
                <Card className={styles.card} title="Cadastrar Materia">
                    <Form
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    form={form}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                        <Form.Item
                            label="Nome da Materia"
                            name="name"
                            rules={[
                                {
                                required: true,
                                message: 'Escreva o nome da materia!',
                                },
                            ]}
                            >
                        <Input maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            label="Professor"
                            name="teacher"
                            rules={[
                                {
                                required: true,
                                message: 'Selecione o professor!',
                                },
                            ]}
                            >

                        <Select
                            showSearch
                            placeholder="Selecione o Professor"
                            optionFilterProp="children"
                            options={data_teachers}
                            onChange={onChangeTeacher}
                        />
                        </Form.Item>
                        <Form.Item  wrapperCol={{     offset: 8,       span: 16,  }}>
                        <Button onClick={backTo}>
                            Voltar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Cadastrar
                        </Button>
                        </Form.Item>
                </Form> 
                </Card>
            </WrapperCenter>
            </SideBar>
        </>
    )
}
import WrapperCenter from "../../layout/WrapperCenter";

import SideBar from "../../layout/SideBar"

import styles from './CreateTeacher.module.css'

import { Button, Form, Input, Card  } from 'antd';

import Modal from "../../layout/Modal";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function CreateTeacher()
{
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const onFinish = (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": values.name,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        try {
            fetch("http://127.0.0.1:5000/createTeacher", requestOptions)
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
            <SideBar page='4'>
            <WrapperCenter>
                <Card className={styles.card} title="Cadastrar Professor">
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
                            label="Nome do Professor"
                            name="name"
                            rules={[
                                {
                                required: true,
                                message: 'Escreva o nome!',
                                },
                            ]}
                            >
                        <Input />

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
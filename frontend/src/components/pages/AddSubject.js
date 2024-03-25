import { useEffect, useState } from "react";
import { Button, Form, Input, Drawer, Select } from 'antd';
import Modal from "../layout/Modal";

export default function AddSubject({onClose, open, id})
{
    const [subjects, setSubjects] = useState([])
    const [subjectId, setSubjectId] = useState()
    const [form] = Form.useForm()


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
    setIsModalOpen(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };

    const fetchAllTeachers = async () => {
        try {
          const response = await fetch(`http://localhost:5000/subjects`);
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          const response_data = await response.json();
          setSubjects(response_data["subjects"])
      
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
      fetchAllTeachers();
    }, []); 

    const data_subjects = subjects.map((item, index) => ({
        value: item.id,
        label: item.subject_name,
    }));
    const onChangeSubject = (id) =>
    {
        setSubjectId(id)
    }
    const onFinish = (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id_student": id,
            "id_subject": subjectId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        try {
            fetch("http://127.0.0.1:5000/addSubjectToStudent", requestOptions)
            form.resetFields();
            showModal()
          } 
          catch (error) {
            console.log('error', error);
          }
    }

    return(
        <>
        <Modal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} Tittle={'Sucesso'} Text='Materia adicionada com sucesso.' />

        <Drawer title="Adicionando Materia" onClose={onClose} open={open}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        >
        <Form.Item
            label="Materia"
            name="teacher"
            rules={[
                {
                required: true,
                message: 'Selecione a materia!',
                },
            ]}
            >       
        <Select
            showSearch
            placeholder="Selecione a materia"
            optionFilterProp="children"
            options={data_subjects}
            onChange={onChangeSubject}
        />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                <Button type="dashed" className="" onClick={onClose}>Fechar</Button>
                <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
    </Form>
    </Drawer>
        </>
    )
}
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const { Sider } = Layout;

const SideBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate(); // Obtém a função de navegação

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsedWidth={0} breakpoint="md">
        <div className="logo">
          <h3 style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>Escolinha do Zé</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[props.page]} mode="inline">
          <Menu.Item key="1" onClick={() => navigate("/")}>Inícios</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("/Students")}>Alunos</Menu.Item>
          <Menu.Item key="4" onClick={() => navigate("/Teachers")}>Professores</Menu.Item>
          <Menu.Item key="3" onClick={() => navigate("/Subjects")}>Matérias</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {props.children}
      </Layout>
    </Layout>
  );
};

export default SideBar;

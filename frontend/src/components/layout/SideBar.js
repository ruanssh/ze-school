import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const SideBar = (props) => {
  const [collapsed, setCollapsed] = useState(true); // Inicialmente, colapsado em dispositivos móveis

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} collapsedWidth={0} breakpoint="md">
        <div className="logo">
          <h3 style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>Escolinha do Zé</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[props.page]} mode="inline">
          <Menu.Item key="1">Inícios</Menu.Item>
          <Menu.Item key="2">Alunos</Menu.Item>
          <Menu.Item key="3">Matérias</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {props.children}
      </Layout>
    </Layout>
  );
};

export default SideBar;

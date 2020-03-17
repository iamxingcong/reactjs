
import React from 'react';
import { Layout, Menu} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.css';
import Topics from './routes/Topics.js'
import Home from './routes/Home.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const { Header, Sider, Content } = Layout;

function App() {
  return (
<Router>
    <Layout   style={{ minHeight: '100vh' }}>
    <Header>
      <h1 className='titlex'> headerx </h1>
    </Header>
    <Layout>
      <Sider width='160'>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <Link to="/Topics">
                <span>机房管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <Link to="/Home">
                <span>sfsd</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
      <Switch>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route path="/Topics">
            <Topics />
          </Route>
           
        </Switch>
      </Content>
       
    </Layout>
   
  </Layout>
    
  </Router>
   
  );  
}


 

export default App;

import React from 'react';
import { Layout, Menu, Icon,Table} from 'antd';
require("./index.css")
const { Header, Content,Footer} = Layout;
import {Route,HashRouter,Link,Redirect} from 'react-router-dom'
import JobList from "../JobList/JobList"
import SiderMenu from "../../component/SliderMenu/SiderMenu"
import getMenus from "../../common/menu"

export default class Index extends React.Component {
  constructor(props){
    super(props)
  }

  state = {
    menuDatas:[],
    collapsed:false,
    logoText:"定时任务"
  }
  componentDidMount() {
    getMenus().then(json=>{
      this.setState({menuDatas:json})
    })
  }
  toggle = () => {
    this.setState({
      logoText: !!this.state.logoText?"":"定时任务",
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          mode="inline"
          theme="dark" 
          menuDatas={this.state.menuDatas}
          logoText={this.state.logoText}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <HashRouter>
              <div>
                <Route path="/jobList" component={JobList}></Route>
                <Redirect path="/" to={{pathname: '/jobList'}} />
              </div>
            </HashRouter>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            TimeTask ©2018 Created by Apex Soft
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

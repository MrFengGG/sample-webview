import React from 'react';
import {Menu, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const {Sider } = Layout;

export default class SiderMenu extends React.Component{
    getMenus = (menuDatas) =>{
        if(!menuDatas){
            return [];
        }
        return menuDatas.map((item)=>this.getMenuItem(item));
    }
    getMenuItem = (item) => {
        if(item.child && item.child.length > 0){
            return (
                <SubMenu key={item.code} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                    {
                        this.getMenus(item.child)
                    }
                </SubMenu>
            );
        }else{
            return (
                <Menu.Item key={item.code}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                    <Link to={item.link}></Link>
                </Menu.Item>
            )
        }
    }
    render(){
        const {collapsed, theme, mode, defaultSelectedKeys, menuDatas,logoText} = this.props;
        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h1 style={{ color: 'white', margin: 0 }}>{logoText}</h1>
                </div>
                <Menu theme={theme} defaultSelectedKeys={defaultSelectedKeys} mode={mode}>
                    {this.getMenus(menuDatas)}
                </Menu>
            </Sider>
        );
    }
}
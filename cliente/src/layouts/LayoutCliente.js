import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout, Modal, Row, Col } from 'antd';
import {FacebookOutlined, TwitterOutlined,CommentOutlined } from '@ant-design/icons';
import MenuTop from '../components/Personal/MenuTop';
import AdminSignIn from '../pages/Admin/Signln'; //importamos la pagina de login
import useAuth from '../hooks/useAuth';


import "./LayoutAdmin.scss";

export default function LayoutCliente(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(true);
    const {Header, Content, Footer} = Layout;
    const {user,isLoading} = useAuth();
    

    if(!user && !isLoading) {
        return (
            <>
            <Route path="/login" component={AdminSignIn} />
            <Redirect to="/login" />
            </>
        );
        
    }
    //
    if(user && !isLoading){
        if(user.rol==="cliente"){
            return(
                <Layout>
                    <Layout className="layoud-admin" >
                        <Header className="layout-admin__header">
                            <MenuTop/>
                        </Header>
                        <Content className="layout-admin__content">
                            <LoadRoutes routes = {routes}/>
                        </Content>
                        <Footer className="layout-admin__footer">
                         <Row gutter={24}>
                            <Col span={19}>
                            DERECHOS RESERVADOS © 2021 · H.V. EL RANCHO 
                            </Col>
                            <Col span={5}>
                            <FacebookOutlined />
                            <TwitterOutlined />
                            <CommentOutlined />
                            </Col>
                        </Row>
                        </Footer>
                    </Layout>
                </Layout>
            );
        }else{
            if(user.rol==="personal"){
                return (
                    <>
                    <Route path="/personal" />
                    <Redirect to="/personal" />
                    </>
                );
            }else{
                return (
                    <>
                    <Route path="/admin" />
                    <Redirect to="/admin" />
                    </>
                );
            }
            
        }
        
    }
    return null;
    
}
function LoadRoutes({routes}) {
    return(
        <Switch>
        {routes.map((route, index) =>(
        <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
        />
    ))}
        </Switch>
    );
}
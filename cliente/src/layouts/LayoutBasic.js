import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/Home/MenuTop';
import AdminSignIn from '../pages/Admin/Signln'; //importamos la pagina de login
import useAuth from '../hooks/useAuth';

import "./LayoutBasic.scss";
export default function LayoutBasic(props) {
    const { routes } = props;
    const {Header, Content, Footer} = Layout;
    const {user,isLoading} = useAuth();

    if(user && !isLoading) {
        if(user.rol==="admin"){
            return (
                <>
                <Route path="/admin" />
                <Redirect to="/admin" />
                </>
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
                    <Route path="/cliente" />
                    <Redirect to="/cliente" />
                    </>
                );
            }
        }
    }else{
        return(
            <Layout>
                <Layout className="layoud-admin" >
                    <Header className="layout-admin__header">
                        <MenuTop/>
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes = {routes}/>
                    </Content>
                </Layout>
            </Layout>
        );
        
    }


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
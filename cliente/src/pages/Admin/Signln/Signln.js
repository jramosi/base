import React from 'react';
import {Layout, Tabs} from 'antd';
import {Redirect} from 'react-router-dom';
import Logo from '../../../assets/img/logo.png';
import RegisterForm from '../../../components/Admin/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm';
import {getAccessTokenApi} from '../../../api/auth';

import "./Signln.scss";
import { Content } from 'antd/lib/layout/layout';

export default function SignIn() {

    const {Content} = Layout;
    const {TabPane} = Tabs;

    if(getAccessTokenApi()) {
        return <Redirect to="/admin"/>
    }

    return(
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Hospital Veterinario EL RANCHO"/>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Iniciar Sesion</span>} key= "1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Crear Usuario</span>} key="2">
                            <RegisterForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}
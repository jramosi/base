//PARA PERSONAL
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Layout, Menu} from 'antd';
import { SearchOutlined, CalendarOutlined,CopyOutlined, FundOutlined,DiffOutlined } from '@ant-design/icons';
import useAuth from '../../../hooks/useAuth';

import './MenuSider.scss';

function MenuSider(props) {
    const {menuCollapsed, location} = props;
    const{Sider} = Layout;
    const {user} = useAuth();


    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/personal/Bpaciente">
                    <Link to={"/personal/Bpaciente"}>
                    <SearchOutlined />
                    <span className="nav-text">Buscar Paciente</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/personal/VistaFicha">
                    <Link to={"/personal/VistaFicha"}>
                        <CopyOutlined />
                        <span className="nac-text">Ver Pacientes</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/personal/CitProg">
                    <Link to={"/personal/CitProg"}>
                        <CalendarOutlined />
                        <span className="nac-text">Citas por fechas</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/personal/SolLabo">
                    <Link to={"/personal/SolLabo"}>
                        <DiffOutlined />
                        <span className="nac-text">Sol. Laboratorio</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/personal/SolRadio">
                    <Link to={"/personal/SolRadio"}>
                        <FundOutlined />
                        <span className="nac-text">Sol. Radiografias</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
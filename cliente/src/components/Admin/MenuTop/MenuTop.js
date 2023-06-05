import { Button} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import React from 'react';
import LogoMenu from "../../../assets/img/logo.png";
import {logout} from "../../../api/auth";

import "./MenuTop.scss";


export default function MenuTop(props) {
    const{menuCollapsed, setMenuCollapsed} = props;

    const logoutUser= () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                {menuCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
            </div>
            <div className="menu-top__center">
                <img 
                className="menu-top__center-logo"
                src={LogoMenu}
                alt="Veterinaria El Rancho"
                />
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}> 
                <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}
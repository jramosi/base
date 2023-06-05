import { Button} from 'antd';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import LogoMenu from "../../../assets/img/logo.png";
import Modal from "../../Personal/Modal";
import "./MenuTop.scss";
import LoginForm from '../../../components/Admin/LoginForm';




export default function MenuTop() {
    const [abrirLogin, setAbrirLogin] = useState(false);
    const [contentModal, setContentModal] =useState(null);
    const titulo="Iniciar Sesion";
    const Abrir = err => {
        window.location.href= "/login";
        };

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img 
                className="menu-top__left-logo"
                src={LogoMenu}
                alt="Veterinaria El Rancho"
                />
            </div>
            
            <div className="menu-top__right">
                <Button type="link"  onClick = {()=> Abrir()}>
                    <UserOutlined />
                    Iniciar Sesion
                </Button>
            </div>
            <Modal 
            title = {titulo}
            isVisible = {abrirLogin}
            setIsVisible={setAbrirLogin}
            >
            {contentModal}
            </Modal>
        </div>
    );

    
}

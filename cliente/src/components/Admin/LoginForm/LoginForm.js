import React, { useState } from "react";
import {Form, Input, Button, notification, Avatar, Col,Row} from "antd";
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import {signInApi}from "../../../api/user";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../utils/constans";
import avatar from "../../../assets/img/logo-sesion.jpg";

import "./LoginForm.scss";
import jwtDecode from "jwt-decode";

export default function LoginForm(props){
//para guardar en state

    const[inputs, setInputs] = useState({
        usuario: "",
        contrasena: ""
    });

    const changeForm =e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });

    };

    const login= async e =>{
        e.preventDefault();

        if(!inputs.usuario || !inputs.contrasena){
            notification["error"] ({
                message: "Llene todos los campos por favor"
            });
        }else{
            const result = await signInApi(inputs);

        if(result.message) {
            notification["error"] ({
                message: result.message
            });
        }else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN,accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);

            notification["success"] ({
                message: "Login correcto"
                
            });

           const IdentUser = jwtDecode(localStorage.accessToken); // para capturar el access token

           console.log(IdentUser.rol);
           if(IdentUser.rol ==="admin"){
            window.location.href = "/admin";
           }else{
               if(IdentUser.rol==="personal"){
                window.location.href = "/personal";
               } else{
                   window.location.href= "/cliente";
               }
               
           }
        }
        }
    };



//
    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
            <Avatar className="avatar" size={130} src={avatar} />
           
                    <Form.Item>
                        <Input prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />} 
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            className="login-form__input"
                        />
                    </Form.Item>            
                    <Form.Item>
                        <Input prefix={<UnlockOutlined style= {{color:"rgba(0,0,0,.25)"}} />} 
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            className="login-form__input"
                        />
                    </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Iniciar Sesion
                </Button>
            </Form.Item>
        </Form>
        
    );
}
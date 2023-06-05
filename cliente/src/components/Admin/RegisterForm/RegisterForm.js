import React, {useState} from 'react';
import {Form,Input,Button,Checkbox,notification, Select} from 'antd';
import { UserOutlined,UnlockOutlined,PhoneOutlined,MailOutlined,ShopOutlined } from '@ant-design/icons';
import { emailValidation,minLengthValidation } from '../../../utils/formValidation';
import {signUpApi} from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {
    const{Option} = Select;
    //para guardar
    const [inputs, setInputs] =useState({ //para guardar y actualizar el valor
        usuario:"",
        nombre:"",
        apellidoP:"",
        apellidoM:"",
        correo:"",
        direccion:"",
        telefono:"",
        contrasena:"",
        repeContrasena:"",
        privacyPolicy: false
    });

    //vpara validar
    const[formValid, setFormValid] = useState({
        usuario:false,
        nombre:false,
        apellidoP:false,
        apellidoM:false,
        correo:false,
        direccion:false,
        telefono:false,
        contrasena:false,
        repeContrasena:false,
        privacyPolicy: false
    })
    const inputValidation = e => {
        const {type, name} = e.target;

        if(type ==="email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }
        if(name === "contrasena") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 8)
            });
        }
        if(name === "repeContrasena") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 8)
            });
        }
        if(name === "telefono") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 8)
            });
        }
        if(type === "privacyPolicy") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
    }

    // si pasa algo se actualiza
    const changeForm = e =>{
        if(e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else{
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    };

    const register = async e => {
        e.preventDefault();
        const usernameVal = inputs.usuario;
        const nameVal = inputs.nombre;
        const lastname_dadVal = inputs.apellidoP;
        const lastname_motVal = inputs.apellidoM;
        const emailVal = inputs.correo;
        const phoneVal = inputs.telefono;
        const passwordVal = inputs.contrasena;
        const repeatPasswordVal = inputs.repeContrasena;
        const privacyPolicyVal = inputs.privacyPolicy;

        if(!usernameVal || !nameVal || !lastname_dadVal || !lastname_motVal || !emailVal || !phoneVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal){
            notification["error"]({
                message:"Todos los campos son obligatorios"
            });
        } else{
            if(passwordVal!==repeatPasswordVal){
                notification["error"] ({
                    message:"Las contraseñas no coinciden"
                });
            }else{
                // TO DO: CONECTAR CON EL API Y REGISTRAR USUARIO
                const result = await signUpApi(inputs);
                //retorno mensaje de server
                if(!result.ok){
                    notification["error"]({
                        message: result.message
                    });
                }else {
                    notification["success"]({
                        message: result.message
                    });
                    resetForm();
                }                
            }
        }

    };

    // para limpiar fomulario
    const resetForm=() => {
        const inputs = document.getElementsByTagName('input');

        for(let i=0; i< inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }
        setInputs({
            usuario:"",
            nombre:"",
            apellidoP:"",
            apellidoM:"",
            correo:"",
            direccion:"",
            telefono:"",
            contrasena:"",
            repeContrasena:"",
            privacyPolicy: false
        });
        setFormValid({
            usuario:false,
            nombre:false,
            apellidoP:false,
            apellidoM:false,
            correo:false,
            direccion:false,
            telefono:false,
            contrasena:false,
            repeContrasena:false,
            privacyPolicy: false
        })
    };

    return (
        
        <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
            <Form.Item>
                <Input
                prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="text"
                name="usuario"
                placeholder="Usuario"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.usuario}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="text"
                name="nombre"
                placeholder="Nombres"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.nombre}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="text"
                name="apellidoP"
                placeholder="Apellido paterno"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.apellidoP}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="text"
                name="apellidoM"
                placeholder="Apellido materno"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.apellidoM}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<MailOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="email"
                name="correo"
                placeholder="Correo electronico"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.correo}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<ShopOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="text"
                name="direccion"
                placeholder="Direccion"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.direccion}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<PhoneOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="number"
                name="telefono"
                placeholder="Telefono"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.telefono}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<UnlockOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.contrasena}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<UnlockOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                type="password"
                name="repeContrasena"
                placeholder="Repita su contraseña"
                className="register-form__input"
                onChange={inputValidation}
                value= {inputs.repeContrasena}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox 
                name="privacyPolicy" 
                checked={inputs.privacyPolicy}
                onChange={inputValidation}
                >
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Usuario
                </Button>
            </Form.Item>
            
        </Form>
    )
}

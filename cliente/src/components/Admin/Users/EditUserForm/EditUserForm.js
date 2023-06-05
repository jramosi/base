import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState } from "react";
import {useDropzone} from "react-dropzone";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined } from '@ant-design/icons';
import {getAvatarApi, updateUserApi, uploadAvatarApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const{user, setIsVisibleModal,setRefrescarUsers}= props;
    const[avatar, setAvatar] = useState(null);
    const[userData, setUserData] = useState({});
    
    useEffect(()=>{
        setUserData({
            usuario: user.usuario,
            nombre: user.nombre,
            apellidoP: user.apellidoP,
            apellidoM: user.apellidoM,
            correo: user.correo,
            direccion: user.direccion,
            telefono: user.telefono,
            rol: user.rol,
            sala: user.sala,
            avatar: user.avatar
        });
    },[user]);

    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }
    }, [user])
//console.log(userData.nombre);
    useEffect(()=> {
        if(avatar) {
            setUserData({...userData, avatar: avatar.file});
        }
    },[avatar]);

    const updateUser= e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.contrasena || userUpdate.repeContrasena){
            if(userUpdate.contrasena !== userUpdate.repeContrasena){
                notification["error"]({
                    message:"Las contraseñas tiene que ser iguales"
                });
                return;
            } 
        }

        if(!userUpdate.nombre || !userUpdate.apellidoP || !userUpdate.apellidoM || !userUpdate.correo || !userUpdate.direccion || !userUpdate.telefono){
            notification["error"]({
                message: "El nombre, Ap. paterno,Ap. materno, correo, direccion y telefono son obligatorios"
            });
            return;
        }
        if(typeof userUpdate.avatar ==="object"){
            uploadAvatarApi(token , userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result=>{
                    notification["success"]({
                        message:result.message
                    });
                    setIsVisibleModal(false);
                    setRefrescarUsers(true);
                });
            });
        } else{
            updateUserApi(token, userUpdate, user._id).then(result=>{
                notification["success"]({
                    message:result.message
                });
                setIsVisibleModal(false);
                setRefrescarUsers(true);
            });
        }
    };
    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
            <EditForm  userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    );
}

function UploadAvatar(props){
    const {avatar, setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(()=>{
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview);
            }else {
                setAvatarUrl(avatar);
            }
        } else{
            setAvatarUrl(null);
        }
    },[avatar]);


    const onDrop= useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)});
            },
            [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>
            ):(
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )
}

//para actualizar
function EditForm(props){
    const{ userData, setUserData, updateUser} = props;
    const{Option} = Select;
    return(
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange={e => setUserData ({...userData, rol: e})}
                            value={userData.rol}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="personal">Personal</Option>
                            <Option value="cliente">Cliente</Option>
                        </Select>
                    </Form.Item>
                </Col>
                    <Col span={12}>
                    <Form.Item>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Nombre"
                                value={userData.nombre}
                                onChange={e=> setUserData ({...userData, nombre: e.target.value})}
                            />
                    </Form.Item>
                    </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                                prefix={<UserOutlined />}
                                placeholder="Apellido Paterno"
                                value={userData.apellidoP}
                                onChange={e=> setUserData ({...userData, apellidoP: e.target.value})}
                            />
                    </Form.Item>    
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                                prefix={<UserOutlined />}
                                placeholder="Apellido Materno"
                                value={userData.apellidoM}
                                onChange={e=> setUserData ({...userData, apellidoM: e.target.value})}
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                                prefix={<MailOutlined />}
                                placeholder="Correo Electronico"
                                value={userData.correo}
                                onChange={e=> setUserData ({...userData, correo: e.target.value})}
                            />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                            <Input
                                prefix={<ShopOutlined />}
                                placeholder="Direccion"
                                value={userData.direccion}
                                onChange={e=> setUserData ({...userData, direccion: e.target.value})}
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                                prefix={<PhoneOutlined />}
                                placeholder="Telefono"
                                value={userData.telefono}
                                onChange={e=> setUserData ({...userData, telefono: e.target.value})}
                            />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona sala de atencion"
                            onChange={e => setUserData ({...userData, sala: e})}
                            defaultValue={userData.sala}
                        >
                            <Option value="Sala 1 AT. GENERAL">Sala 1 AT. GENERAL</Option>
                            <Option value="Sala 2 AT. GENERAL">Sala 2 AT. GENERAL</Option>
                            <Option value="Sala 3 RADIOGRAFIA">Sala 3 RADIOGRAFIA</Option>
                            <Option value="Sala 4 LABORATORIO">Sala 4 LABORATORIO</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UnlockOutlined/>}
                            type="password"
                            placeholder="Contraseña"
                            onChange={e => 
                                setUserData({...userData, contrasena: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<UnlockOutlined/>}
                            type="password"
                            placeholder="Repetir Contraseña"
                            onChange={e => 
                                setUserData({...userData, repeContrasena: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}
//
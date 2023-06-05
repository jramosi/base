import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification, Alert} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import {useDropzone} from "react-dropzone";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../api/auth";
import {signUpApi} from '../../../api/mascota';

import "./RegMascot.scss";

export default function RegMascot(props) {
    const{user, setIsVisibleModal, setRefrescarMascot} = props;
    const{Option} = Select;
    const [mascotData, setMascotData] =useState({}); //para guardar y actualizar el valor
    

    const addMascot = event => {
        event.preventDefault();
        mascotData.usuDueno = user.usuario;
        //desdes aca lo validamos y mandamos
        if(
            !mascotData.nombre || !mascotData.especie || !mascotData.raza || !mascotData.sexo || !mascotData.color || !mascotData.anoNac
        ){
            notification["error"] ({
                message: "Todos los campos son obligatorios"
            });
        }else {

            const accesstoken = getAccessTokenApi();
            signUpApi(accesstoken, mascotData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    
                    setMascotData({
                        nombre:"",
                        especie:"",
                        raza:"",
                        anoNac:"",
                        sexo:"Sexo del animal",
                        color:""
                    });
                    
                })
                .catch(err =>{
                    notification["error"]({
                        message: err
                    });
                });
                setIsVisibleModal(false);
        }
    };
    return(
        <div className="add-mascot-form">
            <AddForm
                mascotData={mascotData}
                setMascotData={setMascotData}
                addMascot={addMascot}
            />
        </div>
    );
    }
    function AddForm (props){
        const {mascotData, setMascotData,addMascot}=props;
        const {Option}=Select;
        const especieData = ['Canino', 'Felino', 'Aves'];
        const cityData = {
            Canino: ['Corriente', 'Chihuahua', 'San Bernado', 'Pastor Aleman', 'Rottwailer', 'Labrador', 'Bulldog'],
            Felino: ['Corriente','Angora', 'Siames', 'Bengali', 'Siberiano', 'Persa'],
            Aves: ['Perico', 'Canarios']
        }; 
                const [cities, setCities] = useState(cityData[especieData[0]]);
                const [secondCity, setSecondCity] = useState(cityData[especieData[0]][0]);
            
                const handleProvinceChange = value => {
                setCities(cityData[value]);
                mascotData.especie=value;
                setSecondCity(cityData[value][0]);
                };
            
                const onSecondCityChange = value => {
                setSecondCity(value);
                mascotData.raza=value;
                };

        return(
            <Form className="form-add" onSubmitCapture={addMascot}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                            prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                            placeholder="Nombre del animal"
                            value= {mascotData.nombre}
                            onChange={e => setMascotData ({...mascotData, nombre: e.target.value})}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Select defaultValue={especieData[0]}  onChange={handleProvinceChange} placeholder="Especie">
                                {especieData.map(province => (
                                <Option key={province}>{province}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Select  value={secondCity} onChange={onSecondCityChange} placeholder="Raza">
                                {cities.map(city => (
                                <Option key={city}>{city}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                            prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                            placeholder="Color del animal"
                            value= {mascotData.color}
                            onChange={e => setMascotData ({...mascotData, color: e.target.value})}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <h2>{ mascotData.especie}</h2>
                <h2>{ mascotData.raza}</h2>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item>
                            <Input
                            type="number"
                            prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                            placeholder="Año de nacimiento"
                            value= {mascotData.anoNac}
                            onChange={e => setMascotData ({...mascotData, anoNac: e.target.value})}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Select
                                placeholder="Sexo del animal"
                                onChange={e => setMascotData ({...mascotData, sexo: e })}
                                value= {mascotData.sexo}
                            >
                                <Option value="Macho">Macho</Option>
                                <Option value="Hembra">Hembra</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Crear Registro de Mascota
                    </Button>
                </Form.Item>
            </Form>
            
            );
    }

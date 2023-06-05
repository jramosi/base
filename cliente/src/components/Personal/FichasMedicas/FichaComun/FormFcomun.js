import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import {useDropzone} from "react-dropzone";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined, ItalicOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import {RegFNormal} from '../../../../api/fichas';

import "./FormFcomun.scss";

export default function FormFcomun(props) {
    const{user, setISvisibleModal, mascot} = props;
    const{Option} = Select;
    const [fNormalData, setFNormalData] = useState({});

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    const fechaActual = `${year}/${month}/${day}`;

     const addFicha = event => {
        event.preventDefault();
        let mascotCargar = fNormalData;
        mascotCargar.personal = user.usuario;
        mascotCargar.paciente = mascot.nombre;
        mascotCargar.fecha = fechaActual;
        mascotCargar.dueno = mascot.usuDueno;
        console.log(mascotCargar);
        if(!mascotCargar.anamnesis || !mascotCargar.signos_clinicos || !mascotCargar.conclusion){
            notification["error"]({
                message:"Los campos mencionados son requeridos"
            });
        }else{
            const accesstoken = getAccessTokenApi();
            RegFNormal(accesstoken, mascotCargar)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setFNormalData({
                        anamnesis:"",
                        signos_clinicos:"",
                        tc:"",
                        fr:"",
                        mm:"",
                        fc:"",
                        vacuna:"Vacuna Puesta",
                        conclusion:"",
                        receta:"",
                        peso:""
                    });
                })
                .catch(err =>{
                    notification["error"]({
                        message: err
                    });
                });
        }
     }

    return(
        <div className="add-mascot-form">
        <AddForm
            fNormalData={fNormalData}
            setFNormalData={setFNormalData}
            addFicha={addFicha}
        />
    </div>
    )
}

function AddForm (props){
    const {fNormalData, setFNormalData,addFicha}=props;
    const {Option}=Select;
    const {TextArea}= Input;
    return(
        <Form className="form-add" onSubmitCapture={addFicha}>
                <div>
                    <h3>Solo los campos: Anamnesis, signos clinicos y conclusiones son obligatorios</h3>
                </div>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={4}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Anamnesis"
                        value= {fNormalData.anamnesis}
                        onChange={e => setFNormalData ({...fNormalData, anamnesis: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={4}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Signos Clinicos"
                        value= {fNormalData.signos_clinicos}
                        onChange={e => setFNormalData ({...fNormalData, signos_clinicos: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        type="number"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Temp. Corporal"
                        value= {fNormalData.tc}
                        onChange={e => setFNormalData ({...fNormalData, tc: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        type="number"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Frec. Respiratoria"
                        value= {fNormalData.fr}
                        onChange={e => setFNormalData ({...fNormalData, fr: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        type="number"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Frec. Cardiaca"
                        value= {fNormalData.fc}
                        onChange={e => setFNormalData ({...fNormalData, fc: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                        <Form.Item>
                        <Input
                        type="text"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Melom. Maligno"
                        value= {fNormalData.mm}
                        onChange={e => setFNormalData ({...fNormalData, mm: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row gutter={24}>
                    <Col span={12}>
                        <Input
                        type="number"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Peso"
                        value= {fNormalData.peso}
                        onChange={e => setFNormalData ({...fNormalData, peso: e.target.value})}
                        />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
                        <Select
                            placeholder="Vacuna Puesta"
                            onChange={e => setFNormalData ({...fNormalData, vacuna: e })}
                            value= {fNormalData.vacuna}
                        >
                            <Option value="parvocorona">Parvocorona</Option>
                            <Option value="hexavalente">Hexavalente</Option>
                            <Option value="octavalente">Octavalente</Option>
                            <Option value="antirrabica">Antirrabica</Option>
                            <Option value="desparatizacion">Desparatizacion</Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={4}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Conclusiones"
                        value= {fNormalData.conclusion}
                        onChange={e => setFNormalData ({...fNormalData, conclusion: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={4}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Medicamentos Sugeridos"
                        value= {fNormalData.receta}
                        onChange={e => setFNormalData ({...fNormalData, receta: e.target.value})}
                        />
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

import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined, ItalicOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import {RegSolRadio} from "../../../../api/solicitud";

import "./SolFRadio.scss";

export default function SolFRadio(props) {
    const {mascot, user , setIsVisibleModal}= props;
    const{Option} = Select;
    const [solRadData, setSolRadData] = useState({});

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    const fechaActual = `${year}-${month}-${day}`;

    const addFSolRadio = event => {
        event.preventDefault();
        solRadData.dueno = mascot.usuDueno;
        solRadData.paciente = mascot.nombre;
        solRadData.personal = user.usuario;
        solRadData.fecha = fechaActual;
        if(!solRadData.parte || !solRadData.parte_det || !solRadData.observaciones){
            notification["error"]({
                message:"Los campos mencionados son requeridos"
            });
        }else{
            const accesstoken = getAccessTokenApi();
            RegSolRadio(accesstoken, solRadData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setSolRadData({});
                    setIsVisibleModal(false);
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
            <AddForm solRadData={solRadData} setSolRadData={setSolRadData} addFSolRadio={addFSolRadio}/>
        </div>
    )
}

function AddForm (props){
    const {solRadData,setSolRadData,addFSolRadio}=props;
    const {Option}=Select;
    const {TextArea}= Input;
    return(
        <Form className="form-add" onSubmitCapture={addFSolRadio}>
                <div>
                    <h3>Por Favor llene todos los campos </h3><p></p>
                </div>
                <Row gutter={24}>
                    <Col span={12}>
                        <Input
                        type="text"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Parte del cuerpo"
                        value= {solRadData.parte}
                        onChange={e => setSolRadData ({...solRadData, parte: e.target.value})}
                        />
                    </Col>
                    <Col span={12}>
                        <Input
                        type="text"
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Parte Detallada"
                        value= {solRadData.parte_det}
                        onChange={e => setSolRadData ({...solRadData, parte_det: e.target.value})}
                        />
                    </Col>
                </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <TextArea
                        rows={3}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Observaciones"
                        value= {solRadData.observaciones}
                        onChange={e => setSolRadData ({...solRadData, observaciones: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Registrar Solicitud
                </Button>
            </Form.Item>
        </Form>
        );
}

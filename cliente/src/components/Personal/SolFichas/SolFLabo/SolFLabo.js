import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined, ItalicOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import {RegSolLabo} from "../../../../api/solicitud";

import "./SolFLabo.scss";

export default function SolFLabo(props) {
    const {mascot, user , setIsVisibleModal}= props;
    const{Option} = Select;
    const [solLabData, setSolLabData] = useState({});

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    const fechaActual = `${year}-${month}-${day}`;

    const addFSolLabo = event => {
        event.preventDefault();
        solLabData.dueno = mascot.usuDueno;
        solLabData.paciente = mascot.nombre;
        solLabData.personal = user.usuario;
        solLabData.fecha = fechaActual;
        if(!solLabData.t_prueba || !solLabData.observaciones ){
            notification["error"]({
                message:"Los campos mencionados son requeridos"
            });
        }else{
            const accesstoken = getAccessTokenApi();
            RegSolLabo(accesstoken, solLabData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setSolLabData({});
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
            <AddForm solLabData={solLabData} setSolLabData={setSolLabData} addFSolLabo={addFSolLabo}/>
        </div>
    )
}

function AddForm (props){
    const {solLabData,setSolLabData,addFSolLabo}=props;
    const {Option}=Select;
    const {TextArea}= Input;
    return(
        <Form className="form-add" onSubmitCapture={addFSolLabo}>
                <div>
                    <h3>Por Favor llene todos los campos </h3><p></p>
                </div>
                <Row gutter={24}>
                    <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Tipo de prueba"
                            onChange={e => setSolLabData ({...solLabData, t_prueba: e })}
                            value= {solLabData.t_prueba}
                        >
                            <Option value="alergia">Alergia (Sangre)</Option>
                            <Option value="hematologia">Hematologia (Sangre) </Option>
                            <Option value="frotis_sanguineo">Frotis Sanguineo  (Sangre)</Option>
                            <Option value="parasitos_hematicos">Parasitos Hematicos (Sangre)</Option>
                            <Option value="plaquetas">Plaquetas (Sangre)</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={2}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Observaciones"
                        value= {solLabData.observaciones}
                        onChange={e => setSolLabData ({...solLabData, observaciones: e.target.value})}
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

import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import {useDropzone} from "react-dropzone";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined, ItalicOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import {RegFLabo} from '../../../../api/fichas';

import "./FormFLabo.scss";

export default function FormFLabo(props) {
    const{user, setISvisibleModal,solLabo} = props;
    const{Option} = Select;
    const [fLaboData, setFLaboData] = useState({});

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    const fechaActual = `${year}/${month}/${day}`;
     const addFicha = event => {
        event.preventDefault();
        let cargaFLabo = fLaboData;
        cargaFLabo.personal = user.usuario;
        cargaFLabo.paciente = solLabo.paciente;
        cargaFLabo.fecha = fechaActual;
        cargaFLabo.dueno = solLabo.dueno;
        if( !cargaFLabo.glucosa || !cargaFLabo.hemoglobina || !cargaFLabo.proteinas || !cargaFLabo.bilirrubina || !cargaFLabo.bacterias || !cargaFLabo.hematies ){
            notification["error"]({
                message:"Los campos mencionados son requeridos"
            });
        }else{
            const accesstoken = getAccessTokenApi();
            RegFLabo(accesstoken, cargaFLabo)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setFLaboData({});
                    setISvisibleModal(false);
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
            fLaboData={fLaboData}
            setFLaboData={setFLaboData}
            addFicha={addFicha}
            solLabo={solLabo}
        />
    </div>
    )
}

function AddForm (props){
    const {fLaboData,setFLaboData,addFicha,solLabo}=props;
    const {Option}=Select;
    const {TextArea}= Input;
    return(
        <Form className="form-add" onSubmitCapture={addFicha}>
                <div>
                    <h3>Los Campos tipo de prueba, glucosa, hemoglobina, proteinas, bilirrubina, bacterias y hematies son obligatorios</h3>
                </div>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Tipo de Prueba"
                            onChange={e => setFLaboData({...fLaboData, t_prueba: e })}
                            value= {solLabo.t_prueba}
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
                        onChange={e => setFLaboData ({...fLaboData, observaciones: e.target.value})}
                        value= {fLaboData.observaciones}

                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Glucosa"
                            onChange={e => setFLaboData ({...fLaboData, glucosa: e })}
                            value= {fLaboData.glucosa}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Hemoglobina"
                            onChange={e => setFLaboData ({...fLaboData, hemoglobina: e })}
                            value= {fLaboData.hemoglobina}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Proteinas"
                            onChange={e => setFLaboData ({...fLaboData, proteinas: e })}
                            value= {fLaboData.proteinas}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Bilirrubina"
                            onChange={e => setFLaboData ({...fLaboData, bilirrubina: e })}
                            value= {fLaboData.bilirrubina}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Urobilinogeno"
                            onChange={e => setFLaboData ({...fLaboData, urobilinogeno: e })}
                            value= {fLaboData.urobilinogeno}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Select
                            placeholder="Cp Cetonicos"
                            onChange={e => setFLaboData ({...fLaboData, cp_cetonicos: e })}
                            value= {fLaboData.cp_cetonicos}
                        >
                            <Option value="Normal,mg/dl">NORMAL,mg/dl</Option>
                            <Option value="Negativo,mg/dl">NEGATIVO,mg/dl</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={2}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Bacterias"
                        value= {fLaboData.bacterias}
                        onChange={e => setFLaboData ({...fLaboData, bacterias: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        rows={2}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Hematies en sangre"
                        value= {fLaboData.hematies}
                        onChange={e => setFLaboData ({...fLaboData, hematies: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Registrar Ficha de Laboratorio
                </Button>
            </Form.Item>
        </Form>
        );
}

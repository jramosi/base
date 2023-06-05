import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification, Space, DatePicker} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import { UserOutlined,MailOutlined,ShopOutlined,PhoneOutlined,UnlockOutlined } from '@ant-design/icons';
import {regCita} from "../../../api/reserva";
import {postReser} from "../../../api/reserva";
import {getAccessTokenApi} from "../../../api/auth";

import "./RegCita.scss";

export default function RegCita(props) {
    const{mascot,setIsVisibleModal}=props;
    const [validoFecha, setValidoFecha] = useState(false);
    const [fechaData, setFechaData] =useState([])
    const [devuelto, setDevuelto]= useState([]);
    const token = getAccessTokenApi();

    const registrar = ()=> {
        let reserData = fechaData;
        reserData.paciente = mascot.nombre;
        reserData.dueno = mascot.usuDueno;
        if(! reserData.hora || !reserData.fecha || !reserData.sala)
        {
            notification["error"]({
                message: "Seleccione todos los campos requeridos"
            })
        }
        else{
            if(validoFecha)
            {
            regCita(token, reserData).then(response => {
                notification["success"]({
                    message: response
                });
            })
            .catch(err =>{
                notification["error"]({
                    message: err
                });
            });
            setFechaData([]);
            setIsVisibleModal(false);
            }
            else{
                notification["error"]({
                    message:"Valide su fecha y hora de reserva por favor"
                });
            }
        }
        

    }

    return(
        <div>
            <div className="edit-user-form">
                <AddFecha  validoFecha={validoFecha} setValidoFecha={setValidoFecha} fechaData={fechaData} setFechaData={setFechaData}
                    devuelto={devuelto} setDevuelto={setDevuelto}
                />
            </div>
            <Button type="primary" block onClick= {registrar}>
                Registrar Reserva
            </Button>
        </div>
    )

}

function AddFecha(props){
    const{validoFecha, setValidoFecha, fechaData, setFechaData, devuelto, setDevuelto}=props;
    const{Option}= Select;
    
    const validar =   e => {
        fechaData.hora = `${fechaData.hor}:${fechaData.min}`
         if(!fechaData.hor || !fechaData.min || ! fechaData.fecha || !fechaData.sala){
            notification["error"]({message:"Todos los campos son requeridos"});
            setValidoFecha(false);
        }else{
             postReser(fechaData.fecha,fechaData.hora,fechaData.sala).then(response =>{
                setDevuelto(response.postReser);
            });
            if(devuelto.length==0){
                notification["success"]({
                    message:"Horario valido, continue con el registro"
                });
                setValidoFecha(true);
                
            }else{
                notification["error"]({
                    message:"Ese horario ya esta reservado, por favor cambie de hora o fecha."
                });
                setValidoFecha(false);
            }
            
        }
    }

    return(
        <div>
            <div>
                <h3>Antes de registrar tu reserva valida la hora y fecha por favor.</h3>
            </div>
        <Form className="form-edit" onSubmitCapture={validar}>
            <Row gutter={24}>
                <Col span={6.5}>
                    <Form.Item>
                            <Select
                                placeholder="Hora"
                                onChange={e => setFechaData ({...fechaData, hor: e })}
                                value= {fechaData.hor}
                            >
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                                <Option value="15">15</Option>
                                <Option value="16">16</Option>
                                <Option value="17">17</Option>
                            </Select>
                    </Form.Item>
                </Col>
                <Col span={6.5}>
                    <Form.Item>
                            <Select
                                placeholder="Min"
                                onChange={e => setFechaData ({...fechaData, min: e })}
                                value= {fechaData.min}
                            >
                                <Option value="00">00</Option>
                                <Option value="20">20</Option>
                                <Option value="40">40</Option>
                            </Select>
                    </Form.Item>
                </Col>
                <Col span={11} >
                    <Form.Item>
                        <Space direction="vertical" size={11}>
                            <DatePicker renderExtraFooter={() => 'Por favor selecciona entre lunes a viernes'} 
                                format="YYYY-MM-DD"
                                onChange={(date,dateString) => setFechaData({...fechaData, fecha:dateString})}
                                
                            />
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccione Consultorio"
                            onChange={e => setFechaData ({...fechaData, sala: e })}
                            value={fechaData.sala}
                        >
                            <Option value="Sala 1 AT. GENERAL">Sala 1 AT. GENERAL</Option>
                            <Option value="Sala 2 AT. GENERAL">Sala 2 AT. GENERAL</Option>
                            <Option value="Sala 3 RADIOGRAFIA">Sala 3 RADIOGRAFIA</Option>
                            <Option value="Sala 4 LABORATORIO">Sala 4 LABORATORIO</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <h3>Para evitar errores por favor presione dos veces la validacion</h3>
            </Row>
                <Form.Item>
                        <Button  type="danger" htmlType="submit" className="btn-submit">
                            Validar Horario
                        </Button>
                </Form.Item>
        </Form>
        <div>
            {validoFecha? <h3>Su fecha es valida continue con el registro</h3>:<h3>Antes de registrar, valide su hora y fecha por favor</h3>}
        </div>
    </div>
    )
}
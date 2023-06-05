import React, { useState, useEffect } from 'react';
import {Avatar,Form,Input,Select,Button,Row,Col,notification, Space, DatePicker} from "antd";
import ListCitas from '../../../components/Personal/ListCitas';
import useAuth from '../../../hooks/useAuth';
import {getReserPerson} from '../../../api/reserva';
export default function CitProg() {
    
    const {user} = useAuth();
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    const fechaActual = `${year}/${month}/${day}`;
    const [fechaCita, setFechaCita]= useState({
        valor:fechaActual
    });

    const [reservas, setReservas]= useState([]);
    useEffect(()=>{
        getReserPerson(fechaCita.valor,user.sala).then(response =>{
            setReservas(response.citas);
        })
        console.log(reservas);
    },[fechaCita]);
    setFechaCita.valor = fechaActual;
    return(
        <div>
            <div>
                <Space direction="vertical" size={15}>
                    <DatePicker
                        renderExtraFooter={() => 'Por favor selecciona entre lunes a viernes'} 
                        format="YYYY-MM-DD"
                        onChange={(date,dateString) => setFechaCita({...fechaCita, valor:dateString})}                
                    />
                </Space>
            </div>
            <h2>Seleccione la fecha para ver las citas programadas</h2>
            <div>
                <ListCitas reservas={reservas}/>
            </div>
        </div>
    );
}
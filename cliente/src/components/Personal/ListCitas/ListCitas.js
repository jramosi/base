import React,{useState,useEffect} from "react";
import {List, Avatar, Button, Input, Form} from "antd";

export default function ListCitas(props) {
    const{reservas}=props
   return(
    <div className="list-mascot">
    <List 
    className="mascot-list"
    itemLayout="horizontal"
    dataSource={reservas}
    renderItem={reserva =>( //funciona como bucle
            <List.Item.Meta
                title={` Paciente: ${reserva.paciente}`}
                description={`hora: ${reserva.hora}
                            Dueño: ${reserva.dueno}`}
            />
    )}
    />
    </div>
   )
}
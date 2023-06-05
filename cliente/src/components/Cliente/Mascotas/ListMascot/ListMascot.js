import React,{useState} from "react";
import {List, Avatar, Button} from "antd";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import ModalR from "../../../../components/Cliente/Modal";
import RegCita from "../../RegCita";
import "./ListMascot.scss";

export default function ListMascots(props) {
    const { mascotUser, setMascotUser, isVisibleModal, setIsVisibleModal,setModalTitle, setModalContent} = props;

    const RegisCita = mascot =>{
        setIsVisibleModal(true);
        setModalTitle(`Reserva de cita para: ${mascot.nombre}`);
        setModalContent(<RegCita mascot={mascot} setIsVisibleModal={setIsVisibleModal}/>);
    }

    return(
        <div className="list-mascot">
            <MascotList mascotUser={mascotUser} RegisCita={RegisCita}/>
        </div>

    );
}

function MascotList(props) {
    const {mascotUser,RegisCita}=props;
    return (
        <List 
            className="mascot-list"
            itemLayout="horizontal"
            dataSource={mascotUser}
            renderItem={mascot =>( //funciona como bucle
                <List.Item 
                    //para botones
                    actions={[
                        <Button
                            type="primary"
                            onClick={()=>RegisCita(mascot)}
                        >Reservar Cita</Button>
                    ]}
                    //
                >
                    <List.Item.Meta
                        avatar={<Avatar src={mascot.avatar? mascot.avatar : NoAvatar}/>}
                        title={`${mascot.nombre ? mascot.nombre : '...'}`}
                        description={`Especie: ${mascot.especie}`}
                    />
                </List.Item>
            )}
        />
    );

}

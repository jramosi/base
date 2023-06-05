import React,{useState,useEffect} from "react";
import {List, Avatar, Button, Input, Form} from "antd";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import { EyeOutlined } from '@ant-design/icons';
import {getAccessTokenApi} from "../../../../api/auth";
import {getAllMascotUSu} from "../../../../api/mascota";
import ModalR from "../../Modal";
import FormFcomun from "../../../Personal/FichasMedicas/FichaComun";
import FormFLabo from "../../../Personal/FichasMedicas/FichaLaboratorio";
import SolFRadio from "../../SolFichas/SolFRadio";
import SolFLabo from "../../SolFichas/SolFLabo";
import ListFNormal  from "../ListFNormal";
import useAuth from '../../../../hooks/useAuth';
import {getFNormal} from "../../../../api/fichas";

import "./ListMascot.scss";



export default function ListMascots(props) {
    const{mascotUser, setMascotUser}= props;
    const {user} = useAuth();
    const token = getAccessTokenApi();
    const [modalTitle, setModalTitle]= useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const RegFnormal = mascot =>{
        setIsVisibleModal(true);
        setModalTitle(`Registro de Ficha Clinica General`);
        setModalContent(<FormFcomun mascot={mascot} user={user} setIsVisibleModal={setIsVisibleModal}/>);
    }

    const RegSolRadio = mascot =>{
        setIsVisibleModal(true);
        setModalTitle(`Solicitud de Radiografia`);
        setModalContent(<SolFRadio mascot={mascot} user={user} setIsVisibleModal={setIsVisibleModal}/>);
    }
    const RegSolLAbo = mascot =>{
        setIsVisibleModal(true);
        setModalTitle(`Solicitud de Laboratorio`);
        setModalContent(<SolFLabo mascot={mascot} user={user} setIsVisibleModal={setIsVisibleModal}/>);
    }
    
    const ListFN = mascot =>{
        setIsVisibleModal(true);
        setModalTitle(`Historia Clinica`);
        setModalContent(<ListFNormal token={token} mascot={mascot} setIsVisibleModal={setIsVisibleModal}/>);
    }

    return(
        <div className="list-mascot">
            <div><h2>PACIENTES (MASCOTAS) REGISTRADAS</h2></div>
            <AllMascot mascotUser={mascotUser} RegFnormal={RegFnormal} ListFN={ListFN} RegSolRadio={RegSolRadio} RegSolLAbo={RegSolLAbo}/>
            <ModalR
                title={modalTitle}
                isVisible= {isVisibleModal}
                setIsVisible={setIsVisibleModal}
                >
                {modalContent}
                 </ModalR>
        </div>

    );
}
function AllMascot(props){
    const {mascotUser, RegFnormal,  ListFN, RegSolRadio, RegSolLAbo}=props;
   return(
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
                    onClick={() => RegFnormal(mascot)}
                >FN
                </Button>,
                <Button
                    onClick={() => RegSolRadio(mascot)}
                >
                S.R.
                </Button>,
                <Button
                onClick={() => RegSolLAbo(mascot)}
                >
                S.L.
                </Button>,
                <Button
                onClick={() => ListFN(mascot)}
                >
                <EyeOutlined />
                </Button>
            ]}
            //
        >
            <List.Item.Meta
                title={`Paciente:
                    ${mascot.nombre ? mascot.nombre : '...'}`}
                description={`Dueño: ${mascot.usuDueno? mascot.usuDueno : '...'}, ${mascot.raza}`}
            />
        </List.Item>
    )}
/>
   )
}
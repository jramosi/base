import React,{useState,useEffect} from "react";
import {List, Avatar, Button, Input, Form} from "antd";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import { CloseOutlined } from '@ant-design/icons';
import {getAccessTokenApi} from "../../../../api/auth";
import {getAllMascotUSu} from "../../../../api/mascota";
import ModalR from "../../Modal";
import FormFLabo from "../../../Personal/FichasMedicas/FichaLaboratorio";
import useAuth from '../../../../hooks/useAuth';

import "./ListFLabo.scss";



export default function ListFLabo(props) {
    const{solLabos}= props;
    const {user} = useAuth();
    const token = getAccessTokenApi();
    const [fichaData,setFichaData] = useState([]);
    const [modalTitle, setModalTitle]= useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    

    const RegFLabo = solLabo =>{
        setIsVisibleModal(true);
        setModalTitle(`Registro de Ficha Clinica de Laboratorio`);
        setModalContent(<FormFLabo solLabo={solLabo} user={user} setIsVisibleModal={setIsVisibleModal}/>);
    }

    return(
        <div className="list-mascot">
            <AllMascot solLabos={solLabos} RegFLabo={RegFLabo}/>
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
    const {solLabos,RegFLabo}=props;
   return(
    <List 
    className="mascot-list"
    itemLayout="horizontal"
    dataSource={solLabos}
    renderItem={solLabo =>( //funciona como bucle
        <List.Item 
            //para botones
            actions={[
                <Button
                    type="primary"
                    onClick={() => RegFLabo(solLabo)}
                >
                FL
                </Button>
                
            ]}
            //
        >
            <List.Item.Meta
                title={`Paciente: ${solLabo.paciente}, Prueba: ${solLabo.t_prueba}`}
                description={`Dueño: ${solLabo.dueno}, obs: ${solLabo.observaciones}, ${solLabo.fecha}`} 
            />
        </List.Item>
    )}
/>
   )
}
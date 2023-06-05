import React,{useState,useEffect} from "react";
import {List, Avatar, Button, Input, Form} from "antd";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import { CloseOutlined } from '@ant-design/icons';
import {getAccessTokenApi} from "../../../../api/auth";
import {getAllMascotUSu} from "../../../../api/mascota";
import ModalR from "../../Modal";
import useAuth from '../../../../hooks/useAuth';
import FormRadiografia from "../../FichasMedicas/FichaRadiografia";

import "./ListFRadio.scss";



export default function ListFRadio(props) {
    const{solRadios,setSolRadios}= props;
    const {user} = useAuth();
    const token = getAccessTokenApi();
    const [fichaData,setFichaData] = useState([]);
    const [modalTitle, setModalTitle]= useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    console.log(solRadios);
    const RegFRadio = solRadio =>{
        setIsVisibleModal(true);
        setModalTitle(`Registro de Ficha Clinica General`);
        setModalContent(<FormRadiografia solRadio={solRadio} user={user} setIsVisibleModal={setIsVisibleModal} setSolRadios={setSolRadios}/>);
    }
    return(
        <div className="list-mascot">
            <AllMascot solRadios={solRadios} RegFRadio={RegFRadio}/>
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
    const {solRadios, RegFRadio}=props;
   return(
    <List 
    className="mascot-list"
    itemLayout="horizontal"
    dataSource={solRadios}
    renderItem={solRadio =>( //funciona como bucle
        <List.Item 
            //para botones
            actions={[
                <Button
                    type="primary"
                    onClick={() => RegFRadio(solRadio)}
                >
                Reg. Radiografia
                </Button>,
                
            ]}
            //
        >
            <List.Item.Meta
                title={`Paciente: ${solRadio.paciente}, Parte: ${solRadio.parte} ${solRadio.parte_det}`}
                description={`Dueño: ${solRadio.dueno}, obs: ${solRadio.observaciones}, ${solRadio.fecha}`} 
            />
        </List.Item>
    )}
/>
   )
}
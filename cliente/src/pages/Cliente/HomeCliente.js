import React,{useEffect, useState} from 'react';
import { List,Button, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import FormReg from "../../components/Cliente/RegMascot";
import ModalR from "../../components/Cliente/Modal";
import useAuth from '../../hooks/useAuth';
import {getMascotUSu} from "../../api/mascota";
import {getAccessTokenApi} from "../../api/auth";
import ListMascots from "../../components/Cliente/Mascotas/ListMascot";

export default function HomeCliente(props) {
    const {user} = useAuth();
    const [modalTitle, setModalTitle]= useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [mascotUser, setMascotUser] = useState([]);
    const [refrescarMascot,setRefrescarMascot] = useState(false); 
    const token = getAccessTokenApi();    
//  
    useEffect(()=>{
        getMascotUSu(token, user.usuario).then(response =>{
            setMascotUser(response.mascots);
        });
        setRefrescarMascot(false);
    },[token,refrescarMascot])

//
    const RegMascot = user =>{
        setIsVisibleModal(true);
        setModalTitle(`Registro de mascota`);
        setModalContent(<FormReg user={user} setIsVisibleModal={setIsVisibleModal} setRefrescarMascot={setRefrescarMascot}/>);
    }
    return(
        <div>
            <div>
                <Row gutter={24}>
                    <Col span={10}>
                    <h1>Bienevenido: {user.usuario}</h1>
                    </Col>
                    <Col span={14}>
                    <h3>Agenda una cita para que tu mascota sea atendida por favor</h3>
                    </Col>
                </Row>
                <Button
                     type="primary"
                     onClick={() => RegMascot(user)}
                >
                    Registrar Mascota
                    <PlusCircleOutlined />
                </Button>
                <ModalR
                title={modalTitle}
                isVisible= {isVisibleModal}
                setIsVisible={setIsVisibleModal}
                >
                {modalContent}
                 </ModalR>
                 <div>
                    <ListMascots mascotUser={mascotUser} setMascotUser={setMascotUser} isVisibleModal={isVisibleModal} 
                    setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} modalTitle={modalTitle} setModalContent={setModalContent}
                    modalContent={modalContent}/>
                 </div>
            </div>
        </div>
    );
}
import React, {useState, useEffect} from "react";
import {Switch, List, Avatar, Button, notification} from "antd";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import { EditOutlined, DeleteOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Modal from "../../../Admin/Modal";
import EditUserForm from "../EditUserForm";
import { getAvatarApi, activateUserApi, desativateUserApi } from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersInactive,setRefrescarUsers} = props
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const[isVisiblemodal,setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle]= useState("");
    const [modalContent, setModalContent] = useState(null);


    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={()=> setViewUsersActives(!viewUsersActives)}
                />
                <span>
                    {viewUsersActives? " Usuarios Activos" : " Usuarios Inactivos"}
                </span>
            </div>

        {viewUsersActives ? (
        <UsersActive 
            usersActive={usersActive} //variable que actualizan estados
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle} 
            setModalContent={setModalContent}
            setRefrescarUsers={setRefrescarUsers}
        />
        ):(
        <UsersInactive 
            usersInactive={usersInactive}
            setRefrescarUsers={setRefrescarUsers}
        />
        )}
        <Modal
            title={modalTitle}
            isVisible= {isVisiblemodal}
            setIsVisible={setIsVisibleModal}
        >
            {modalContent}
        </Modal>
        </div>
    );
}

function UsersActive (props){
    const {usersActive, setIsVisibleModal, setModalTitle, setModalContent,setRefrescarUsers} = props;


    const editUser =user =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar usuario: ${user.usuario}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setRefrescarUsers={setRefrescarUsers}/>);
    }

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem = {user => <UserActive user={user} editUser={editUser} setRefrescarUsers={setRefrescarUsers} />}
        />
    );
}

function UserActive(props){
    const {user, editUser,setRefrescarUsers} = props;
    const [avatar, setAvatar] = useState(null);
    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else {
            setAvatar(null);
        }
    },[user]);

    const desactivateUser = () => {
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setRefrescarUsers(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    };
    
    return(
        <List.Item 
            actions={[
            <Button
                type="primary"
                onClick={() => editUser(user)}
            >
                <EditOutlined />
            </Button>,
            <Button
                type="danger"
                onClick={desactivateUser}
            >
                <StopOutlined />
            </Button>
            
        ]}
    >
        <List.Item.Meta 
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />} //condicionando
            title={` Usuario:${user.usuario ? user.usuario : "..." } ,${user.rol}`}// se puede ponen mas
            description = {`Nombre: ${user.nombre} ${user.apellidoP}, ${user.sala!=="no definido"? user.sala : ".." }`}
        />
    </List.Item>
    )
}

function UsersInactive (props){
    const{usersInactive,setRefrescarUsers}= props;

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem = {user => <UserInactive user={user} setRefrescarUsers={setRefrescarUsers}/>}
        />
    );
}

function UserInactive (props){
    const {user, editUser,setRefrescarUsers} = props;
    const [avatar, setAvatar] = useState(null);
    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else {
            setAvatar(null);
        }
    },[user]);
    const activateUser = () => {
        const accesToken = getAccessTokenApi();

        desativateUserApi(accesToken, user._id)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setRefrescarUsers(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    };

    return(
        <List.Item 
                    actions={[
                        <Button
                            type="primary"
                            onClick={activateUser}

                        >
                            <CheckCircleOutlined />
                        </Button>
                        
                    ]}
                >
                    <List.Item.Meta 
                        avatar={<Avatar src={avatar ? avatar : NoAvatar} />} //condicionando
                        title={` Usuario:${user.usuario ? user.usuario : "..." } ,${user.rol}`}// se puede ponen mas
                        description = {`Nombre: ${user.nombre} ${user.apellidoP}, ${user.sala!=="no definido"? user.sala : ".." }`}
                    />
                </List.Item>
    )

}
import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import { getUsersActiveApi} from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";


import "./Users.scss";

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [refrescarUsers,setRefrescarUsers] = useState(false); //para recargar lista de usuarios
    const token = getAccessTokenApi();


    useEffect(()=> {
        getUsersActiveApi(token, true).then(response => { //responde contiene todos los usuarios activods
            setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => { //responde contiene todos los usuarios inactivos
            setUsersInactive(response.users);
        });
        setRefrescarUsers(false);
    }, [token, refrescarUsers]);

    return(
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setRefrescarUsers={setRefrescarUsers}/>
        </div>
    );
}

//
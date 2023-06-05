import React, { useState,useEffect } from 'react';
import { Radio,Button,List,Input, Space, Avatar  } from 'antd';
import useAuth from '../../../hooks/useAuth';
import ListMascot from "../../../components/Personal/FichasMedicas/ListMascot";
import {getAccessTokenApi} from "../../../api/auth";
import {getMascotAll} from "../../../api/mascota";
import {getFNormal} from "../../../api/fichas";
import Form from 'antd/lib/form/Form';

export default function VistaFicha(props) {
    const {user} = useAuth();
    const [mascotUser,setMascotUser]= useState([]);
    const token = getAccessTokenApi();

    useEffect(()=>{
        getMascotAll(token).then(response =>{
            setMascotUser(response.mascots);
        });


    },[token])



    return(
        <div>
            <div>
                <ListMascot mascotUser={mascotUser} setMascotUser={setMascotUser}/>
            </div>       
        </div>
    );
}


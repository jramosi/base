import React, { useState,useEffect } from 'react';
import { Radio,Button,List,Input, Space, Avatar  } from 'antd';
import useAuth from '../../../hooks/useAuth';
import ListFLabo from '../../../components/Personal/SolFichas/ListFLabo';
import {getAccessTokenApi} from "../../../api/auth";
import {getSolLaboAll} from "../../../api/solicitud";
export default function SolLabo(props) {
    const {user} = useAuth();
    const [solLabos, setSolLabos]= useState([]);
    const token = getAccessTokenApi();

    useEffect(()=>{
        getSolLaboAll(token).then(response =>{
            setSolLabos(response.solLabos);
        });
    },[token])
    console.log(solLabos);

    return(
        <div>
            <div>
                <h2>sol Laboratorio</h2>
            </div>       
            <div>
                <ListFLabo solLabos={solLabos}/>
            </div>
        </div>
    );
}


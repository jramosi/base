import React, { useState,useEffect } from 'react';
import { Radio,Button,List,Input, Space, Avatar  } from 'antd';
import useAuth from '../../../hooks/useAuth';
import ListFRadio from '../../../components/Personal/SolFichas/ListFRadio';
import {getAccessTokenApi} from "../../../api/auth";
import {getSolRadioAll} from "../../../api/solicitud";
export default function SolRadio(props) {
    const {user} = useAuth();
    const [solRadios, setSolRadios]= useState([]);
    const token = getAccessTokenApi();
    const [reloadSRadio, setReloadSRadio]=useState(false);


    useEffect(()=>{
        getSolRadioAll(token).then(response =>{
            setSolRadios(response.solRadios);
        });
        setReloadSRadio(false);
    },[token],reloadSRadio)
    console.log(solRadios);

    return(
        <div>
            <div>
                <h2>SOLICITUD DE RADIOGRAFIAS</h2>
            </div>       
            <div>
                <ListFRadio solRadios={solRadios} setSolRadios={setSolRadios}/>
            </div>
        </div>
    );
}


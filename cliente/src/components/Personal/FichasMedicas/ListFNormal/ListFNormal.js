import React,{useState,useEffect} from "react";
import {List, Avatar, Button, Image , Form} from "antd";
import NoAvatar from "../../../../assets/img/logo-mascota.png";
import {getAccessTokenApi} from "../../../../api/auth";
import {getFNormal,getFLabo} from "../../../../api/fichas";
import {getFRadioUsu, getFtRadio} from "../../../../api/solicitud";


import "./ListFNormal.scss";
import ListFRadio from "../../SolFichas/ListFRadio/ListFRadio";

export default function ListFNormal(props) {

    const { token, mascot, setIsVisibleModal}= props;
    const [fichaData,setFichaData] = useState([]);
    const [fichaRadio,setFichaRadio] = useState([]);
    const [fichaLabo,setFichaLabo] = useState([]);
    const [fotRadiog, setFotRadiog] = useState(null);
    

    useEffect(()=>{
        getFNormal(token, mascot.usuDueno, mascot.nombre ).then(response =>{
            setFichaData(response.fnormals);
        });
    },[mascot]);

    useEffect(()=>{
        getFRadioUsu(token, mascot.usuDueno, mascot.nombre).then(response =>{
            setFichaRadio(response.fRadios);
        });
    },[mascot]);

    useEffect(()=>{
        getFLabo(token, mascot.usuDueno, mascot.nombre).then(response =>{
            setFichaLabo(response.fLaboRes);
        });
    },[mascot]);

    return(
        <div>
            <h2>Fichas Normales</h2>
            <ListFNor fichaData={fichaData}/>
            <h2>Fichas Radiografia</h2>
            <ListFRad fichaRadio={fichaRadio}/>
            <h2>Fichas LAboratorio</h2>
            <ListLabo fichaLabo={fichaLabo}/>
        </div>
    )
    
}
function ListFNor(props){
    const {fichaData}=props;
   return(
    <List
    className="mascot-list"
    itemLayout="horizontal"
    dataSource={fichaData}
    renderItem={fnormal =>( //funciona como bucle
        <List.Item>
            <List.Item.Meta
                title={`ANAMNESIS: ${fnormal.anamnesis}, SC: ${fnormal.signos_clinicos}`}
                description={`CONCLUSION: ${fnormal.conclusion}, RECETA: ${fnormal.receta}`}
            />

        </List.Item>
        )}
    />
   )
}

function ListFRad(props){
    const {fichaRadio}=props;
    return(
     <List
     className="mascot-list"
     itemLayout="horizontal"
     dataSource={fichaRadio}
     renderItem={flRadio => <ListconFot flRadio={flRadio}/>}
     />
    )
}

function ListconFot(props){
    const {flRadio} = props;
    const[foto, setFoto] = useState(null);
    useEffect(()=>{
        if(flRadio.ft_radiog){
            getFtRadio(flRadio.ft_radiog).then(response => {
                setFoto(response);
            });
        }else{
            setFoto(null);
        }
    },[flRadio]);

    return(
        <List.Item
            extra={
            <Image
            width={200}
              src={foto}
            />
          }
        >
             <List.Item.Meta
                 title={`PARTE: ${flRadio.parte}, PARTE DET: ${flRadio.parte_det}`}
                 description={`OBSERVACIONES: ${flRadio.observaciones}`}
             />
 
         </List.Item>
    )

  
}

function ListLabo(props){
    const {fichaLabo}=props;
   return(
    <List
    className="mascot-list"
    itemLayout="horizontal"
    dataSource={fichaLabo}
    renderItem={fLabo =>( //funciona como bucle
        <List.Item>
            <List.Item.Meta
                title={`T. PRUEBA: ${fLabo.t_prueba}, OBS: ${fLabo.observaciones}`}
                description={`Glucosa: ${fLabo.glucosa}, Hemoglobina: ${fLabo.hemoglobina}`}
            />

        </List.Item>
        )}
    />
   )
}

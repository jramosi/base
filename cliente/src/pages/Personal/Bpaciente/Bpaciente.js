import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {getAllMascotUSu} from '../../../api/mascota';
import {getAccessTokenApi} from "../../../api/auth";
import ListMascotsNom from '../../../components/Personal/FichasMedicas/ListMascotNom';


export default function Bpaciente() {
    const [busca, setBusca] = useState([]);
    const [estado, setEstado] = useState(false);

    

        return(
        <div>
          <BuscadorMascot busca={busca} setBusca={setBusca} estado={estado} setEstado={setEstado}/>
            {estado? <ListMascotsNom busca={busca}/>: <div><p></p><h2>Ingrese el nombre del paciente</h2></div>}
        </div>
    );
}


function BuscadorMascot(props){
    const {busca, setBusca, setEstado, estado} = props
    const token = getAccessTokenApi();
    const { Search } = Input;

    

    const filtrar = value=> {        
        const valor = value;
            getAllMascotUSu(token, valor).then(response =>{
                setBusca(response.mascots);
            });


            if(!valor){
                setEstado(false)
            }else{
                setEstado(true)
            }
            
    }
    return(
        <div>
            <Space direction="vertical">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={filtrar}
                />
            </Space>
        </div>
    )

    
}

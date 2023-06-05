import React from "react";
import {Avatar,Form,Input,Select,Button,Row,Col,notification} from "antd";
import { useCallback, useEffect, useState,  InputNumber } from "react";
import {useDropzone} from "react-dropzone";
import NoRadio from "../../../../assets/img/no-radio.png";
import { UserOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import {RegFNormal} from '../../../../api/fichas';
import {getFtRadio, uploadFtRadio} from '../../../../api/solicitud';

import "./FormRadiografia.scss";
import userEvent from "@testing-library/user-event";

export default function FormRadiografia(props) {
    const{solRadio,setIsVisibleModal,setSolRadios}=props;
    const{Option} = Select;
    const [fRadioData, setFRadioData] = useState({});
    const [ftRadiog, setFtRadiog] = useState(null);

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    const fechaActual = `${year}/${month}/${day}`;
//
    useEffect(()=>{
        setFRadioData({
            ft_radiog: solRadio.ft_radiog,
            parte: solRadio.parte,
            parte_det: solRadio.parte_det,
            observaciones: solRadio.observaciones
        })
    },[solRadio]);
    //
    useEffect(()=>{
        if(solRadio.ft_radiog){
            getFtRadio(solRadio.ft_radiog).then(response=>{
                setFtRadiog(response);
            });
        }else{
            setFtRadiog(null);
        }
    },[solRadio]);
    useEffect(()=>{
        if(ftRadiog){
            setFRadioData({...fRadioData, ft_radiog: ftRadiog.file})
        }
    },[ftRadiog]);
    //
    
    const updateRadio = () => {
        const token = getAccessTokenApi();
        let FtData = fRadioData;
        console.log("f",FtData.ft_radiog);
        if(typeof FtData.ft_radiog === "object"){
            uploadFtRadio(token, FtData.ft_radiog, solRadio._id).then(response=>{
                FtData.ft_radiog = response.radioName;
            })
            setIsVisibleModal(false);
            
        }    
    }

    return(
        <div className="add-radio-form">
            <UploadRadiog ftRadiog={ftRadiog} setFtRadiog={setFtRadiog} updateRadio={updateRadio}/>
            <AddForm solRadio={solRadio} />
        </div>
    )
}

function UploadRadiog(props){
    const {ftRadiog, setFtRadiog, updateRadio} = props;
    //
    const [fotoUrl, setFotoUrl]=useState(null);
    useEffect(()=>{
        if(ftRadiog){
            if(ftRadiog.preview){
                setFotoUrl(ftRadiog.preview);
            } else {
                setFotoUrl(ftRadiog);
            }
        }else{
            setFotoUrl(null);
        }

    },[ftRadiog]);

    const onDrop = useCallback(
        accepetedFiles =>{
            const file = accepetedFiles[0];
            setFtRadiog({file, preview: URL.createObjectURL(file) });
        },
        [setFtRadiog]
    );
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });
    console.log(ftRadiog);
    return(
        <div>
        <div className="upload-radiog" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive? (
                <Avatar shape="square" size={400} src={NoRadio} />
            ) : (
                <Avatar shape="square" size={400} src={fotoUrl ? fotoUrl : NoRadio} />
            )}
        </div>
        <div>
            <Button type="primary" onClick={updateRadio}>
                Guardar Radiografia
            </Button>
        </div>
        </div>
    )
}

function AddForm (props){
    const{solRadio} = props;
    const {Option}=Select;
    const {TextArea}= Input;
    return(
        <Form className="form-add" >
                <div>
                    <h3>Referencia</h3>
                </div>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Parte"
                                value={solRadio.parte}
                            />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Detallado"
                                value={solRadio.parte_det}
                            />
                        
                    </Form.Item>
                </Col>
            </Row>
             <TextArea
                        rows={2}
                        prefix={<UserOutlined style= {{color:"rgba(0,0,0,.25)"}} />}
                        placeholder="Observaciones"
                        value ={solRadio.observaciones}
                        />
            
        </Form>
        );
}

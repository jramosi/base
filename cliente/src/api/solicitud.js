import { refreshAccessTokenApi } from "./auth";
import {basePath, apiVersion} from "./config";

export function RegSolRadio(token, data) {
    const url = `${basePath}/${apiVersion}/reg-solradio`;
    const params = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
        return response.json();
         })
        .then(result =>{
            return result.message;
        })
        .catch( err => {
         return  err.message;
    })
}
export function RegSolLabo(token, data) {
    const url = `${basePath}/${apiVersion}/reg-sollabo`;
    const params = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
        return response.json();
         })
        .then(result =>{
            return result.message;
        })
        .catch( err => {
         return  err.message;
    })
}

export function getSolLaboAll(token) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/sol-labo`;

    const params = {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err =>{
        return err.message;
    });
}

export function getSolRadioAll(token) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/sol-radio`;

    const params = {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err =>{
        return err.message;
    });
}

export function uploadFtRadio(token, ft_radiog, SolId){
    const url = `${basePath}/${apiVersion}/upload-foto/${SolId}`;

    const formData = new FormData();

    formData.append("ft_radiog", ft_radiog, ft_radiog.name);

    const params ={
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch(url, params).then(response =>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}

export function getFtRadio(fotoName){
    const url = `${basePath}/${apiVersion}/get-foto/${fotoName}`;

    return fetch(url).then(response=>{
        return response.url;
    }).catch(err=>{
        return err.message;
    })

}

export function getFRadioUsu(token, dueno, paciente) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/frad-usu?dueno=${dueno}&paciente=${paciente}`;
    const params = {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
            Authorization: token
        }
    };
    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err =>{
        return err.message;
    });   
}
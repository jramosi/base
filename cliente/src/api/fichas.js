import {basePath, apiVersion} from "./config";

export function RegFNormal(token, data) {
    const url = `${basePath}/${apiVersion}/reg-fnorm`;
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
export function RegFLabo(token, data) {
    const url = `${basePath}/${apiVersion}/reg-labo`;
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
export function getFNormal(token, dueno, paciente) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/fnormal-usu?dueno=${dueno}&paciente=${paciente}`;

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

export function getFLabo(token, dueno, paciente) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/flab-usu?dueno=${dueno}&paciente=${paciente}`;

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
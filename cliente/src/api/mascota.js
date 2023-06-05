import {basePath, apiVersion} from "./config";
export function signUpApi(token, data) {
    const url = `${basePath}/${apiVersion}/reg-masc`;
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
export function getMascotAll(token) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/mascot-all`;

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

export function getMascotUSu(token,usuDueno)
{
    const url= `${basePath}/${apiVersion}/mascot?usuDueno=${usuDueno}`;

    const params ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response=> {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err=> {
            return err.message;
        });
}

export function getAllMascotUSu(token,nombre)
{
    const url= `${basePath}/${apiVersion}/mascot-nom?nombre=${nombre}`;

    const params ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response=> {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err=> {
            return err.message;
        });
}
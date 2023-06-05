import {basePath, apiVersion} from "./config";

export function regCita(token, reserva) {
    const url = `${basePath}/${apiVersion}/reg-reserv`;
    const params = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(reserva)
        
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

export function postReser(fecha, hora, sala) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/post-reserv?fecha=${fecha}&hora=${hora}&sala=${sala}`;

    const params = {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
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

export function getReserPerson(fecha, sala) { ////ojo sirve para recuperar datos //de aqui saco 
    const url = `${basePath}/${apiVersion}/reser-personal?fecha=${fecha}&sala=${sala}`;

    const params = {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
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
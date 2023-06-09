import {basePath, apiVersion} from "./config";

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result =>{
        if(result.user) {
            return {
                ok: true,
                message: "Usuario creado correctamente"
            };
        }
        return {
            ok: false,
            message: result.message
        };
    }).catch( err => {
        return {
            ok: false,
            message: err.message
        };
    })
}

export function signInApi(data){
    const url =`${basePath}/${apiVersion}/sign-in`;
    const params ={
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json"
        }
    };
    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}

export function getUsersApi(token) { ////ojo sirve para recuperar datos //de aqui saco
    const url = `${basePath}/${apiVersion}/users`;

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

export function getUsersActiveApi(token, status) { ////ojo sirve para recuperar datos
    const url = `${basePath}/${apiVersion}/users-activo?activo=${status}`;

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

export function uploadAvatarApi(token, avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

    const params ={
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch(url, params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err =>{
        return err.message;
    });
}

export function getAvatarApi(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

    return fetch(url).then(response=> {
        return response.url;

    }).catch(err=>{
        return err.message;
    });
}

export function updateUserApi(token, user, userId){
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;

    const params = {
        method : "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}

export function activateUserApi(token,userId){
    const url = `${basePath}/${apiVersion}/activate-user/${userId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application-json",
            Authorization: token
        }        
    };
    console.log(params);
    return fetch(url, params)
        .then(response=>{
            return response.json();
        })
        .then(result =>{
            return result.message;
        })
        .catch(err =>{
            return err.message;
        });

}

export function desativateUserApi(token,userId){
    const url = `${basePath}/${apiVersion}/desactivate-user/${userId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application-json",
            Authorization: token
        }        
    };
    console.log(params);
    return fetch(url, params)
        .then(response=>{
            return response.json();
        })
        .then(result =>{
            return result.message;
        })
        .catch(err =>{
            return err.message;
        });

}
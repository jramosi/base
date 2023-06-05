import React, { useState } from "react";
import {Modal as ModalAntd} from "antd";

import "./Modal.scss";

export default function Modal(props){
    const {children, title, isVisible, setIsVisible} = props;


    return(
        <ModalAntd className="modal-login"
            title={title}
            centered
            visible={isVisible}
            onCancel={()=> setIsVisible(false)}
            footer={false}
        >
            {children}
        </ModalAntd>
    )

}
import { func } from "prop-types";
import React from "react";
import {Row,Col} from "antd";

import "./Baner.scss";

export default function Banner(){
    return (
        <div className="banner">
            <div className="banner__dark"/>

            <Row>
                <Col lg={2} />
                <Col lg={16}>
                    <h2>HOSPITAL VETERINARIO <br/> "EL RANCHO"</h2>

                    <h3>El hospital mas confiable y completo de la ciudad de El Alto<br/> con profesionales con años de experiencia</h3>
                    <br/>
                    <h3 className="otro">Ubic. Avenida Bolivia, El Alto</h3>
                </Col>
                <Col lg={3} />
            </Row>
        </div>
    )
}
import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import routes from '../config/routes';

export default function Error404() {
    return(
        <div>
            <h1>QUE MAL !!!  PARECE QUE TE PERDISTE </h1> <FrownOutlined /> <FrownOutlined /> <FrownOutlined />
            <div>
                <Row gutter={24}>
                    <Col span={9}>
                        
                    </Col>
                    <Col span={12}>

                        <h2>ERROR 404......</h2>
                    </Col>
                </Row> 
            </div>
            <div>
                <Row gutter={24}>
                    <Col span={7}>
                        
                    </Col>
                    <Col span={12}>

                    <h3>Inicia sesion para acceder al sistema por favor</h3>
                    </Col>
                </Row> 
                
            </div>
        </div>
    );
}
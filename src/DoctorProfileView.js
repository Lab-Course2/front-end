import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Image, Button, Tab, Nav } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';

const UserProfileCard = () => {
  const [activeTab, setActiveTab] = useState('details');
  const { userId } = useParams();


  useEffect(() => {
    console.log(userId);

    //
}, [userId]);


  return (
    <>
    <div className='container-fluid my-5'>
      <Row className="profile-row w-70 d-flex justify-content-center ">
        <div className='d-flex justify-content-center w-75 border rounded p-3 shadow'>
        <Col sm={4}>
          <Image src="doctor.jpg" fluid />
        </Col>
        <Col sm={4}>
          <h2>Detajet</h2>
          <p>Emri: Dr. John Smith</p>
          <p>Specializimi: Kardiologji</p>
          <p>Lokacioni: Spitali X</p>
        </Col>
        <Col sm={4}>
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <Button variant="primary">Bëni një termin</Button>
          </div>
        </Col>
        </div>
       
      </Row>
      
    </div>
    <div className='container-fluid h-100'>
        <Row className="mt-4" style={{height: '100vh'}}>
        <Col sm={12}>
          <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            <Row>
              <Col sm={12}>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Detajet</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="clinic">Klinika</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <div>
                      <h3>Detajet</h3>
                      <p>Përshkrimi i detajeve të doktorit...</p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="clinic">
                    <div>
                      <h3>Klinika</h3>
                      <p>Informacioni për klinikën...</p>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default UserProfileCard;
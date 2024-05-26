import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Tab, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Css/VisitProfile.css';

const UserProfileCard = () => {
  const [activeTab, setActiveTab] = useState('details');
  const { userId } = useParams();
  const [doctor, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7190/api/Doctor/GetDoctorById?doctorId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setDoctors(data);
      }
    };
    fetchData();
    //
  }, [userId]);

  return (
    <>
      <div className='container-fluid my-5'>
        <Row className="profile-row">
          <div className='d-flex align-items-center border rounded p-3 shadow smaller-box'>
            <Col sm={12} md={6} lg={3} className="col-fixed-width">
              <Image src={`data:image/${doctor.photoFormat};base64,${doctor.photoData}`} fluid />
            </Col>
            <Col sm={12} md={6} lg={9} className="col-fixed-width d-flex flex-column">
              <div>
                <h4>{doctor.name} {doctor.surname}</h4>
                <p className="specialisation-text">{doctor.specialisation}</p>
                <p className="birth-date">{doctor.dateOfBirth}</p>
                <p>📍{doctor.address}</p>
              </div>
              <div className="mt-auto text-right">
                <Button variant="primary" className="custom-book-btn align-self-end">
                  BOOK APPOINTMENT
                </Button>
              </div>
            </Col>
          </div>
        </Row>
      </div>

      <div className="smaller-box">
        <Row className="mt-4">
          <Col sm={12}>
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
              <Row>
                <Col sm={12}>
                  <Nav variant="tabs" className="profile-tabs">
                    <Nav.Item className="flex-fill text-center">
                      <Nav.Link
                        eventKey="details"
                        className={`nav-link ${activeTab === 'details' ? 'active-tab' : ''}`}
                      >
                        Overview
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-fill text-center">
                      <Nav.Link
                        eventKey="clinic"
                        className={`nav-link ${activeTab === 'clinic' ? 'active-tab' : ''}`}
                      >
                        Locations
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="details">
                      <div>
                        <h5>About me</h5>
                        <p>{doctor.description}</p>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="clinic">
                      <div>
                        <p>{doctor.address}</p>
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
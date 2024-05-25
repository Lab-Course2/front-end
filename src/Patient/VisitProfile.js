import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VisitProfile = ({ doctors }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        {doctors.map((doctor) => (
          <Col key={doctor.id} sm={8}>
            <div className="border rounded p-4 shadow profile-card">
              <Row>
                <Col sm={4}>
                  <Image src={doctor.image} fluid />
                </Col>
                <Col sm={8}>
                  <div className="profile-details">
                    <h2>{doctor.name}</h2>
                    <p>{doctor.specialisation}</p>
                    <h7>{doctor.title}</h7>
                    <p>Location: {doctor.location}</p>
                  </div>
                  <Row className="mt-3">
                    <Col sm={12} className="d-flex justify-content-end">
                      {/* Link to the doctor's profile */}
                      <Link to={`/doctor-profile/${doctor.id}`}>
                        <Button variant="primary">Visit Profile</Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      {/* ... (other components) */}
    </Container>
  );
};

export default VisitProfile;
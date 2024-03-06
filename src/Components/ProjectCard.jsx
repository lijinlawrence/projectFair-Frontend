import React, { useState } from "react";
import { Button, Card, Col, Modal,Row } from "react-bootstrap";
import projectImage from '../Assets/projectImage.jpg'
import { BASE_URL } from "../services/baseUrl";
const ProjectCard = ({project}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project?.projectImage}` :projectImage} onClick={handleShow} />
        <Card.Body>
          <Card.Title className=" text-success">{project?.title}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                style={{ height: "200px" }}
                className="img-fluid"
                src={project?`${BASE_URL}/uploads/${project?.projectImage}` :projectImage}
                alt="project image"
              />
            </Col>
            <Col md={6}>
              <h2 className=" text-danger">{project?.title}</h2>
              <p className=" text-info">
               Project Overview: {project?.overview}
              </p>
              <p>Language Used : <span className="fw-bolder text-info">{project?.language}</span></p>
            </Col>
            <div>
                <a href={project?.github} className="me-3 text-dark"><i className="fa-brands fa-github fa-2x"></i></a>
                <a href={project?.website} className="me-5 text-dark"><i className="fa-solid fa-link fa-2x"></i></a>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCard;

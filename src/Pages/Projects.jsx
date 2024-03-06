import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../Components/ProjectCard";
import { allProjectAPI } from "../services/allAPI";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [searchKey,setSearchKey]=useState("");

  const getAllProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const result = await allProjectAPI(searchKey,reqHeader);
      if (result.status === 200) {
        setAllProjects(result.data);
      } else {
        console.log(result);
      }
    }
  };

  console.log(allProjects);

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);
  return (
    <div>
      <Header />
      <div className="projects " style={{ marginTop: "100px" }}>
        <h1 className="text-center mb-5">All Projects</h1>
        <div className=" d-flex justify-content-center align-items-center w-100">
          <div className="d-flex border w-50">
            <input
              type="text"
              className=" form-control"
              placeholder="search projects by technologies... "
              onChange={e=>setSearchKey(e.target.value)}
            />
            <i
              style={{ marginLeft: "-50px" }}
              className="fa-solid fa-magnifying-glass fa-rotate-90"
            ></i>
          </div>
        </div>
        <Row className="mt-5 container-fluid ">
          {allProjects?.length > 0 ? 
            allProjects?.map((project) => (
              <Col className=" d-flex justify-content-center align-items-center" sm={12} md={6} lg={4}>
                <ProjectCard project={project} />
              </Col>
            ))
           : (
            <p className=" text-danger fw-bolder">Please login</p>
          )}
          <Col sm={12} md={6} lg={4}>
            <ProjectCard />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Projects;

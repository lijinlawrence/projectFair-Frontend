import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import titleImage from "../Assets/working image.jpg";
import { Link } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import { homeProjectAPI } from "../services/allAPI";

const Home = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [homeProjects,setHomeProjects]= useState([])
  // api call
   const getHomeProjects = async()=>{
    const result = await homeProjectAPI()
    if(result.status === 200){
      setHomeProjects(result.data)
      console.log(homeProjects);
    }else{
      console.log(result);
      console.log(result.response.data);
      
    }
   }
   console.log(homeProjects);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }

    // api call
    getHomeProjects();
  }, []);
  return (
    <div className=" container-fluid">
      <Row className=" align-items-center mt-5 text-center">
        <Col sm={12} md={6}>
          <h1 style={{ fontSize: "80px" }} className="fw-bolder text-info ms-5">
            <i className="fa-solid fa-list-check me-2"></i>
            Project Fair
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            provident id neque eligendi facilis praesentium laboriosam, libero
            illo sapiente! Optio adipisci iure, sunt doloribus repudiandae
            tempore vel maiores numquam velit?
          </p>
          {loggedin?
            <Link to={"/dashboard"} className=" btn btn-warning">
            Manage Your Projects
            <i className="fa-solid fa-right-long me-2"></i>
          </Link>:
          <Link to={"/login"} className=" btn btn-warning">
            Start to Explore
            <i className="fa-solid fa-right-long me-2"></i>
          </Link>}
        
        </Col>
        <Col sm={12} md={6} className="text-center">
          <img
            width="400px   "
            height="300px"
            src={titleImage}
            alt=""
            className=" img-fluid"
          />
        </Col>
      </Row>

      {/* All Projects */}

      <div className="'all-projects mt-5">
        <h1 className=" text-center ">Explore Your Projects</h1>
      </div>
      <marquee scrollamount={25}>
  <Row>
    {homeProjects?.length > 0
      ? homeProjects.map((project) => (
          <Col  sm={12} md={6} lg={4}>
            <ProjectCard project={project} />
          </Col>
        ))
      : null}
  </Row>
</marquee>
      <div className=" text-center">
        <Link to={"/projects"}>View More Projects</Link>
      </div>
    </div>
  );
};

export default Home;

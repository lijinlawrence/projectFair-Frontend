import React, { useContext, useEffect, useState } from "react";
import AddProjects from "./AddProjects";
import { deleteProjectAPI, userProjectAPI } from "../services/allAPI";
import { AddProjectResponseContext, editProjectResponseContext } from "../Context/ContextShare";
import { Alert } from "react-bootstrap";
import EditProject from "./EditProject";

const MyProjects = () => {
  const { addProjectResponse, setAddProjectResponse } = useContext(
    AddProjectResponseContext
  );
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)


  const [userProjects, setUserProjects] = useState([]);

  const getUserProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await userProjectAPI(reqHeader);
      if (result.status === 200) {
        setUserProjects(result.data);
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getUserProject();
  }, [addProjectResponse,editProjectResponse]);

  const handleDelete = async(id)=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`, 
    }

   //api call
   const result= await deleteProjectAPI(id,reqHeader)
   if(result.status===200){
    //page reload
    getUserProject()
   } else{
    console.log(result.response.data);
   }
  }

  return (
    <div className=" card shadow p-3 mt-3">
      <div>My Projects</div>
      <div className=" ms-auto">
        <AddProjects />
      </div>
      {addProjectResponse.title ? 
        <Alert className=" bg-success" dismissible>
          {addProjectResponse.title} <span className="fw-bolder">added successfully</span>
        </Alert>
       : null}



      <div className=" mt-4">
        {/* collection of user projects */}

        {userProjects?.length > 0 ? (
          userProjects.map((project) => (
            <div className=" border d-flex align-items-center rounded p-2">
              <h5>{project.title}</h5>
              <div className=" icon ms-auto">
                <EditProject project={project}/>
               <a href={project.github} target="blank" className=" btn">
                  <i class="fa-brands fa-github"></i>{" "}
                </a>
                <button className=" btn"
                onClick={()=>handleDelete(project._id)}>
                  <i class="fa-solid fa-trash"></i>{" "}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className=" text-danger fs-5 fw-bolder">
            No Projects Uploaded Yet!!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProjects;

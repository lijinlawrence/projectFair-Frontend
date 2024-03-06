import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../services/baseUrl";
import { editProjectAPI } from "../services/allAPI";
import { editProjectResponseContext } from "../Context/ContextShare";

const EditProject = ({ project }) => {
const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
const handleUpdate = async ()=>{
  const{ id,title,language,overview,github,website,projectImage} = projectDetails
  if (
    !title ||
    !language ||
    !overview ||
    !github ||
    !website 
  ) {
    alert("please fill empty fields");
  }else {
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("language", language);
    reqBody.append("overview", overview);
    reqBody.append("github", github);
    reqBody.append("website", website);
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    const token = sessionStorage.getItem("token")
    if(preview){
      const reqHeader={
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
      }
      // api call
      const result = await editProjectAPI(id,reqBody,reqHeader)
        if (result.status === 200) {
          handleClose()
          // pass response to my project
          setEditProjectResponse(result.data)
        }else{
          console.log(result);
          console.log(result.response.data);
        }
      
    }else{
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`, 
      }
      // api call
      const result = await editProjectAPI(id,reqBody,reqHeader)
        if (result.status === 200) {
          handleClose()
          // pass response to my project
          setEditProjectResponse(result.data)

        }else{
          console.log(result);
          console.log(result.response.data);
        }
      


    }
}
}




  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    overview: project.overview,
    github: project.github,
    website: project.website,
    projectImage: "",
  });

  const [preview, setPreview] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImage: "",
    })
    setPreview("")
  }


  const handleShow = () => setShow(true);
  // console.log(project);
  // console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  return (
    <>
      <button onClick={handleShow} className=" btn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" row">
            <div className=" col-6">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  width={"300px"}
                  height={"250px"}
                  src={
                    preview
                      ? preview
                      : `${BASE_URL}/uploads/${project.projectImage}`
                  }
                  alt="imgplace"
                />
              </label>
            </div>

            <div className=" col-6">
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Project Title"
                  value={projectDetails.title}
                  onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Languages Used"
                  value={projectDetails.language}
                  onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})}
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Github Link"
                  value={projectDetails.github}
                  onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Website Link"
                  value={projectDetails.website}
                  onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project overview "
                  value={projectDetails.overview}
                  onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProject;

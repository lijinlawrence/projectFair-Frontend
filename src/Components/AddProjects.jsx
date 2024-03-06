import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectAPI } from "../services/allAPI";
import { AddProjectResponseContext } from "../Context/ContextShare";

const AddProjects = () => {
  const {addProjectResponse, setAddProjectResponse} = useContext(AddProjectResponseContext);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    overview: "",
    github: "",
    website: "",
    projectImage: "",
  });

  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");

  console.log(projectDetails);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title: "",
      language: "",
      overview: "",
      github: "",
      website: "",
      projectImage: "",
    });
    setPreview("");
  };

  const handleShow = () => setShow(true);

  // for converting  image

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, language, overview, github, website, projectImage } =  projectDetails;
    
    if (
      !title ||
      !language ||
      !overview ||
      !github ||
      !website ||
      !projectImage
    ) {
      alert("please fill empty fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectImage",projectImage);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, 
        };
        const result = await addProjectAPI(reqBody,reqHeader);

        if (result.status === 200) {
          console.log(result.data);
          handleClose();
          setAddProjectResponse(result.data)
        } else {
          console.log(result);
          console.log(result.response.data);
        }
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
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
                      : "https://www.freeiconspng.com/uploads/edit-profile-icon---coquette-part-2-set-modify-change-user-info-8.png"
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
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Languages Used"
                  value={projectDetails.language}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      language: e.target.value,
                    })
                  }
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Github Link"
                  value={projectDetails.github}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      github: e.target.value,
                    })
                  }
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Website Link"
                  value={projectDetails.website}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      website: e.target.value,
                    })
                  }
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project overview "
                  value={projectDetails.overview}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overview: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProjects;

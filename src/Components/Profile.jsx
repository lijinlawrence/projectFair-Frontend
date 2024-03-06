import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card shadow p-5 mt-2 me-2">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button onClick={() => setOpen(!open)} className=" btn btn-outline-info">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>
       <Collapse in={open}>
       <div className=" row justify-content-center mt-3">
          <label>
            <input type="file" style={{ display: "none" }} />
            <img
              width={"200px"}
              height={"200px"}
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/msn-people-person-profile-user-icon--icon-search-engine-16.png"
              alt="propic"
              className="rounded-circle img-fluid"
            />
          </label>

          <div className=" m-3">
            <input
              type="text"
              className=" form-control"
              placeholder=" Github Link"
            />
            <input
              type="text"
              className=" form-control"
              placeholder=" LinkedIn"
            />
          </div>
          <div className=" mt-3  d-grid  ">
            <button  className=" btn btn-warning">
              Update
            </button>
          </div>
        </div>
       </Collapse>
      </div>
    </>
  );
};

export default Profile;

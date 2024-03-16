import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    github: "",
    linkedIn: "",
    profileImage: "",
  });
  const [token, setToken] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleUpdate = () => {
    console.log(profileDetails);
  };

  // get token
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  console.log(token);

  // convert imge to url

  useEffect(() => {
    if (profileDetails.profileImage) {
      setProfileImage(URL.createObjectURL(profileDetails.profileImage));
    }
  }, [profileDetails.profileImage]);
  console.log(profileImage);

  return (
    <>
      <div className="card shadow p-5 mt-2 me-2">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button
            onClick={() => setOpen(!open)}
            className=" btn btn-outline-info"
          >
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>
        <Collapse in={open}>
          <div className=" row justify-content-center mt-3">
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    profileImage: e.target.files[0],
                  })
                }
              />
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
                value={profileDetails.github}
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    github: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className=" form-control"
                placeholder=" LinkedIn"
                value={profileDetails.linkedIn}
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    linkedIn: e.target.value,
                  })
                }
              />
            </div>
            <div className=" mt-3  d-grid  ">
              <button className=" btn btn-warning" onClick={handleUpdate}>
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

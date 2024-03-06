import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI.js";
import { tokenAuthorizationContext } from "../Context/TokenAuth.jsx";

const Auth = ({ register }) => {
  const isRegisterForm = register ? true : false;
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("please fill the missing field");
    } else {
      const result = await registerAPI(userData);
      console.log(result);
      if (result.status === 200) {
        console.log(result);
        alert(`${result.data.username} has successfully registered`);
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        alert(result.response.data);
        console.log(result);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("please fill the missing field");
    } else {
      const result = await loginAPI(userData);
      console.log(result);
      if (result.status === 200) {
        console.log(result);
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
       setIsAuthorized(true)
        setUserData({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        alert(result.response.data);
        console.log(result);
      }
    }
  };

  return (
    <>
      <div
        style={{ width: "100%", height: "100vh" }}
        className=" d-flex justify-content-center align-items-center"
      >
        <div className="container w-75">
          <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
            Back to Home
          </Link>
          <div className="card shadow p-3 bg-info">
            <div className=" row align-items-center">
              <div className=" col-lg-6">
                <img
                  src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706832000&semt=ais"
                  alt=""
                  className=" rounded-start w-100 "
                />
              </div>
              <div className=" col-lg-6">
                <div className=" d-flex align-items-center flex-column">
                  <h2 className=" fw-bolder  text-light mt-2">
                    <i className=" fa-brands fa-stack-overflow fa-bounce"></i>{" "}
                    Project Fair
                  </h2>
                  <h5 className=" fw-bolder text-light pb-3 mt-5">
                    {isRegisterForm
                      ? "sign up to your Account"
                      : "Sign in your Account"}
                  </h5>
                  <Form className=" text-light w-100">
                    {isRegisterForm && (
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          value={userData.username}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Password"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      ></Form.Control>
                    </Form.Group>
                  </Form>

                  {isRegisterForm ? (
                    <div className="text-center">
                      <button
                        className=" btn btn-light mb-2"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                      <p>
                        Already have an Account? Here to{" "}
                        <Link
                          to={"/login"}
                          style={{ textDecoration: "none", color: "blue" }}
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className=" text-center">
                      <button
                        className=" btn btn-light mb-2"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                      <p>
                        New User? Click Here to{" "}
                        <Link
                          to={"/Register"}
                          style={{ textDecoration: "none", color: "red" }}
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

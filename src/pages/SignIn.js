import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/action/authActions";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("demo.demo@email.com");
  const [password, setPassword] = useState("123456789");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (storedCredentials) {
      setEmail(storedCredentials.email);
      setPassword(storedCredentials.password);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError(""); // Clear the error message
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      dispatch(signIn(email, password));
      localStorage.setItem("isAuthenticated", "true");
      nav("/dashboard-v1");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card  text-black">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">SignIn</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your Email and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value) {
                          setEmailError("");
                        }
                      }}
                    />
                    <div className="text-danger">{emailError}</div>
                    <label className="form-label" htmlFor="typeEmailX"></label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value) {
                          setPasswordError("");
                        }
                      }}
                    />
                    <div className="text-danger">{passwordError}</div>
                  </div>
                  <label className="form-label" htmlFor="typePasswordX"></label>

                  <p className="small mb-3 pb-lg-2">
                    <a className="text-white-100" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-dark btn-lg px-5"
                    type="submit"
                    onClick={handleSignIn}
                  >
                    SignIn
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="text-black-50 fw-bold">
                      Register here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

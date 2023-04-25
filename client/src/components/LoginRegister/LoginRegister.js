import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "./Schema";

import "./LoginRegister.css";
import "../../components/GlobalCss.css";

const LoginRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const res = await axios.get(
          "https://workflow-server.onrender.com/login",
          {
            withCredentials: true,
          }
        );
        if (res.data.noToken || res.data.tokenInvalid) {
          console.log(res.data.message);
        } else {
          navigate("/projects");
        }
      } catch {
        console.log("Some error occurred!");
      }
    };
    isAuthenticated();
  }, [navigate]);

  const [displaySignUpForm, setDisplaySignUpForm] = useState(false);
  const [error, setError] = useState({
    wrongCombination: false,
    accountDoesNotExist: false,
    emailAlreadyInUse: false,
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignUp = async (data) => {
    reset({
      password: "",
      confirmPassword: "",
    });
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/register",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.emailAlreadyInUse) {
        setError({ ...error, emailAlreadyInUse: true });
      } else if (res.data.registrationSuccessful) {
        console.log(res.data.message);
        navigate("/projects");
      } else {
        console.log(res.data.message);
      }
    } catch {
      console.log("Caught at register!");
    }
  };

  const onSignIn = async () => {
    setCredentials({ ...credentials, password: "" });
    try {
      const res = await axios.post(
        "https://workflow-server.onrender.com/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.accountDoesNotExist) {
        setError({ ...error, accountDoesNotExist: true });
        console.log(res.data.message);
      } else if (res.data.wrongCombination) {
        setError({ ...error, wrongCombination: true });
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
        navigate("/projects");
      }
    } catch {
      console.log("Caught at login!");
    }
  };

  return (
    <React.Fragment>
      <div className="login-register">
        {!displaySignUpForm && (
          <div>
            <div>Sign in</div>
            <form className="form">
              <input
                placeholder="email"
                type="email"
                value={credentials.email}
                onChange={(e) => {
                  setError({
                    ...error,
                    wrongCombination: false,
                    accountDoesNotExist: false,
                  });
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              ></input>
              <input
                placeholder="password"
                type="password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              ></input>
              {error.wrongCombination && (
                <span className="error">Wrong email/password combination!</span>
              )}
              {error.accountDoesNotExist && (
                <span className="error">Account does not exist!</span>
              )}
              <button
                className="login hover submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSignIn();
                }}
              >
                Sign in
              </button>
              <span className="hover">Forgot your password?</span>
              <button
                className="hover submit"
                onClick={() => {
                  setDisplaySignUpForm(true);
                }}
              >
                Create new account
              </button>
            </form>
          </div>
        )}
        {displaySignUpForm && (
          <div>
            <div>Sign up</div>
            <form className="form">
              <div>
                <input
                  placeholder="firstname"
                  {...register("firstName")}
                ></input>
                <div className="error">{errors.firstName?.message}</div>
                <input placeholder="lastname" {...register("lastName")}></input>
                <div className="error">{errors.lastName?.message}</div>
              </div>
              <input
                placeholder="email"
                type="email"
                {...register("email")}
                onChange={(e) => {
                  setError({ ...error, emailAlreadyInUse: false });
                }}
              ></input>
              <span className="error">{errors.email?.message}</span>
              <input
                placeholder="password"
                type="password"
                {...register("password")}
              ></input>
              <span className="error">{errors.password?.message}</span>
              <input
                placeholder="confirm password"
                type="password"
                {...register("confirmPassword")}
              ></input>
              <span className="error">{errors.confirmPassword?.message}</span>
              {error.emailAlreadyInUse && (
                <span className="error">Email already in use!</span>
              )}
              <button
                className="login hover submit"
                onClick={handleSubmit(onSignUp)}
              >
                Sign up
              </button>
              <span>
                Already a user?
                <span
                  className="hover"
                  onClick={() => {
                    setDisplaySignUpForm(false);
                  }}
                >
                  Login
                </span>
              </span>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginRegister;

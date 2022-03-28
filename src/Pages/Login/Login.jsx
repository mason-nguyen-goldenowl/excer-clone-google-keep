import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { loginAction } from "../../redux/action/userAction";

import logo from "../../asset/menuTopIcon/pngwing.com.png";

import "./Login.scss";
import { logging, selectUsers } from "../../redux/features/userSlice";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const { isDisableLogginBTN } = useSelector(selectUsers);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const action = loginAction;
    dispatch(logging({ isDisableLogginBTN: true }));

    dispatch(action(data));
    if (isLogged && refreshToken) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isLogged && refreshToken) {
      return navigate("/");
    }
  }, [isLogged, navigate, refreshToken]);
  return (
    <div className="login-wrap">
      <div className="login">
        <div className="login__header">
          <img src={logo} width="50" alt="" />
          <h2>Log In</h2>
          <p>Use your Google Account</p>
        </div>
        <div className="login__body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                disabled={isDisableLogginBTN}
                className="form-input"
                type="text"
                placeholder="Your email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              />

              {errors.email?.type === "required" && (
                <p className="error-message">Choose your email address</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="error-message">Invalid email address</p>
              )}
            </div>
            <div className="form-group">
              <input
                disabled={isDisableLogginBTN}
                className="form-input"
                type="password"
                placeholder="Your password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="error-message">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="error-message">Password is minimum 8 character</p>
              )}
            </div>

            <p
              onClick={() => {
                navigate("/reset");
              }}
              className="forgot"
            >
              Forgot your password?
            </p>

            <p className="login-policy">
              This is not your computer? Use Guest mode to log in privately
            </p>

            <div className="submit-group">
              <span
                className="btn-nonbg"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create Account
              </span>

              <Button
                isLoading={isDisableLogginBTN}
                type="submit"
                className="btn-bg"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

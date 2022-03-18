import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { signUp } from "../../redux/action/UserAction";
import logo from "../../asset/menuTopIcon/pngwing.com.png";

import { ReactComponent as Account } from "../../asset/formIcon/Account.svg";

import "./Signup.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.user.signUpSuccess);
  const isLogged = Cookies.get("isLogged");
  const [isDisable, setIsDisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.comfirm) {
      const action = signUp;
      setIsDisable(true);
      await dispatch(action(data));
    } else {
      alert("Password and Comfirm password is not match");
    }
  };

  if (isDisable) {
    setTimeout(() => {
      setIsDisable(false);
    }, 4000);
  }
  console.log(isSuccess);
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
    if (isSuccess) {
      navigate("/login");
    }
  });

  return (
    <div className="signup-wrap">
      <div className="signup">
        <div className="signup__header">
          <img src={logo} width="50" alt="" />
          <div className="signup__header-content">
            <h2>Create a GoogleAccount</h2>
          </div>
          <div className="signup__body">
            <div className="signup__body-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    disabled={isDisable}
                    className="form-input"
                    type="text"
                    placeholder="Full name"
                    {...register("full_name", {
                      required: true,
                    })}
                  />
                  {errors.full_name?.type === "required" && (
                    <p className="error-message">Fullname is required</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    disabled={isDisable}
                    className="form-input"
                    type="emai;"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="error-message">Choose your email address</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="error-message">Please check your email</p>
                  )}
                  <p
                    className="email-decr"
                    s
                    onClick={() => {
                      navigate("/login");
                    }}
                    tyle={{ marginTop: "10px" }}
                  >
                    You can use letters, number and periods
                  </p>
                </div>
                <div className="form-group ">
                  <div className="password">
                    <div>
                      <input
                        disabled={isDisable}
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="error-message">Password is required</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="error-message">
                          Password is minimum 8 character
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        disabled={isDisable}
                        className="form-input"
                        type="password"
                        placeholder="Comfirm"
                        {...register("comfirm", {
                          required: true,
                          minLength: 8,
                        })}
                      />
                      {errors.comfirm?.type === "required" && (
                        <p className="error-message">
                          Comfirm password is required
                        </p>
                      )}
                      {errors.comfirm?.type === "minLength" && (
                        <p className="error-message">
                          Password is minimum 8 character
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="pass-decr" style={{ marginTop: "10px" }}>
                    Use 8 or more characters and combinations of letters,
                    numbers, and symbols
                  </p>
                </div>
                <div className="form-group__submit">
                  <span
                    className="btn-nonbg"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </span>
                  <Button
                    isLoading={isDisable}
                    type="submit"
                    className="btn-bg"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            <div className="signup__body-asset">
              <Account className="singup__body-asset-img" />
              <p className="account-decr">
                An account. Works across all Google products and services.
              </p>
            </div>
          </div>
          <div className="signup_footer"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

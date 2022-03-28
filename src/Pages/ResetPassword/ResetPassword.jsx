import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  requestResetPassword,
  resetPassword,
} from "../../redux/action/userAction";
import { selectUsers } from "../../redux/features/userSlice";

import "./ResetPassword.scss";

const Resetpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRequest } = useSelector(selectUsers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRequestResetPassword = (data) => {
    const action = requestResetPassword;
    dispatch(action(data));
  };

  const onSubmit = async (data) => {
    const action = resetPassword;
    await dispatch(action(data));
  };

  return (
    <div className="resetpassword-wrap">
      <div className="resetpassword">
        <div className="resetpassword__header">
          <h2>Forgot your password??</h2>
          <p>Never mind we will heplp you to have a new password</p>
        </div>
        <div className="resetpassword__body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="request-input-group">
              <div className="form-group">
                <input
                  className="form-input"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  type="text"
                  placeholder="Your Email"
                />
                {errors.email?.type === "required" && (
                  <p className="error-message">Choose your email address</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="error-message">Please check your email</p>
                )}
              </div>
              {isRequest ? (
                <div>
                  <div className="form-group">
                    <input
                      {...register("new_password", {
                        required: true,
                        minLength: 8,
                      })}
                      type="password"
                      className="form-input"
                      placeholder="Enter your new password"
                    />
                    {errors.new_password?.type === "required" && (
                      <p className="error-message">Password is required</p>
                    )}
                    {errors.new_password?.type === "minLength" && (
                      <p className="error-message">
                        Password is minimum 8 character
                      </p>
                    )}
                  </div>
                  <div className="form-group ">
                    <input
                      {...register("reset_code", {
                        required: true,
                        minLength: 8,
                        maxLength: 8,
                      })}
                      className="form-input"
                      type="text"
                      placeholder="Enter your secret code"
                    />
                    {errors.reset_code?.type === "required" && (
                      <p className="error-message">Secret Code is required</p>
                    )}
                    {errors.reset_code?.type === "minLength" && (
                      <p className="error-message">
                        Secret code must have 8 character
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="submit-group">
              {isRequest ? (
                <div className="reset-btn__group">
                  <button
                    className="
          btn-bg reset-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="request-btn__group">
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="btn-nonbg"
                  >
                    Login
                  </span>

                  <span
                    onClick={handleSubmit(handleRequestResetPassword)}
                    className="btn-bg request-btn"
                  >
                    Request
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;

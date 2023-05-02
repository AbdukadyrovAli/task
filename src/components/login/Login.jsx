import React, { useState } from "react";
import Input from "../UI/input/Input";
import classes from "./Login.module.css";
import Button from "../UI/button/Button";

export const Login = ({ loginHandler }) => {
  const [entredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [entredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInput = (e) => {
    setEnteredEmail(e.target.value);

    setFormIsValid(
      e.target.value.includes("@") && entredPassword.trim().length >= 6
    );
  };

  const passwordInput = (e) => {
    setEnteredPassword(e.target.value);

    setFormIsValid(
      e.target.value.trim().length >= 6 && entredEmail.includes("@")
    );
  };
  const vlaidatePassword = () => {
    setEmailIsValid(entredEmail.includes("@"));
  };

  const validateEmail = () => {
    setPasswordIsValid(entredPassword.trim().length >= 6);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginHandler(entredEmail.entredPassword);
  };

  return (
    <>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="emailInput"> Login</label>
          <Input
            type="email"
            id="emailInput"
            value={entredEmail}
            onChange={emailInput}
            onBlur={validateEmail}
          />
        </div>

        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="passwordInput"> Password</label>
          <Input
            style={{ borderColor: "red", background: "red" }}
            type="password"
            id="passwordInput"
            value={entredPassword}
            onChange={passwordInput}
            onBlur={vlaidatePassword}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              onClick={loginHandler}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

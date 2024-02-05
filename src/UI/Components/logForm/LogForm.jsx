import axios from "axios";
import React, { useState } from "react";
import { BE_URL } from "../../../configue";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/features/LogAuth";

export default function LogForm({ setModalFlag, toggle }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  let dispatch = useDispatch();
  function loginSubmit() {
    axios({
      method: "post",
      url: `${BE_URL}/user/signin`,
      data: loginData,
    })
      .then((res) => {
        dispatch(login(res?.data));
        toggle();
        localStorage.setItem("login", "true");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="form-feild">
        <label>Email</label>
        <input
          id="exampleEmail"
          type="email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e?.target?.value })
          }
        />
      </div>
      <div className="form-feild">
        <label>Password</label>
        <input
          id="examplePassword"
          placeholder="Enter your password"
          type="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>
      <div className="log-foot">
        <button className="btn-theme" onClick={() => loginSubmit()}>
          Login
        </button>
        <p>
          Create a new{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setModalFlag(true)}
          >
            account
          </span>
        </p>
      </div>
    </>
  );
}

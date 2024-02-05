import axios from "axios";
import React, { useState } from "react";
import { BE_URL } from "../../../configue";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/LogAuth";

export default function RegForm({ setModalFlag, toggle }) {
  let [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let dispatch = useDispatch();

  function signUp() {
    axios({
      method: "post",
      url: `${BE_URL}/user/signUp`,
      data: regData,
    })
      .then((res) => {
        toggle();
        dispatch(login(res?.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <div className="form-feild">
        <label>Full Name</label>
        <input
          placeholder="Enter your full name"
          type="text"
          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
        />
      </div>
      <div className="form-feild">
        <label>Your Email</label>
        <input
          placeholder="Enter your email"
          type="email"
          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
        />
      </div>
      <div className="form-feild">
        <label>Your Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setRegData({ ...regData, password: e.target.value })}
        />
      </div>
      <div className="form-feild">
        <label>Confirm Password</label>
        <input
          placeholder="Enter confirm password"
          type="password"
          onChange={(e) =>
            setRegData({ ...regData, confirmPassword: e.target.value })
          }
        />
      </div>
      <div className="log-foot">
        <button className="btn-theme" onClick={() => signUp()}>
          Sign In
        </button>
        <p>
          Already have an{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setModalFlag(false)}
          >
            account
          </span>
        </p>
      </div>
    </>
  );
}

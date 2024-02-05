import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RouterAuth({ Component }) {
  let loginFlag = JSON.parse(localStorage.getItem("login"));

  let navigate = useNavigate();

  useEffect(() => {
    if (!loginFlag) {
      navigate("/*");
    }
  }, []);

  return <Component />;
}

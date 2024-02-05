import React, { useState } from "react";
import logo from "../../../public/Img/logo.jpg";
import { NavLink } from "react-router-dom";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import RegForm from "./regForm/RegForm";
import LogForm from "./logForm/LogForm";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/LogAuth";
import { ShoppingCart } from "@mui/icons-material";
import CartData from "../pages/CartData";

export default function Header() {
  let [modalFlag, setModalFlag] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [canvasOpen, setCanvasOpen] = useState(false);

  const canvasClose = () => setCanvasOpen(false);
  const canvasShow = () => setCanvasOpen(true);

  function loginModal() {
    setShow(true);
    setModalFlag(false);
  }

  function toggle() {
    setShow(!show);
  }

  let { user, token } = useSelector((state) => state.LoginSlice);

  let dispatch = useDispatch();

  return (
    <>
      <header>
        <div className="head-logo">
          <img src={logo} />
        </div>
        <div className="head-links">
          {user.userType == "admin" ? (
            <>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
              <NavLink to={"/orders"}>Orders</NavLink>
              <NavLink to={"/admin-products"}>Products</NavLink>
              <NavLink to={"/users"}>Users</NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/products"}>Products</NavLink>
              <NavLink to={"/about-us"}>About Us</NavLink>
              <NavLink to={"/contact-us"}>Contact US</NavLink>
              <ShoppingCart role="button" onClick={canvasShow} />
            </>
          )}

          {token ? (
            <button className="btn-theme" onClick={() => dispatch(logOut())}>
              Logout
            </button>
          ) : (
            <button className="btn-theme" onClick={() => loginModal()}>
              Login
            </button>
          )}
        </div>
      </header>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{modalFlag ? "Register" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalFlag ? (
            <RegForm setModalFlag={setModalFlag} toggle={toggle} />
          ) : (
            <LogForm setModalFlag={setModalFlag} toggle={toggle} />
          )}
        </Modal.Body>
      </Modal>

      <Offcanvas show={canvasOpen} onHide={canvasClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartData />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

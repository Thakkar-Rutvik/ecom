import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../UI/pages/Home";
import Products from "../UI/pages/Products";
import About from "../UI/pages/About";
import Contact from "../UI/pages/Contact";
import Header from "../UI/Components/Header";
import AdminProfile from "../UI/pages/admin/AdminProfile";
import Dashboard from "../UI/pages/admin/Dashboard";
import Orders from "../UI/pages/admin/Orders";
import AdminProducts from "../UI/pages/admin/AdminProducts";
import Users from "../UI/pages/admin/Users";
import Error404 from "../UI/pages/Error404";
import RouterAuth from "./RouterAuth";

export default function Router() {
  let userType = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Header />
      <Routes>
        {userType?.userType == "admin" ? (
          <>
            <Route
              path="/admin-profile"
              element={<RouterAuth Component={AdminProfile} />}
            />
            <Route
              path="/dashboard"
              element={<RouterAuth Component={Dashboard} />}
            />
            <Route
              path="/admin-products"
              element={<RouterAuth Component={AdminProducts} />}
            />
            <Route path="/orders" element={<RouterAuth Component={Orders} />} />
            <Route path="/users" element={<RouterAuth Component={Users} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
          </>
        )}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

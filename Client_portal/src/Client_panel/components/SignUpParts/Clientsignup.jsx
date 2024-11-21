import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { registerUser } from "../../../Firebase/ClientFbSignup";
import { ColorRing } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setuser, setadmin } from "../../../redux/AuthSlice";
const Clientsignup = ({ change }) => {
  const FormFields = {
    displayName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const [fields, setfields] = useState(FormFields);
  const [err, seterr] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayName, email, password, phone } = fields;
  const handleChange = (e) => {
    setfields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const test = () => {
    console.log("hello");
  };
  const addphone = async (id) => {
    await setDoc(doc(db, "ClientPhone", id), {
      phone: phone,
    });
  };
  const createrole = async (id) => {
    await setDoc(doc(db, "Roles", id), {
      isAdmin: false,
      isDeveloper:false,
    });
  };
  const handlesignup = async (e) => {
    e.preventDefault();
    change();
    if (
      displayName.length !== 0 &&
      email.length !== 0 &&
      phone.length !== 0 &&
      password.length >= 6
    ) {
      setloading(true);
      registerUser(displayName, email, password, phone).then((c) => {
        addphone(c.user.uid);
        createrole(c.user.uid);
        setloading(false);
        dispatch(setuser({ uid: c.user.uid, name: displayName }));

        navigate("/details");
      });
    } else {
      seterr(true);
    }
  };
  return (
    <motion.div
      initial={{ x: "50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" z-20 flex flex-col items-center mt-16 bg-white h-max py-4  px-8"
    >
      <h1 className=" text-3xl w-max font-semibold text-slate-600 mb-8 ">
        Client Signup
      </h1>
      <form
        className=" flex flex-col items-center justify-center  "
        onSubmit={test}
        action=""
      >
        <div className=" flex flex-col">
          <p className=" text-xs font-medium text-slate-600 mt-2">Your name</p>
          <input
            required
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            id="displayName"
            type="text"
            placeholder="Name"
          />
          {err && fields.displayName.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <p className=" text-xs font-medium text-slate-600 mt-2">Your email</p>
          <input
            required
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            id="email"
            type="text"
            placeholder="Email"
          />
          {err && fields.email.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <p className="text-xs font-medium text-slate-600 mt-2">Your phone</p>
          <input
            required
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            id="phone"
            type="text"
            placeholder="Phone"
          />
          {err && fields.phone.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <p className="text-xs font-medium text-slate-600 mt-2">
            Enter your password
          </p>
          <input
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            required
            id="password"
            type="text"
            placeholder="Password"
          />
          {err && fields.password.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <p className=" text-xs font-medium text-slate-600 mt-2">
            Confirm password
          </p>
          <input
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            required
            id="confirmPassword"
            type="text"
            placeholder="Password"
          />
          {err && fields.confirmPassword.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
        </div>

        <button
          onClick={handlesignup}
          className=" bg-blue-600 text-white px-6 py-2 text-normal rounded-full font-medium mt-4 "
          type="submit"
        >
          SignUp
        </button>
        {loading && (
          <div className=" aflex justify-center items-center">
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#1646f5", "#1646f5", "#1646f5", "#1646f5", "#1646f5"]}
            />
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default Clientsignup;

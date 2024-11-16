import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";

const Signup1 = ({ handlechange, err, fields }) => {
  return (
    <>
      <div className="w-full px-8 py-4 h-[300px] flex justify-center  flex-col ">
        <form
          action=" "
          className=" w-full h-full flex  justify-center flex-col "
        >
          <label
            className=" text-signup_txt text-base font-bold mt-4 "
            htmlFor=""
          >
            {" "}
            Email
          </label>
          <input
            placeholder="Enter your email"
            className=" w-full py-2 px-4 mt-2"
            type="text"
            id="email"
            onChange={handlechange}
          />
          {err && fields.email.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <label className=" text-signup_txt text-base font-bold " htmlFor="">
            {" "}
            Password
          </label>
          <input
            id="password"
            placeholder="Enter your name"
            className=" w-full py-2 px-4 mt-2"
            type="password"
            onChange={handlechange}
          />

          {err && fields.phone.length === 0 && (
            <p className=" italic text-sm text-red-600">Password is required</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup1;

import React from "react";

const Signup2 = ({ handlechange, err, fields }) => {
  return (
    <div className="w-full px-8 py-4 h-[300px] flex justify-center  flex-col ">
      <form
        action=" "
        className=" w-full h-full flex  justify-center flex-col "
      >
        <label className=" text-signup_txt text-base font-bold " htmlFor="">
          {" "}
          New password
        </label>
        <input
          onChange={handlechange}
          id="password"
          placeholder="Enter password"
          className=" w-full py-2 px-4 mt-2"
          type="password"
        />
        {err && fields.password.length < 6 && (
          <p className=" italic text-sm text-red-600">
            Password must be atleast 6 characters
          </p>
        )}
        <label
          className=" text-signup_txt text-base font-bold mt-4 "
          htmlFor=""
        >
          {" "}
          Confirm password
        </label>
        <input
          onChange={handlechange}
          id="confirmPassword"
          placeholder="Enter password"
          className=" w-full py-2 px-4 mt-2"
          type="password"
        />
      </form>
    </div>
  );
};

export default Signup2;

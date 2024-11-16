import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setprojectname, setprojectoverview } from "../../../redux/clientSlice";
import "./final.css";
import { useNavigate } from "react-router-dom";
const Final = () => {
  const { apps, projectname, projectoverview, SrDev, JrDev, UiUx, slide } =
    useSelector((state) => state.details);
    const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        navigate("/projects");
      }, 4000);
    })
  return (
    <motion.div
      initial={{ x: slide ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="contentMain"
    >
      <div className="final flex flex-col justify-center items-center w-full h-full text-center ">
        <h4 className=" w-[500px] font-bold text-slate-700 text-justify text-xl">
          Thank you for providing the project details and requirements.We
          appreciate and have received your input and will get back to you
          shortly.<br />
          Directing you to dashboard...
        </h4>
        <p></p>
      </div>
    </motion.div>
  );
};

export default Final;

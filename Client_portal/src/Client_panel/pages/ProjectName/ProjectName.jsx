import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setprojectname, setprojectoverview } from "../../../redux/clientSlice";
import "./projectname.css";
const x = ["web dev", "user app", "ecom web", "Webdev"];
const ProjectName = () => {
  const dispatch = useDispatch();
  const { projectoverview, projectname, err, slide } = useSelector(
    (state) => state.details
  );

  const handlechange = (e) => {
    if (e.target.id === "projectname") {
      dispatch(setprojectname(e.target.value));
    } else {
      dispatch(setprojectoverview(e.target.value));
    }
  };
  return (
    <motion.div
      initial={{ x: slide ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="contentMain"
    >
      <div className="">
        <p className=" stepCount text-slate-400 text-xs font-medium">
          Step 1/4
        </p>
        <h2 className="mainTitle font-bold text-3xl text-slate-700">
          Tell Us About Your Project
        </h2>
        <div className=" mt-4">
          <p className=" text-slate-700 font-semibold text-lg">Project Name</p>
          <input
            id="projectname"
            onChange={handlechange}
            className="inp min-w-72 w-4/5  sm:w-96 outline-none py-2 px-4 rounded-md"
            placeholder="Enter your project name"
            type="text"
            value={projectname}
          />
          {projectname.length === 0 && err && (
            <p className=" text-red-500 italic text-sm">
              Project name is required
            </p>
          )}
          <p className=" text-slate-700 font-semibold text-lg mt-6">
            Project Overview
          </p>
          <textarea
            id="projectoverview"
            onChange={handlechange}
            className="inp min-w-72 w-4/5  sm:w-96 outline-none py-2 px-4 rounded-md h-36"
            placeholder="Tell us about your project"
            type="text"
            value={projectoverview}
          />
          {projectoverview.length === 0 && err && (
            <p className=" text-red-500 italic text-sm">
              Project overview is required
            </p>
          )}
          {projectoverview.length < 100 &&
            err &&
            projectoverview.length !== 0 && (
              <p className=" text-red-500 italic text-sm">
                Project overview must be atleast 100 characters
              </p>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectName;

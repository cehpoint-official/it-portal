import React, { useState } from "react";
import { motion } from "framer-motion";
import "./additionals.css";
import { useSelector } from "react-redux";
const Additionals = ({ value }) => {
  const { apps, SrDev, JrDev, UiUx } = useSelector((state) => state.details);
  const suggestions = [
    "  We noticed that one of your development area is related to web,so we would also suggest you to take UI/UX designer.Integrating a UI/UX designer into your project can significantly enhance user satisfaction and overall success.",
    `  We recommend you to take additionally ${
      SrDev === 0 && "1 Senior Developer"
    } ${
      JrDev === 0 && ", 1 Junior Developer"
    } and it will help us to deliver you the reliable and quantlity service faster`,
    `  We recommend you to take additionally ${
      JrDev === 0 && "1 Junior Developer"
    }  and it will help us to deliver you the reliable and quantlity service faster`,
  ];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" suggestions"
    >
      <div className="  py-4 px-8 ">
        <h4 className=" text-xl  text-slate-800 text-justify ">
          {" "}
          Dear Client, we have received your development preference and team
          preference.
        </h4>
        <h4 className="sug text-slate-700 text-justify mt-8 underline">
          Our suggestion and Advice
        </h4>
        <h4 className="s3 text-xl  text-slate-900 text-justify mt-2 flex gap-1">
          You mentioned {apps.length} development areas for your project
          <p>
            {" "}
            {apps.map((c) => (
              <span> {c}</span>
            ))}{" "}
          </p>
        </h4>
        <h4 className="s4 text-xl text-slate-900 text-justify mt-2">
          {suggestions[value - 1]}
        </h4>
        <h4 className="s5 text-xl  text-slate-700 text-justify mt-8">
          If you want to add you can go back using the back button and change
          your team else you can proceed to the next step by clicking on next.
        </h4>
      </div>
    </motion.div>
  );
};

export default Additionals;

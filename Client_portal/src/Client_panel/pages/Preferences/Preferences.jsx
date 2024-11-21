import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addApps,
  increaseSrDev,
  DecreaseSrDEv,
  increaseJrDev,
  DecreaseJrDEv,
  removeapps,
  setSrDev,
  increaseUiUx,
  DecreaseUiUx,
} from "../../../redux/clientSlice";
import ClearIcon from "@mui/icons-material/Clear";
import TagsInput from "../../components/Taginput/TagsInput";
import { count } from "firebase/firestore";
import InfoIcon from "@mui/icons-material/Info";
import "./preferences.css";
const Preferences = () => {
  const [count, setcount] = useState(0);

  const { apps, SrDev, JrDev, UiUx, err, slide } = useSelector(
    (state) => state.details
  );
  const [check, setcheck] = useState(0);
  const dispatch = useDispatch();
  const [uitoggle, setuitoggle] = useState(0);
  const handleui = (value) => {
    setuitoggle(value);
  };
  const handleleave = () => {
    setuitoggle(0);
  };

  const remove = (name) => {
    dispatch(removeapps(name));
  };

  const decreaseJr = () => {
    JrDev > 0 && dispatch(DecreaseJrDEv());
  };
  const decreaseSr = () => {
    SrDev > 0 && dispatch(DecreaseSrDEv());
  };
  const increaseSr = () => {
    dispatch(increaseSrDev());
  };
  const increaseJr = () => {
    dispatch(increaseJrDev());
  };
  const decUiUx = () => {
    UiUx > 0 && dispatch(DecreaseUiUx());
  };
  const incUiUx = () => {
    dispatch(increaseUiUx());
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
          Step 2/4
        </p>
        <h2 className=" w-full text-wrap mainTitle font-semibold text-3xl text-slate-700 m-0">
          Development Preferences and Team Size Selection
        </h2>
        <div className=" mt-4">
          <p className=" text-slate-700 font-semibold text-lg">
            Development Areas
          </p>

          <div className=" flex flex-col mt-2 flex-wrap">
            <TagsInput />
            {!apps[0] && err && (
              <p className="err text-red-600 italic text-sm font-light">
                Add atleast one development area
              </p>
            )}
          </div>

          <p className=" text-slate-700 font-semibold text-lg mt-6">
            Number of developers required
          </p>
          <div className=" mt-4 ">
            <div className=" devInput flex items-center w-[450px] justify-between">
              <div className=" w-1/2 flex justify-between items-center">
                <div className="  ">
                  <h4 className=" text-black">Senior Developer</h4>

                  <p className="cost italic text-slate-400">(Rs 70000-80000)</p>
                </div>
                <div className=" relative">
                  <div
                    onMouseEnter={() => handleui(1)}
                    onMouseLeave={() => handleleave()}
                    className="ui_i text-slate-600 ml-3 hover:cursor-pointer  "
                  >
                    <InfoIcon sx={{ fontSize: "20px" }} color="white" />
                  </div>
                  {uitoggle === 1 && (
                    <div className="ui_info absolute left-0 bottom-6 w-96 gap-1 bg-slate-900 text-white text-sm p-4 rounded-md h-max">
                      Senior developers are seasoned professionals in software
                      development,providing technical leadership and
                      expertise.They ensure high-quality code,troubleshoot
                      complex issues,mentor junior developers,and contribute to
                      project management.
                    </div>
                  )}
                </div>
              </div>

              <div className=" flex justify-center items-center">
                <button
                  onClick={decreaseSr}
                  className=" bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  -
                </button>
                <p className="mx-2">{SrDev}</p>
                <button
                  onClick={increaseSr}
                  className=" bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="devInput flex items-center w-[450px] justify-between mt-2">
              <div className=" w-1/2 flex justify-between items-center">
                <div className="">
                  <h4 className=" text-black">Junior Developer</h4>
                  <p className="cost italic text-slate-400">(Rs 20000-40000)</p>
                </div>
                <div className=" relative">
                  <div
                    onMouseEnter={() => handleui(2)}
                    onMouseLeave={() => handleleave()}
                    className="ui_i text-slate-600 ml-3 hover:cursor-pointer  "
                  >
                    <InfoIcon sx={{ fontSize: "20px" }} color="white" />
                  </div>
                  {uitoggle === 2 && (
                    <div className="ui_info absolute left-0 bottom-6 w-96 bg-slate-800 text-white text-sm p-4 rounded-md h-max">
                      Junior developers are entry-level professionals learning
                      and contributing to software projects. They write code,
                      assist in testing, and benefit from mentorship to build
                      skills. They adapt to team dynamics, participate in
                      documentation, and focus on continuous learning, laying
                      the groundwork for future growth in their careers.
                    </div>
                  )}
                </div>
              </div>

              <div className=" flex justify-center items-center">
                <button
                  onClick={decreaseJr}
                  className="  bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  -
                </button>
                <p className=" mx-2">{JrDev}</p>
                <button
                  onClick={increaseJr}
                  className="  bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="devInput flex items-center w-[450px] justify-between">
              <div className=" w-1/2 flex justify-between items-center">
                <div className="  ">
                  <h4 className=" text-black">UI/UX designer(optional)</h4>
                  <p className="cost italic text-slate-400">(Rs 8000)</p>
                </div>
                <div className=" relative">
                  <div
                    onMouseEnter={() => handleui(3)}
                    onMouseLeave={() => handleleave()}
                    className="ui_i text-slate-600 ml-3 hover:cursor-pointer  "
                  >
                    <InfoIcon sx={{ fontSize: "20px" }} color="white" />
                  </div>
                  {uitoggle === 3 && (
                    <div className="ui_info absolute left-0 bottom-6 w-96 bg-slate-800 text-white text-sm p-4 rounded-md h-max">
                      UI/UX designers craft user-friendly interfaces, creating
                      wireframes and prototypes while prioritizing user needs.
                      They integrate feedback, collaborate with developers, and
                      maintain brand consistency. Proficient in design tools,
                      they stay updated on trends, contributing innovation to
                      deliver effective and visually appealing user experiences.
                    </div>
                  )}
                </div>
              </div>

              <div className=" flex justify-center items-center">
                <button
                  onClick={decUiUx}
                  className=" bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  -
                </button>
                <p className="mx-2">{UiUx}</p>
                <button
                  onClick={incUiUx}
                  className=" bg-cyan-300 w-8 h-8 rounded-full flex justify-center items-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {SrDev + JrDev + UiUx === 0 && err && (
            <p className="err text-red-600 italic text-sm">
              Add atleast one developer
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Preferences;

import React from "react";
import { useSelector } from "react-redux";
import "./steps.css";
const Steps = () => {
  const { step } = useSelector((state) => state.details);
  const Sphere = ({ steps, full, text }) => {
    return (
      <div className=" w-max h-max flex justify-center items-center">
        <div
          style={{
            backgroundColor: full ? "#0c98f5" : "white",
            color: full ? "white" : "black",
          }}
          className=" p-4 w-4 h-4  font-medium text-sm rounded-full flex justify-center items-center border border-slate-400 "
        >
          {steps}
        </div>
      </div>
    );
  };
  const Bar = ({ full }) => {
    return (
      <div
        style={{ backgroundColor: full ? "#0c98f5" : "#cfd1d4" }}
        className=" w-96  h-1 bg-slate-200 "
      ></div>
    );
  };

  return (
    <div className=" w-full flex justify-center items-center mb-8">
      <div className="w-4/5 flex justify-center items-center">
        <Sphere
          steps={1}
          full={step === 1 || step > 1}
          text={"Project Details"}
        />
        <Bar full={step > 1} />
        <Sphere
          steps={2}
          full={step === 2 || step > 2}
          text={"Development Preference"}
        />
        <Bar full={step > 2} />
        <Sphere
          steps={3}
          full={step === 3 || step > 3}
          text={"Documentation"}
        />
        <Bar full={step > 3} />
        <Sphere steps={4} full={step === 4} text={"Finish"} />
      </div>
    </div>
  );
};

export default Steps;

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import a1 from "../../utils/lotties/a1.json";
import "./client.css";
import Steps from "../../components/StepUi/Steps";
import ProjectName from "../ProjectName/ProjectName";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import {
  increaseStep,
  decreaseStep,
  enableErr,
  disableErr,
  changeSlidePos,
  changeSlideNeg,
} from "../../../redux/clientSlice";
import { ColorRing } from "react-loader-spinner";
import Preferences from "../Preferences/Preferences";
import Docs from "../DocFIle/Docs";
import Additionals from "../../components/Additionals/Additionals";
import Final from "../Final/Final";
const Client = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { step, SrDev, JrDev, apps, UiUx, projectname, projectoverview, err } =
  useSelector((state) => state.details);
  const [open, setOpen] = React.useState(false);
  const [toggleEx, settoggleEx] = useState(false);
  const [emptyFi, setemptyFi] = useState("");
  const handleClose = () => setOpen(false);
  const [loading, setloading] = useState(false);
  const [triggerVal, settriggerVal] = useState(0);
  const [count, setcount] = useState(0);
  const [openQo, setOpenQo] = React.useState(false);
  const handleOpenQo = () => setOpenQo(true);
  const handleCloseQo = () => setOpenQo(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAdmin, name, isDeveloper } = useSelector((state) => state.Auth);

  const disablerr = () => {
    dispatch(disableErr());
    dispatch(changeSlidePos());
    increase();
  };

  const checkValidation = () => {
    if (step === 1) {
      (step === 1 && projectname.length === 0) ||
      (step === 1 &&
        (projectoverview.length === 0 || projectoverview.length < 100))
        ? dispatch(enableErr())
        : disablerr();
    }
    if (step === 2) {
      SrDev + JrDev + UiUx === 0 || !apps[0]
        ? dispatch(enableErr())
        : disablerr();
    }
    if (step === 3) {
      setloading(true);
      handleOpenQo();
    }
    // if ( ) {
    //   seterr(true);
    // } else if ((step === 2 && SrDev + JrDev + UiUx === 0) || !apps[0]) {
    //   seterr(true);
    // } else {

    // }
  };

  const increase = () => {
    const myrgx = /[wW]eb/;
    const result = apps.filter((c) => {
      return myrgx.test(c) === true;
    });

    if (step === 2) {
      // findempty()
      apps[0] && setcount(count + 1);
      if (result[0] && UiUx === 0) {
        settriggerVal(1);
      } else if (apps[0] && SrDev === 0) {
        settriggerVal(2);
      } else if (apps[0] && JrDev === 0) {
        settriggerVal(3);
      } else if (!apps[0]) {
        console.log("huh");
      } else {
        dispatch(increaseStep());
      }
    } else {
      dispatch(changeSlidePos());
      dispatch(increaseStep());
    }
  };
  const decrease = () => {
    if (step === 2 && triggerVal !== 0) {
      setcount(count - 1);
    } else {
      dispatch(changeSlideNeg());
      dispatch(decreaseStep());
    }
  };
  useEffect(() => {
    if (count === 2) {
      dispatch(changeSlidePos());
      dispatch(increaseStep());
      settriggerVal(0);
    }
  }, [count]);

  useEffect(() => {
    if (step !== 2) {
      setcount(0);
      settriggerVal(0);
    }
  }, [step]);
  
  if (!user || isAdmin) {
    console.log(isAdmin);
    return <Navigate to={"/"} />;
  }

  if (isDeveloper) {
    console.log(isAdmin);
    return <Navigate to={"/developer"} />;
  }
  return (
    <div className=" w-screen h-screen flex">
      <div className=" detail_cont h-full  w-4/6 py-10 px-12">

        

        <Steps />
        {/* <hr className=" h-1 w-full bg-slate-200 rounded-full mt-4" /> */}
        {step === 1 && <ProjectName />}
        {step === 2 && count < 1 && <Preferences />}
        {step === 2 && count > 0 && <Additionals value={triggerVal} />}
        {step === 3 && (
          <Docs
            Qo={openQo}
            handleCloseQo={handleCloseQo}
            handleOpenQo={handleOpenQo}
          />
        )}
        {step === 4 && <Final />}
        {/* <hr className=" h-1 w-full bg-slate-200 rounded-full mb-4" /> */}
        {step !== 4 && (
          <div className="w-full h-max flex justify-end">
            {step !== 1 && (
              <button onClick={decrease} className="w-max  px-4 p">
                Back
              </button>
            )}
            <button
              onClick={checkValidation}
              className="w-max bg-cyan-500 px-4 p-2 text-white text-sm font-medium rounded-md"
            >
              {step === 3 ? "Submit" : "Next Step"}
            </button>
            {loading && (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ff0059", "#ff0059", "#ff0059", "#ff0059", "#ff0059"]}
              />
            )}
          </div>
        )}
      </div>
      <div className="lotte w-2/6 flex justify-center items-center">
        <Lottie
          className="w-[500px] h-[500px] min-h-[500px] min-w-[500px"
          animationData={a1}
          loop={true}
        />
      </div>
      <div className="fixed right-4 z-10 mt-4 flex justify-end font-medium">
          <button 
          className="bg-slate-500 p-2 rounded-lg text-white"
          onClick={() => navigate("/projects")}
          >
            Skip for now < ArrowRightAltIcon/>
          </button>
        </div>
    </div>
  );
};

export default Client;

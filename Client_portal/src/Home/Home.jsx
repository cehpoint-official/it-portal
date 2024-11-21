import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./home.css";
import { useSelector } from "react-redux";
import Navbar from "../Client_panel/components/Navbar/Navbar";
import ClientLogin from "../Client_panel/components/ClientLogin/ClientLogin";
import Footer from "../Client_panel/components/Footer/Footer";
import Clientsignup from "../Client_panel/components/SignUpParts/Clientsignup";
import InternalLogin from "../Client_panel/components/SignUpParts/InternalLogin";
const FormFields = {
  displayName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const Home = () => {
  const [progress, setProgress] = React.useState(10);

  const [data, setdata] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [fields, setfields] = useState(FormFields);
  const handleClose = () => setOpen(false);
  const [err, seterr] = useState(false);
  const navigate = useNavigate();
  const [type, settype] = useState(0);
  const [firstsignup, setfirstSignup] = useState(false);
  const { user, isAdmin, name, isDeveloper } = useSelector((state) => state.Auth);
  const { displayName, email, password, phone } = fields;
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
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 80 ? 80 : prevProgress + Math.floor(Math.random() * 10)
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleChange = (e) => {
    setfields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const text =
    '"\n" + "Project Name: App Development\n" + "\n" + "Client Details:\n"';
  const value = text.split("+");
  const result = value.map((c) => c.replace(/"/g, ""));
  const percentage = 66;
  const sendrequest = async () => {
    const result = await axios.post("http://localhost:4000/api/gpt/send", {
      name: "abhishek",
    });
    const filtered = result.data.replace(/\/n/g, "<br/>");
    setdata(filtered);
    console.log(result.data);
  };
  
  if(user && isDeveloper){
    console.log("developer",isDeveloper); 
    return <Navigate to={"/developer"} />;
  }

  if (user && isAdmin) {
    console.log("admin",isAdmin);
    return <Navigate to={"/admin"} />;
  }

  if (user && !isAdmin && !isDeveloper && !firstsignup) {
    return <Navigate to={"/projects"} />;
  }

  const test = () => {
    console.log("hello");
  };

  const clienttab = () => {
    settype(0);
  };

  const internaltab = () => {
    settype(1);
  };

  const clientchange = () => {};

  const newuserchange = () => {
    setfirstSignup(true);
  };

  return (
    <div className="wrapper w-screen h-screen flex justify-between items-center">
      <div className=" flex flex-col w-[30%] h-full justify-center items-center">
        <h1 className=" text-white font-bold text-3xl">Welcome</h1>
        <button
          onClick={() => navigate("/login")}
          className=" bg-white text-blue-600 px-4 py-1 rounded-full mt-8"
        >
          Login
        </button>
      </div>
      <div className="part_right flex justify-center   overflow-hidden  ">
        <div className=" bg-blue-600 h-max py-1 w-max absolute top-2 right-1 px-2 rounded-full">
          <button
            style={{
              backgroundColor: type === 0 ? "white" : "#0341fc",
              color: type === 0 ? "#0341fc" : "white",
            }}
            onClick={clienttab}
            className=" bg-white w-max px-4 py-1 text-blue-600 rounded-full text-sm"
          >
            Client
          </button>
          <button
            style={{
              backgroundColor: type === 1 ? "white" : "#0341fc",
              color: type === 1 ? "#0341fc" : "white",
            }}
            onClick={internaltab}
            className="  w-max px-4 py-1 text-white rounded-full text-sm"
          >
            Admin
          </button>
        </div>
        {type === 0 && <Clientsignup change={newuserchange} />}
        {type === 1 && <InternalLogin />}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="t343"
        >
          <Box sx={style} className="modal_three">
            <div className=" h-[300px] w-[300px] overflow-y-auto overflow-x-hidden">
              <form
                action=""
                className=" w-full flex flex-col justify-center items-center"
              >
                <h1 className=" text-4xl font-extrabold text-slate-700 mb-8 ">
                  Client Login
                </h1>
                <input
                  onChange={clientchange}
                  type="text"
                  className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
                  placeholder="Enter your email"
                  id="AdminEmail"
                />
                <input
                  onChange={clientchange}
                  type="text"
                  className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
                  placeholder="Enter your password"
                  id="AdminPassword"
                />
                <button
                  // onClick={Clientlogin}
                  className=" w-max px-4 py-2 rounded-md bg-blue-600 text-white font-semibold mt-4"
                >
                  Login
                </button>
                {err && (
                  <p className=" text-sm italic text-red-500">
                    Invalid email or passowrd
                  </p>
                )}
              </form>
            </div>
          </Box>
        </Modal>
        {/* <div className=" flex justify-center items-center">
          <div className=" h-screen w-full flex justify-center items-center">
            <div className="frm w-[700px] h-[460px]  flex flex-col  items-center ">
              <h1 className=" text-3xl w-max font-medium ">Client Signup</h1>
              <div className=" w-full bg-slate-300">
               
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>

    // <div className="landing-page flex flex-col justify-between items-center">
    //   <Navbar />
    //   <section className=" w-screen h-screen">
    //     <div className=" mainCont11 flex justify-between h-full">
    //       <div className=" titleMain w-1/2 h-full flex justify-center items-center flex-col">
    //         <h1 className="title1 text-4xl text-slate-800 font-extrabold w-4/5 ">
    //           Your Vision, Our Expertise: Bring Your Ideas to Life!
    //         </h1>
    //         <p className="title2 text-sm text-slate-400 font-semibold w-4/5 mt-4 ">
    //           Welcome to XYZ, where innovation meets expertise! We're here to
    //           turn your ideas into reality. Whether you have an app concept, a
    //           software project, or a business solution in mind, we've got you
    //           covered.
    //         </p>
    //       </div>
    //       <div className=" imgMain w-1/2 h-full flex justify-center items-center">
    //         <img
    //           className="imageLandPage w-full "
    //           src="./landPage.jpg"
    //           alt=""
    //         />
    //       </div>
    //     </div>
    //   </section>
    //   <section className=" relative sec2 w-screen h-screen flex flex-col justify-center items-center bg-opacity-10 bg-contain">
    //     <ClientLogin />
    //   </section>
    //   <section className=" w-screen h-max">
    //     <Footer />
    //   </section>
    // </div>
  );
};

export default Home;
{
  /* <div className=""></div>
<div className=" flex justify-center items-center">
  <div className="">
    {" "}
    <a className=" bg-teal-200 w-max px-4 py-2" href="/signup">
      SignUp
    </a>
  </div>
  <div className="">
    <a className=" bg-teal-500 w-max px-4 py-2" href="">
      Admin login
    </a>
  </div>
  <div className="">
    {result.map((c) => (
      <p> {c} </p>
    ))}
  </div>
  <div className=" w-10 h-10">
    <CircularProgressbar
      maxValue={100}
      value={progress}
      text={`${progress}%`}
    />
  </div>
  ;
</div>
<div className=""></div>
<button onClick={sendrequest}>get gpt msg</button>
<button onClick={handleOpen}>OPEN</button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}></Box>
</Modal> */
}

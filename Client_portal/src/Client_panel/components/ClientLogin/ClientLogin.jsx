import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setadmin, setuser } from "../../../redux/AuthSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorRing } from "react-loader-spinner";
import "./clientlogin.css";
import { useNavigate } from "react-router-dom";
const ClientLogin = () => {
  const { user, isAdmin, name } = useSelector((state) => state.Auth);
  const [open, setOpen] = React.useState(false);
  const [err, seterr] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setloading] = useState(false);
  const [adminloading, setadminloading] = useState(false);
  const navigate = useNavigate();
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
  const [field, setfield] = useState({
    email: "",
    password: "",
  });
  const [adminfield, setadminfield] = useState({
    AdminEmail: "",
    AdminPassword: "",
  });


  const getadmin = async (id) => {
    const docRef = doc(db, "Roles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data(), id);
      if (!docSnap.data().isAdmin) {
        seterr(true);
      } else {
        dispatch(setadmin(docSnap.data().isAdmin));
        dispatch(setuser({ uid: id, name: docSnap.data().displayName }));
        // navigate("/admin");
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const dispatch = useDispatch();

  const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        dispatch(setuser({ uid: user.uid, name: user.displayName }));
        // navigate("/projects");
        setloading(false);
        // return user.uid;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // return error;
      });
  };

  const signinAdmin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("admin ",user);
        getadmin(user.uid);
        setadminloading(false);
        // return user.uid;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        
        // return error;
      });
  };

  const handlechange = (e) => {
    setfield((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleadmin = (e) => {
    setadminfield((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const login = async (e) => {
    e.preventDefault();
    setloading(true);
    signin(field.email, field.password);
  };

  const Adminlogin = async (e) => {
    e.preventDefault();
    setadminloading(true);
    signinAdmin(adminfield.AdminEmail, adminfield.AdminPassword);
  };

  
  return (
    <div className=" w-[300px] ">
      <form
        action=""
        className=" w-full flex flex-col justify-center items-center"
      >
        <h1 className=" text-4xl font-extrabold text-slate-700 mb-8 ">
          Client Login
        </h1>
        <input
          required
          onChange={handlechange}
          type="text"
          className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
          placeholder="Enter your email"
          id="email"
        />
        <input
          required
          onChange={handlechange}
          type="text"
          className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
          placeholder="Enter your password"
          id="password"
        />
        <button
          onClick={login}
          className=" w-max px-4 py-2 rounded-md bg-red-600 text-white font-semibold mt-4"
        >
          Login
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
      </form>
      <div className="w-full flex justify-center items-center flex-col mt-4 ">
        <p className=" text-slate-800 font-semibold">
          Not registered?{" "}
          <a className=" text-cyan-800" href="/signup">
            {" "}
            SignUp here
          </a>
        </p>
        <button
          onClick={() => handleOpen()}
          className=" w-max px-4 py-2 rounded-md bg-blue-500 text-white font-medium mt-4"
        >
          Admin Login
        </button>
        {adminloading && (
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
      {/* <button
        onClick={() => console.log(user, isAdmin, name)}
        className=" bg-black text-white"
      >
        Test
      </button> */}
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
                Admin Login
              </h1>
              <input
                onChange={handleadmin}
                type="text"
                className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
                placeholder="Enter your email"
                id="AdminEmail"
              />
              <input
                onChange={handleadmin}
                type="text"
                className=" w-full px-4 py-2 rounded-md outline-none focus:border-slate-900 my-2"
                placeholder="Enter your password"
                id="AdminPassword"
              />
              <button
                onClick={Adminlogin}
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
    </div>
  );
};

export default ClientLogin;

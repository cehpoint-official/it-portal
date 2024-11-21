import React, { useEffect, useState } from "react";
import "./developer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase/firebase.js";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  getStorage,
  ref,
  getDownloadURL,
  getStream,
  getBytes,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signout } from "../Firebase/SignOut.js";
import { setDeveloper } from "../redux/AuthSlice.js";

function Developer() {
  console.log("here 2");
  
  const [slide, setslide] = useState(true);
  const [files, setFiles] = useState([]);
  // const [doc, setDoc] = useState();
  const storage = getStorage();
  const { isDeveloper} = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const logout = () => {
    signout();
    dispatch(setDeveloper(false));
  };

  const getAllProjects = async () => {
    const docRef = query(
      collection(db, "Projects"),
      where("approval", "==", "Approved"),
      // where("isComplete", "==", false)
    );
    // const q = query(collection(db, "Projects"));
    const docSnap = await getDocs(docRef);
    // console.log(docSnap);
    if (!docSnap.empty) {
      const newProjects = docSnap.docs.reduce(
        (acc, doc) => {
          const data = doc._document.data.value.mapValue.fields;
          if (!files.some((proj) => proj.id === doc.id)) {
            data.id = doc.id;
            acc.push(data);
          }
          return acc;
        },
        [...files]
      );
      setFiles(newProjects);
    } else {
      console.log("No such document!");
    }
  };

  const convertbase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
    
  const getbase64 = (datauri) => {
    const base64 = datauri.split("base64,")[1];
    console.log(base64);
    sendpdf(base64);
  };
  const getData = async (type, clientId, projectId) => {
    // console.log(clientId);
    // console.log(projectId);

    getDownloadURL(ref(storage, `${type}/${clientId}/${projectId}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // create64(url);

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          // const base64 = convertbase64(blob).then((res) => getbase64(res));
          // console.log(base64);
        };
        xhr.open("GET", url);
        xhr.send();

        window.open(url);
        console.log(url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const showpdf = (file) => {
    const byteCharacters = atob(file);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    let blob1 = new Blob([byteArray], {
      type: "application/pdf",
    });

    console.log(blob1);
    const url1 = URL.createObjectURL(blob1);
    window.open(url1);
  };

  const sendpdf = async (base64) => {
    const res = await axios.post("http://localhost:4000/api/sendpdf", {
      string: base64,
    });
  };

  const sendemail = async (id) => {
    getDownloadURL(ref(storage, `docs/${id}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // create64(url);
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          const base64 = convertbase64(blob).then((res) => getbase64(res));
          console.log(base64);
        };
        xhr.open("GET", url);
        xhr.send();

        window.open(url);
        // console.log(url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleComplete = async (id) => {
    try {
      const docRef = doc(db, "Projects", id);
      await updateDoc(docRef, { isComplete: true });
      console.log("Document updated successfully!");
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = () => {
    setslide(!slide);
  };

  if(!isDeveloper){
    console.log(isDeveloper);
    return <Navigate to={"/"} />;
  }
  // console.log(files);


  return (
    <div className="bg-slate-400 w-full h-screen flex justify-between relative">
      <div
        className={`${
          slide ? "profile" : "show"
        } w-1/6 h-full bg-blue-700 flex flex-col justify-between `}
      >
        <div className="mt-5 p-2">
          <h1 className="text-2xl font-semib">
            Welcome to Developer Dashboard
          </h1>
        </div>
        <div className=" w-full flex justify-center mb-4 rounded-md">
          <button
            onClick={logout}
            className=" bg-red-800 w-max px-2 py-1 text-red-100 rounded-md"
          >
            <ExitToAppIcon /> Sign Out
          </button>
        </div>
        {!slide && (
          <button
            onClick={handlechange}
            className=" absolute top-0 right-0 text-white"
          >
            <KeyboardBackspaceIcon />
          </button>
        )}
      </div>

      <div className="w-full border px-5">
        <h1 className="text-center mt-5 text-3xl font-semibold">
          Welcome to your developer dashboard
        </h1>
        <table className="w-full mt-5">
          <tbody className="w-full ">
            <tr className="w-full text-black heading">
              <th className="">
                <h4 className="">Sl no.</h4>
              </th>
              <th>
                <h4>Project Name</h4>
              </th>
              <th>
                <h4>Documentation</h4>
              </th>
              <th>
                <h4>Assigned Date</h4>
              </th>
              <th>
                <h4>Due Date</h4>
              </th>

              <th>
                <h4>Mark Complete</h4>
              </th>
            </tr>
            {files &&
              files.map((c, index) => {
                return (
                  <tr key={index} className=" my-4 py-1 ">
                    <td>{c?.name?.stringValue}</td>
                    <td>{c?.projectname?.stringValue}</td>
                    <td>
                      <button
                        onClick={() =>
                          getData("docs", c?.clientid?.stringValue, c?.id)
                        }
                        className=" w-max bg-blue-600 px-10 py-1 text-white  rounded-md"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      {" "}
                      <div className=" flex justify-center items-center  mr-2">
                        {" "}
                        <p
                          className={`bg-green-600  text-yellow-50 p-0 rounded-md py-1 px-1 font-medium`}
                        >
                          {" "}
                          {c?.startTime?.stringValue}
                        </p>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className=" flex justify-center items-center  mr-2">
                        {" "}
                        <p
                          className={`bg-green-600 text-yellow-50 p-0 rounded-md py-1 px-1 font-medium`}
                        >
                          {" "}
                          {c?.endTime?.stringValue}
                        </p>
                      </div>
                    </td>

                    <td>
                      <button>
                        {c?.isComplete.booleanValue ? (
                          <button className="flex gap-2 items-center" onClick={()=>handleComplete(c?.id)}>
                            Completed <CheckCircleIcon />
                          </button>
                        ) : (
                          <button className="flex gap-2 items-center" onClick={() => handleComplete(c?.id)}>
                            Not Completed<CheckCircleOutlineIcon />
                          </button>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <button
        className={`${!slide && "hidden"} absolute top-3 left-3`}
        onClick={handlechange}
      >
        <MenuIcon />
      </button>
    </div>
  );
}

export default Developer;

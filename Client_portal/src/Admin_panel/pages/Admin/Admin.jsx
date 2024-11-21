import React, { useState, useEffect } from "react";
import "./admin.css";
import { db } from "../../../Firebase/firebase";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { signout } from "../../../Firebase/SignOut";
import { Navigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import {
  doc,
  getDocs,
  collection,
  onSnapshot,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  getStream,
  getBytes,
} from "firebase/storage";
import { setuser, setadmin } from "../../../redux/AuthSlice";
import { useFindAllDevelopers } from "../../components/AllDeveloper.js";
const Admin = () => {
  const [files, setfiles] = useState([]);
  const [final, setfinal] = useState([]);
  const [approve, setapprove] = useState(false);
  const [slide, setslide] = useState(false);
  const [currProjectId, setCurrProjectId] = useState();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { user, isAdmin, name } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const storage = getStorage();

  // const { developers, isLoading } = useFindAllDevelopers();
  // console.log(developers);

  const handleslide = () => {
    setslide(!slide);
  };
  const logout = () => {
    signout();
    dispatch(setadmin(false));
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
  const getdata = async (type, clientId, projectId) => {
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
  // useEffect(() => {
  //   const call = async () => {
  //     const querySnapshot = await getDocs(collection(db, "Projects"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       const check = files.some(
  //         (c) => c.projectname === doc.data().projectname
  //       );
  //       console.log(doc.data());
  //       if (!check) {
  //         console.log(check);
  //         setfiles((prev) => [...prev, doc.data()]);
  //       }

  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   };
  //   call();
  // }, []);

  const getAllProjects = async () => {
    const docRef = query(
      collection(db, "Projects"),
      where("isComplete", "==", false)
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
      setfiles(newProjects);
    } else {
      console.log("No such document!");
    }
  };

  const accept = async (id) => {
    console.log("here");
    
    const DocRef = doc(db, "Projects", id);
    await setDoc(
      DocRef,
      {
        approval: "Approved",
        startTime: startDate,
        endTime: endDate,
      },
      { merge: true }
    );
    sendemail(id);
    window.location.reload();
    // getAllProjects();
  };
  const reject = async (id) => {
    const DocRef = doc(db, "Projects", id);
    await setDoc(
      DocRef,
      {
        approval: "NotApproved",
      },
      { merge: true }
    );
    console.log("success");
    window.location.reload();

    // getAllProjects();
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  // useEffect(() => {
  //   const call = () => {
  //     const filtered = [];
  //     files.forEach((c) => {
  //       console.log(files);
  //       const check = files.some((cr) => cr.projectname !== c.projectname);
  //       if (check) {
  //         filtered.push(c);
  //       }
  //     });
  //     setfinal(filtered);
  //   };
  //   call();
  // }, [files]);
  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = User.uid;
        // dispatch(setuser({ uid: User.uid, name: User.displayName }));

        // console.log(User);
        // ...
      } else {
        dispatch(setuser({ uid: null, name: null }));
        dispatch(setadmin(false));
        // User is signed out
        // ...
        console.log("user is signed out");
      }
    });
  }, []);
  if (!isAdmin) {
    // console.log(isAdmin);
    return <Navigate to={"/"} />;
  }
  // useEffect(() => {
  //   const call = async () => {
  //     const querySnapshot = await getDocs(collection(db, "Projects"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       const check = files.some(
  //         (c) => c.projectname === doc.data().projectname
  //       );
  //       if (!check) {
  //         console.log(check);
  //         setfiles((prev) => [...prev, doc.data()]);
  //       }

  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   };
  //   call();
  // }, []);
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

  const handleComplete = async (id) => {
    try {
      const docRef = doc(db, "Projects", id);
      await updateDoc(docRef, { isComplete: true });
      console.log("Document updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("files ", files);
  // console.log(startDate,endDate);

  return (
    <div className="adminMain w-screen h-screen flex justify-between items-center bg-black">
      <div
        className={`${
          slide && "show"
        } slider w-[15%] bg-slate-900 h-screen  md:h-[96%] z-20 flex flex-col justify-between relative `}
      >
        <div className=" adminprofile flex flex-col justify-between items-center w-full px-4 mt-4">
          <div className="  ">
            <img
              className=" w-16 h-16 rounded-full"
              src="./adminicon.png"
              alt=""
            />
          </div>
          <div className=" text-center mt-2 ">
            <h5 className=" text-white ">{name || ""}</h5>
            <h3 className=" text-white">ADMINISTRATOR</h3>
          </div>
        </div>
        <div
          onClick={logout}
          className=" flex items-center justify-center text-white mb-4 hover:cursor-pointer "
        >
          <LogoutIcon />
          <p>SignOut</p>
        </div>
        {slide && (
          <button
            className=" text-white absolute top-0 right-0 closebtn"
            onClick={() => setslide(!slide)}
          >
            <KeyboardBackspaceIcon sx={{ fontSize: "40px" }} />
          </button>
        )}
      </div>
      <div className=" projectMain w-[82%] h-[96%] relative  flex justify-center  items-center bg-slate-900 rounded-md">
        {/* <nav className=" flex justify-between items-center h-20 bg-blue-200 sticky top-0 left-0 right-0 w-full border-b-2 border-b-neutral-300">
          <div className=""></div>
          <div className=" mx-4 my-2">
            <img
              className=" bg-stone-800 w-12 h-12 rounded-full"
              src=""
              alt=""
            />
          </div>
        </nav> */}
        <div className=" project_cont w-11/12 h-[90%]  flex flex-col  justify-start ">
          <h4 className=" admin_title text-2xl text-slate-100 font-thin">
            Client Projects{" "}
          </h4>
          <table className=" w-full  ">
            <tbody className=" w-full ">
              {/* heading */}
              <tr className="  w-full  ">
                <th>
                  <h4>Client Name</h4>
                </th>
                <th>
                  <h4>Project Name</h4>
                </th>
                <th>
                  <h4>Documentation</h4>
                </th>
                <th>
                  <h4>Quotation</h4>
                </th>
                <th>
                  <h4>Approval</h4>
                </th>
                <th>
                  <h4>Status</h4>
                </th>
              </tr>

              {/* listing */}
              {files &&
                files.map((c, index) => {
                  return (
                    <tr key={index} className=" my-4 py-1 ">
                      <td>{c?.name?.stringValue}</td>
                      <td>{c?.projectname?.stringValue}</td>
                      <td>
                        <button
                          onClick={() =>
                            getdata("docs", c?.clientid?.stringValue, c?.id)
                          }
                          className=" w-max bg-blue-600 px-10 py-1 text-white  rounded-md"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            getdata(
                              "quotation",
                              c?.clientid?.stringValue,
                              c?.id
                            )
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
                            className={`${c?.approval?.stringValue}  text-yellow-50 p-0 rounded-md py-1 px-1 font-medium`}
                          >
                            {" "}
                            {c?.approval?.stringValue}
                          </p>
                        </div>
                      </td>
                      <td className=" ">
                        {c.approval?.stringValue !== "Pending" ? (
                          <div className=" flex justify-center">
                            {c?.isComplete?.stringValue === true ? (
                              // <button
                              //   onClick={() => handleComplete(c.id)}
                              //   className=" text-green-500 icon"
                              // >
                              //   <DeleteIcon />
                              // </button>
                              <p>Completed</p>
                            ) : (
                              // <button
                              //   onClick={() => handleComplete(c.id)}
                              //   className=" text-red-500 icon"
                              // >
                              //   <DeleteIcon />
                              // </button>
                              <p>Working</p>
                            )}
                          </div>
                        ) : (
                          <div className="  text-green-400 ">
                            <div className="flex justify-center items-center gap-2">
                              <div
                                onClick={() => {
                                  // accept(c?.requirementfile, c?.id)
                                  setShowDatepicker(true);
                                  setCurrProjectId(c?.id);
                                }}
                                className=""
                              >
                                <CheckBoxIcon className=" ico" color="green" />
                              </div>
                              <div onClick={() => reject(c?.id)} className="">
                                <CloseIcon
                                  color="red"
                                  className=" ico"
                                  sx={{ fontSize: "30px", color: "red" }}
                                />
                              </div>

                              {/* <p className=" text-slate-50"> Aprroved</p> */}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <button
        className="absolute  md:hidden  top-0 left-0 text-white"
        onClick={handleslide}
      >
        <MenuIcon />
      </button>

      {/* date picker */}
      <div
        className={`fixed w-[500px] bg-white z-20 left-[40%] rounded-lg drop-shadow-lg shadow-lg p-2 ${
          showDatepicker ? "visible" : "hidden"
        }`}
      >
        <h1 className="text-center mt-3 font-bold">
          Select project completion date
        </h1>
        <div className="w-full flex justify-between mt-5 gap-2">
          {/* start date */}
          <div className="w-1/2">
            <h4 className="text-black font-semibold">Start Date:</h4>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2"
              type="date"
            />
          </div>
          <div className="w-1/2">
            <h4 className="text-black font-semibold">End Date:</h4>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2"
              type="date"
            />
          </div>
        </div>

        <div className="mt-5 w-full">
          <h4 className="font-semibold text-black">Note (optional):</h4>
          <textarea
            className="w-full p-1 min-h-[100px]"
            placeholder="Add note for developer team"
          ></textarea>
        </div>

        {/*accept / reject */}
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => accept(currProjectId)}
            className="text-white bg-green-500 py-3 px-4 rounded-lg"
          >
            Approve <ArrowRightAltIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect, useRef } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../Firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  getStorage,
  ref,
  getDownloadURL,
  getStream,
  getBytes,
} from "firebase/storage";
import "./clientstatus.css";
import { setuser, setadmin } from "../../../redux/AuthSlice";
import { signout } from "../../../Firebase/SignOut";
import { onAuthStateChanged } from "firebase/auth";
const ClientStatus = () => {
  const { user, isAdmin, name, isDeveloper } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [project, setproject] = useState([]);
  const projectRef = useRef(project);
  const [phone, setphone] = useState("");
  const [slide, setslide] = useState(true);
  const storage = getStorage();
  const navigate = useNavigate();
  const logout = () => {
    signout();
  };

  //client phone
  useEffect(() => {
    const call = async () => {
      const docRef = doc(db, "ClientPhone", user);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setphone(docSnap.data().phone);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    user && call();
  }, [user]);

  //setting project here
  useEffect(() => {
    const call = async () => {
      const docRef = query(
        collection(db, "Projects"),
        where("clientid", "==", user)
      );
      const docSnap = await getDocs(docRef);
      // console.log(docSnap);
      
      if (!docSnap.empty) {
        const newProjects = docSnap.docs.reduce((acc, doc) => {
          // console.log("acc",acc);   
          // console.log("doc",doc);
                 
          const data = doc._document.data.value.mapValue.fields;
          if (!project.some((proj) => proj.id === data.id)) {
            // console.log("data",data);
            data.id = doc.id
            acc.push(data);
          }
          return acc;
        }, [...project]);
        setproject(newProjects);
      } else {
        console.log("No such document!");
      }
    };
  
    user && call();
  }, [user]);

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

  const handlechange = () => {
    setslide(!slide);
  };

  const getdata = async (type, clientId, projectId) => {
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

  if(!user || isDeveloper){
    return <Navigate to={"/"} />;
  }
  if (!user || isAdmin) {
    return <Navigate to={"/"} />;
  }

  const handleAddProject = () => {
    navigate("/details");
  };

  // console.log(project); 

  return (
    <div className=" w-screen h-screen flex ">
      {/* hamberger section */}
      <div
        className={`${
          slide ? "profile" : "show"
        } w-1/6 h-full bg-blue-700 flex flex-col justify-between `}
      >
        <div className=" w-full flex flex-col justify-center mt-12  ">
          <div className=" w-full flex flex-col justify-center items-center  border-b-2 pb-4 border-white">
            <img className=" rounded-full w-20 h-20 bg-white" src="" alt="" />
            <h4>{auth.currentUser?.displayName}</h4>
          </div>
          <div className=" flex flex-col justify-start items-start  py-2">
            <h4 className=" flex text-xs font-medium items-center  ">
              <LocalPhoneIcon sx={{ color: "#4be3a9", marginRight: "5px" }} />{" "}
              {phone}
            </h4>
            <h4 className=" flex text-xs font-medium items-center    ">
              <EmailIcon sx={{ color: "#4be3a9", marginRight: "5px" }} />{" "}
              {auth.currentUser?.email}
            </h4>
          </div>
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

      {/* description page */}
      <div className=" w-full h-full bg-sky-100 flex flex-col justify-center items-center">
        <div className="project_cl w-[95%] h-[95%] bg-white rounded-md">
          <h2>Your Projects</h2>
          <div className=" w-full h-[450px] border-b-2 border-cyan-700 overflow-y-auto">
            <table className=" w-full ">
              <tbody>
                <tr>
                  <th>Project name</th>
                  <th>Documentation</th>
                  <th>Quotation</th>
                  <th>Status</th>
                </tr>

                {project.map((curr) => {
                  // console.log(curr.JrDev);
                  return (
                    <tr key={curr.projectname.stringValue} className=" border-y-2 border-slate-200">
                      <td>{curr.projectname.stringValue}</td>
                      <td>
                        <button
                          onClick={() =>
                            getdata("docs", curr?.clientid.stringValue,curr?.id)
                          }
                          className=" bg-sky-400 w-max px-2 py-1 rounded-md text-white font-medium"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            getdata("quotation", curr?.clientid.stringValue, curr?.id)
                          }
                          className=" bg-sky-400 w-max px-2 py-1 rounded-md text-white font-medium"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <div className=" flex justify-center items-center   mr-2">
                          <p
                            className={`${curr?.approval.stringValue} w-max  text-white p-0 rounded-md py-1 px-1 font-medium`}
                          >
                            {curr?.approval.stringValue}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className=" btn flex w-full justify-center items-center mt-4">
            <button
              onClick={handleAddProject}
              className=" w-max px-4 py-2 bg-cyan-700 text-white text-sm font-medium rounded-md flex justify-center items-center "
            >
              <AddCircleOutlineIcon sx={{ marginRight: "5px" }} />
              Add New Project
            </button>
          </div>
        </div>
      </div>
      <button
        className={`${!slide && "hidden"} absolute top-0 left-0`}
        onClick={handlechange}
      >
        <MenuIcon />
      </button>
    </div>
  );
};

export default ClientStatus;

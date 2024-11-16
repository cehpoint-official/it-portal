import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./docs.css";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { db } from "../../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { increaseStep, setdocs } from "../../../redux/clientSlice";
import DownloadIcon from "@mui/icons-material/Download";
import { auth } from "../../../Firebase/firebase";
import { uploadDoc, uploadQuotation } from "../../components/Test/test.js";
import { storeclient } from "../../components/StoreClientInfo/StoreClient";
import { Quotation } from "../../components/Quotation/Quotation";
import ReactQuill from "react-quill";
import {v4 as uuidv4} from "uuid"
import "react-quill/dist/quill.snow.css";
const Docs = ({ Qo, handleCloseQo, handleOpenQo }) => {
  const [uploadshow, setupload] = useState(false);
  const [prepareshow, setprepare] = useState(false);
  const {
    apps,
    projectname,
    projectoverview,
    SrDev,
    JrDev,
    UiUx,
    slide,
    docs,
  } = useSelector((state) => state.details);
  const [progress, setProgress] = React.useState(10);
  const [file, setfile] = useState("");
  const [data, setdata] = useState(docs);
  const [base64Doc, setbase64Doc] = useState("");
  const [base64Qo, setbase64Qo] = useState("");
  const [edit, setedit] = useState(false);
  const [opendoc, setOpendoc] = React.useState(false);
  const handleOpen = () => setOpendoc(true);
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const docRef = useRef();
  const [loading, setloading] = useState(false);
  var toolbarOptions = ["bold", "italic", "underline", "strike", "image"];
  const [phone, setphone] = useState("");
  const divRef = useRef(null);
  const Url = process.env.REACT_APP_Backend;


  useEffect(() => {
    const call = async () => {
      const docRef = doc(db, "ClientPhone", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setphone(docSnap.data().phone);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    call();
  }, []);

  const setdocdata = (e) => {
    setdata(e);
    dispatch(setdocs(e));
  };


  function onInput() {
    const root = divRef.current;
    setdata(root.innerHTML);
    setTimeout(() => placeCaret(root.innerText.length), 100);
  }


  function placeCaret(position) {
    const root = divRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.setStart(root.firstChild.firstChild, position);
  }
  
  
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


  const handleClose = () => {
    setOpendoc(false);
    setedit(false);
  };
  const showUp = () => {
    setupload(true);
  };
  const store = () => {
    return storeclient(apps, SrDev, JrDev, UiUx, projectname, projectoverview);
  };


  const closeQo = async () => {
    const project = await store();
    // console.log("project",project.id);  

    uploadDoc(base64Doc, project.id);
    uploadQuotation(base64Qo,project.id);
    dispatch(increaseStep());
    handleCloseQo();
  };

  const showprepare = () => {
    setprepare(true);
  };

  const sendrequest = async () => {
    setloading(true);
    const result = await axios.post(`${Url}/api/gpt/generate`, {
      name: auth.currentUser.displayName,
      projectname: projectname,
      apps: apps,
      seniorDev: SrDev,
      juniorDev: JrDev,
      UiUx: UiUx,
      email: auth.currentUser.email,
    });
    // setdata(result.data);
    const value = result.data.split("</head>");
    console.log(value);
    setdata(value[1]);
    dispatch(setdocs(value[1]));
    setloading(false);
  };

  const convertbase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlereqfile = async (e) => {
    setfile(e.target.files[0]);
    const file = e.target.files[0];
    const value = await convertbase64(file);
    const base64 = value.split("base64,")[1];
    setbase64Doc(base64);
  };

  const downloadpdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("invoice.pdf");
    });
  };

  const handlechange = (e) => {
    setdata(e.target.value);
  };

  // qoutation
  const QuotationCont = () => {
    return (
      <div
        className=" relative w-[800px] h-max overflow-auto border border-black pt-8 px-4 py-2 "
        ref={pdfRef}
      >
        <h2 className=" text-5xl font-bold text-cyan-600 px-4">Quotation</h2>
        <div className=" mt-8">
          <div className=" w-full h-max bg-slate-400 px-4 py-2">
            <h4 className=" font-semibold text-slate-900">
              CLIENT INFORMATION :
            </h4>
          </div>
          <div className=" px-4 mt-2">
            <p className=" font-bold text-slate-700 my-1">
              Name : <span>{auth.currentUser.displayName}</span>
            </p>
            <p className=" font-bold text-slate-700 my-1">
              Email : <span>{auth.currentUser.email}</span>
            </p>
            <p className=" font-bold text-slate-700 my-1">
              Phone : <span>{phone}</span>
            </p>
          </div>
        </div>
        <div className=" w-full">
          <table className=" w-full  mt-8">
            <tbody>
              <tr className="border border-gray-900">
                <th className=" bg-slate-400 ">Description</th>
                <th className=" bg-slate-400 ">Quantity</th>
                <th className=" bg-slate-400 ">Price</th>
                <th className=" bg-slate-400 ">Total</th>
              </tr>

              <tr className="">
                <td className="  font-bold">Senior Developer</td>
                <td className=" ">{SrDev}</td>
                <td className="  ">Rs 70000</td>
                <td className="">{SrDev * 70000}</td>
              </tr>
              <tr className="">
                <td className="font-bold  ">Junior Developer</td>
                <td className=" ">{JrDev}</td>
                <td className="  ">Rs 40000</td>
                <td className="">{JrDev * 40000}</td>
              </tr>
              <tr className="">
                <td className="font-bold  ">UI/UX Designer</td>
                <td className=" ">{UiUx}</td>
                <td className="  ">Rs 8000</td>
                <td className="">{UiUx * 8000}</td>
              </tr>

              <tr className="  border-b-2 border-slate-900">
                <td className=" font-bold">Others(Project management)</td>
                <td></td>
                <td></td>
                <td>Rs 50000</td>
              </tr>
              <tr className="  border-b-2 border-slate-900">
                <td className=" font-bold">Grand total</td>
                <td></td>
                <td></td>
                <td>Rs {SrDev * 70000 + JrDev * 40000 + UiUx * 8000}</td>
              </tr>
            </tbody>
          </table>
          <div className=" mt-8">
            <div className=" w-full h-max bg-slate-400 px-4 py-2">
              <h4 className=" font-semibold text-slate-900">
                PROJECT INFORMATION :
              </h4>
            </div>
            <div className=" px-4 mt-2">
              <p className=" font-bold text-slate-700 my-1">
                Project Name :{" "}
                <span className=" font-medium text-slate-800 text-sm">
                  {projectname}
                </span>
              </p>
              <p className=" font-bold text-slate-700 my-1">
                Project Overview :{" "}
                <span className=" font-medium text-slate-800 text-sm">
                  {projectoverview}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const DocCont = () => {
    return (
      <div
        ref={docRef}
        className="relative w-full h-full overflow-y-auto  text-wrap border border-stone-800 rounded-md p-4 bg-slate-100 text-slate-800 "
      >
        {/* <div className=" w-full h-full py-4 text-wrap text-normal text-slate-800 font-semibold ">
          {data}
        </div> */}
        <div
          contentEditable="true"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
          className="docs"
          onChange={(e) => console.log(e.currentTarget.oninput)}
        ></div>
      </div>
    );
  };


  const downloaddoc = () => {
    console.log("hit");
    const printElement = ReactDOMServer.renderToString(DocCont());
    html2pdf()
      .from(printElement)
      .outputPdf("blob")
      .then((url) => {
        // process to auto download it
        const fileURL = URL.createObjectURL(url);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "FileName" + new Date() + ".pdf";
        link.click();
        console.log(url);
        console.log(btoa(url));
      });
  };

  //generatin of qoutation
  const generateb64Qo = () => {
    console.log("hit qoutation");
    const printElement = ReactDOMServer.renderToString(QuotationCont());
    html2pdf()
      .from(printElement)
      .outputPdf()
      .then((url) => {
        console.log(btoa(url));
        setbase64Qo(btoa(url));
      });
  };

  // generation of doc
  const generateb64Doc = () => {
    console.log("hit");
    const printElement = ReactDOMServer.renderToString(DocCont());
    html2pdf()
      .from(printElement)
      .outputPdf()
      .then((url) => {
        console.log(btoa(url));
        setbase64Doc(btoa(url));
      });
  };

  useEffect(() => {
    if (Qo) {
      setTimeout(() => downloadpdf(), 2000);
      generateb64Qo();
      generateb64Doc();
    }
    console.log(Qo);
  }, [Qo]);

  const test = () => {
    generateb64Qo();
  };


  return (
    <motion.div
      initial={{ x: slide ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="contentMain relative"
    >
      {!uploadshow && !prepareshow && !docs && (
        <div className=" docStart flex justify-center items-center h-full flex-col">
          <h4 className="  font-semibold text-slate-700">
            Do you already have a requirement file to upload?
          </h4>
          <div className="">
            <button
              onClick={showUp}
              className=" bg-cyan-300 w-max px-6 py-2 rounded-md mr-2 hover:bg-cyan-400 text-white font-medium"
            >
              Yes
            </button>
            <button
              onClick={showprepare}
              className=" w-max px-6 py-2 rounded-md hover:bg-slate-200"
            >
              No
            </button>
          </div>
        </div>
      )}
      {uploadshow && !docs && (
        <div className="flex justify-center items-center h-full flex-col">
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            className=""
            onChange={handlereqfile}
          />
          <p className=" text-slate-700 font-medium mb-2">
            Upload your requirements file
          </p>
          <label
            className=" w-max flex justify-center items-center bg-cyan-400 text-white px-6 py-2 rounded-md"
            htmlFor="file"
          >
            {!file ? (
              <div className="">
                <FileUploadIcon />
                Upload
              </div>
            ) : (
              <div>{file.name}</div>
            )}
          </label>
        </div>
      )}
      {(prepareshow || docs) && (
        <div className="prepare flex justify-center items-center h-full flex-col">
          {!loading && !data && !docs && (
            <div className=" flex flex-col text-center items-center">
              <p>
                Generate your documentation using AI by clicking on
                prepare now
              </p>
              <button
                disabled={loading}
                onClick={sendrequest}
                className=" w-max my-2 px-6 py-2 bg-blue-500 hover:scale-105 transition rounded-md text-white"
              >
                Prepare Now
              </button>
            </div>
          )}
          {loading && (
            <div className="generate mt-4 flex justify-center items-center flex-col">
              <p>Generating documentation using AI, please wait for a moment....</p>
              <CircularProgress color="secondary" />
            </div>
          )}
          {(data || docs) && (
            <div className=" flex flex-col justify-center items-center">
              <p className=" text-xl font-medium text-slate-800">
                Your documentation has been generated !
              </p>
              <button
                className=" bg-green-500 w-max px-4 py-2 rounded-md text-white font-semibold"
                onClick={handleOpen}
              >
                View result
              </button>
              <button
                onClick={sendrequest}
                className=" w-max text-gray-100 bg-slate-700 px-4 py-1 mt-4"
              >
                Generate again
              </button>
            </div>
          )}
        </div>
      )}

      <Modal
        open={opendoc}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_one">
          {data && !edit && <DocCont />}
          {edit && (
            <div className="relative w-full h-full  text-wrap border border-stone-600 rounded-md p-4 bg-slate-100 text-black ">
              <div className=" my-4 h-full w-full overflow-auto">
                <ReactQuill
                  theme="snow"
                  value={docs}
                  onChange={(e) => setdocdata(e)}
                  modules={{ toolbar: toolbarOptions }}
                />
                ;
                {/* <textarea
                  autoFocus={true}
                  onChange={handlechange}
                  className="text-normal bg-slate-100 text-slate-800 font-semibold w-full h-full outline-none border-none"
                  name=""
                  id=""
                  value={data}
                >
                  <div
                    contentEditable="true"
                    dangerouslySetInnerHTML={{ __html: data }}
                    className="docs"
                  ></div>
                </textarea> */}
              </div>
            </div>
          )}
          <div className=" flex fixed top-0 right-4 my-2">
            <button
              onClick={() => setedit(!edit)}
              disabled={edit}
              className={` w-10 h-10 rounded-md  transition bg-slate-800 text-white flex justify-center hover:scale-105 items-center mx-2 ${
                edit && " bg-opacity-10 "
              } `}
            >
              <EditIcon color="black" />
            </button>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-md hover:cursor-pointer transition bg-red-500 text-white hover:scale-105  flex justify-center items-center mx-2 hover:bg-slate-200"
            >
              <CloseIcon />
            </button>
          </div>
          <div className=" absolute w-full bottom-0 flex justify-center mb-2">
            {" "}
            <button
              onClick={downloaddoc}
              className=" bg-cyan-700 text-white w-max px-4 py-2 rounded-md flex items-center"
            >
              <DownloadIcon />
              Download
            </button>
          </div>
        </Box>
      </Modal>
      {/* <button onClick={() => handleOpenQo()} className=" ">
        Open
      </button> */}
      <Modal
        open={Qo}
        onClose={closeQo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="t343"
      >
        <Box sx={style} className="modal_two">
          <div className=" h-[900px] overflow-y-auto overflow-x-hidden">
            <QuotationCont />
            {/* <button
            className=" w-max px-4 py-2 bg-green-500 text-white font-semibold rounded-md mt-2"
            onClick={downloadpdf}
          >
            Download Quotation
          </button> */}
          </div>
        </Box>
      </Modal>
    </motion.div>
  );
};

export default Docs;

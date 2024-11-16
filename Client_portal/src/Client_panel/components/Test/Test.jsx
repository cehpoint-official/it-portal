import React, { useEffect, useState } from "react";

import { db } from "../../../Firebase/firebase";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { doc, getDocs, collection } from "firebase/firestore";
import { Document, Page } from "react-pdf";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import {
  getStorage,
  ref,
  getDownloadURL,
  getStream,
  getBytes,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Test = () => {
  const storage = getStorage();
  const [file, setfile] = useState("");
  const { user } = useSelector((state) => state.Auth);
  useEffect(() => {
    const call = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      // const docRef = doc(db, "Projects", "awdwa3232");
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      //   setfile(docSnap.data().quotation);
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
    };
    call();
    console.log(user);
  }, []);

  // const docRef = doc(db, "Projects", "123rhe12");
  // useEffect(() => {
  //   const call = async () => {
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //       setfile(docSnap.data().requirementfile);
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   };
  //   call();
  // }, []);

  // 'file' comes from the Blob or File API
  const up = () => {};
  const showpdf = () => {
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
  const handlechange = async (e) => {
    setfile(e.target.files[0]);
    const file = e.target.files[0];
    const b64 = await base64(file);
    console.log(b64);
    const baseNew = b64.split("base64,")[1];
    console.log(baseNew);
    const byteCharacters = atob(baseNew);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    let blob1 = new Blob([byteArray], {
      type: "application/pdf",
    });
    // return new Blob([byteArray], { type: contentType });

    console.log(blob1);
    const url1 = URL.createObjectURL(blob1);
    window.open(url1);
  };

  const base64 = (file) => {
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
  const convertbase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  const fetchblob = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob);
        window.open(objectURL);
      });
  const create64 = async () => {
    const blob = await fetchblob();
    console.log(blob);
    const doublebase64 = await convertbase64(blob);
    console.log(doublebase64);
    const string = doublebase64.split(",")[1];
    const my64 = atob(string);
    console.log(my64);
  };
  const getdata = async () => {
    getDownloadURL(ref(storage, "quotation/mRlEzcSEL0d1rRxACayvLRF0OQS2"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // create64(url);

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          const base64 = convertbase64(blob).then((res) => console.log(res));
          console.log(base64);
        };
        xhr.open("GET", url);
        xhr.send();
        setfile(url);
        // window.open(url);
        console.log(url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
  };
  // const pdfJSX = () => {
  //   return (
  //     <>
  //       <h1 className=" bg-red-600">JSX to PDF Convert Example</h1>
  //       <h2>Hello React</h2>
  //     </>
  //   );
  // };
  // const printHandler = () => {
  //   const printElement = ReactDOMServer.renderToString(pdfJSX());
  //   console.log(printElement);

  // html2pdf()
  //   .from(printElement)
  //   .outputPdf()
  //   .then((url) => {
  //     console.log(btoa(url));
  //     const base64String = btoa(url);
  //     setfile(btoa(url));
  //     const byteCharacters = atob(base64String);
  //     const byteArrays = [];

  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteArrays.push(byteCharacters.charCodeAt(i));
  //     }

  //     const byteArray = new Uint8Array(byteArrays);
  //     let blob1 = new Blob([byteArray], {
  //       type: "application/pdf",
  //     });
  // return new Blob([byteArray], { type: contentType });

  // console.log(blob1);
  // const url1 = URL.createObjectURL(blob1);
  // window.open(url1);
  // const res = axios.post("http://localhost:4000/api/sendpdf", {
  //   string: btoa(url),
  // });
  // html2pdf()
  //   .from(printElement)
  //   .outputPdf("arraybuffer")
  //   .then((result) => {
  //     console.log(result);
  //     let blob1 = new Blob([new Uint8Array(result)], {
  //       type: "application/pdf",
  //     });
  //     console.log(blob1);
  //     const url = URL.createObjectURL(blob1);
  //     window.open(url);

  //   });

  // console.log(url);
  // axios.post("/upload", formData).then((res) => {
  //   console.log(res);
  // });
  // formData.append("uploadedFile", fileInputElement.files[0]);
  // });
  // });
  // };
  return (
    <div>
      <embed className=" w-screen h-screen" src={file} />

      <button onClick={getdata}>Print</button>
    </div>
  );
};

export default Test;

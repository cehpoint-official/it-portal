import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { auth } from "../../../Firebase/firebase";
const storage = getStorage();

export const uploadDoc = (file,projectId) => {
  // console.log(file);  
  const storageRef = ref(storage, `docs/${auth.currentUser.uid}/${projectId}`);
  const message2 = file;
  const byteCharacters = atob(file);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  let blob1 = new Blob([byteArray], {
    type: "application/pdf",
  });
  // uploadBytes(storageRef, blob1).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });
  uploadString(storageRef, file, "base64", {
    contentType: "application/pdf",
  });
};


export const uploadQuotation = (file,projectId) => {
  const storageRef = ref(storage, `quotation/${auth.currentUser.uid}/${projectId}`);
  const message2 = file;
  const byteCharacters = atob(file);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  let blob1 = new Blob([byteArray], {
    type: "application/pdf",
  });
  // uploadBytes(storageRef, blob1).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });
  uploadString(storageRef, file, "base64", {
    contentType: "application/pdf",
  });
};

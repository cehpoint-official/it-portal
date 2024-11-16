import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../../Firebase/firebase";
import { db } from "../../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
export const Quotation = () => {
  const { apps, projectname, projectoverview, SrDev, JrDev, UiUx } =
    useSelector((state) => state.details);

  return (
    <>
      <h1>hello</h1>
    </>
  );
};

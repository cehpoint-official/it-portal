import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../Firebase/firebase";
// Add a new document in collection "cities"
import { auth } from "../../../Firebase/firebase";
export const storeclient = async (
  apps,
  SrDev,
  JrDev,
  UiUx,
  projectname,
  projectoverview,
  projectId
) => {
  // await setDoc(doc(db, "Projects", auth.currentUser.uid), {
  //   apps: apps,
  //   SrDev: SrDev,
  //   JrDev: JrDev,
  //   UiUx: UiUx,
  //   projectname: projectname,
  //   projectoverview: projectoverview,
  //   approval: "Pending",
  //   clientid: auth.currentUser.uid,
  //   name: auth.currentUser.displayName,
  // },{merge:true});
  const newDoc = await addDoc(collection(db, "Projects"), {
    apps: apps,
    SrDev: SrDev,
    JrDev: JrDev,
    UiUx: UiUx,
    projectname: projectname,
    projectoverview: projectoverview,
    approval: "Pending",
    clientid: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    isComplete:false,
  });
  return newDoc;
};

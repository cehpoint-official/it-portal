import React, { useEffect, useState } from "react";
import "./navbar.css";
import { signout } from "../../../Firebase/SignOut";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setuser, setadmin } from "../../../redux/AuthSlice";
import { db } from "../../../Firebase/firebase";
import { getDoc } from "firebase/firestore";
import {
  doc,
  getDocs,
  collection,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
const Navbar = () => {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [logo, setlogo] = useState("");
  useEffect(() => {
    const call = async () => {
      const docRef = doc(db, "Brand", "logo");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setlogo(docSnap.data().logo);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    call();
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = User.uid;
        // dispatch(setuser({ uid: User.uid, name: User.displayName }));

        console.log(User);
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
  return (
    <div className="nav w-screen flex justify-center items-center fixed top-0 z-20 bg-slate-600">
      <div className=" w-10/12 flex justify-between items-center">
        <div className="">
          {!logo ? (
            <a href="">Home</a>
          ) : (
            <img className=" w-10 h-10 rounded-full" src={logo} alt="" />
          )}
        </div>
        <div className="">
          {!user ? (
            <button className=" w-max px-4 py-2 bg-emerald-400 text-white font-semibold rounded-md">
              <a href="/signup">Sign Up</a>
            </button>
          ) : (
            <button
              onClick={() => signout()}
              className=" w-max px-4 py-2 bg-emerald-400 text-white font-semibold rounded-md"
            >
              SignOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

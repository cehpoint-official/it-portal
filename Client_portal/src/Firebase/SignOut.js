import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
export const signout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signout");
    })
    .catch((error) => {
      // An error happened.
    });
};

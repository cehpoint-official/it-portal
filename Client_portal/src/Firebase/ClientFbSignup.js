import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updatePhoneNumber,
} from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (displayName, email, password, phone) => {
  if (!email && !password) {
    console.log(email + password + phone + displayName);
    console.log("meow");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (userCredential && auth.currentUser) {
    try {
      sendEmailVerification(auth.currentUser);
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      return userCredential;
    } catch (error) {
      console.log(error);
    }
  }

  return userCredential;
};

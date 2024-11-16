import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signin = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return user.uid;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return error;
    });
};

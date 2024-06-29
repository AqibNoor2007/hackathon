import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../config";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const logInUser = async ({ email, password }) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error, "Error in Login");
    if (error.code === "auth/invalid-credential") {
      toast.error("credentials not matched !");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  }
};

const createUser = async ({ email, password }) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use.");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    console.log(error, "error in sign in ");
  }
};

const getSingleDoc = async (collection, docId) => {
  try {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    return await docSnap.data();
  } catch (error) {
    toast.error("An error occurred. Please try again later.");
    console.log(error, "Error in Get single Doc");
    return error;
  }
};

const addDocById = async (collection, id, values) => {
  const userDocRef = doc(db, collection, id);
  try {
    return await setDoc(userDocRef, values);
  } catch (error) {
    toast.error("An error occurred. Please try again later.");
    console.log(error, "add doc error");
  }
};

const uploadFile = async (value, fileRef) => {
  const storageRef = ref(storage, fileRef);
  const file = await uploadBytes(storageRef, value);
  const img_url = await getDownloadURL(ref(storage, file.metadata.fullPath));
  return img_url;
};

export { createUser, logInUser, getSingleDoc, addDocById, uploadFile };

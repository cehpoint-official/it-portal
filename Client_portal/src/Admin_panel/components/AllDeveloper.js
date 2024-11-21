import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase.js";
import { useQuery } from "react-query";

export const useFindAllDevelopers = () => {
  const findAllDevelopers = async () => {
    const docRef = query(
      collection(db, "Developer"),
      where("isAvailable", "==", true)
    );

    const docSnap = await getDocs(docRef);

    let devArray =[];
    docSnap?.docs.map(currDoc => {
        const data = currDoc._document.data.value.mapValue.fields;
        const id = currDoc.id
        devArray.push({data,id})
    })
    // console.log(currDoc._document.data.value.mapValue.fields)
    return devArray;
  };

  const { data: developers, isLoading } = useQuery(
    "fetchDeveloper",
    findAllDevelopers
  );

  return { developers, isLoading };
};

import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addApps,
  increaseSrDev,
  DecreaseSrDEv,
  increaseJrDev,
  DecreaseJrDEv,
  removeapps,
  increaseUiUx,
  setSrDev,
} from "../../../redux/clientSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TagsInput = () => {
  const [tags, settags] = useState([]);
  const [count, setcount] = useState(0);
  const dispatch = useDispatch();
  const [tagvalue, settagvalue] = useState("");
  const { apps, SrDev, JrDev } = useSelector((state) => state.details);

  useEffect(() => {
    const call = () => {
      console.log("hit");
      if ((count - 1) % 3 === 0) {
        dispatch(increaseSrDev());
      } else if ((count - 2) % 3 === 0) {
        dispatch(increaseJrDev());
      } else {
        dispatch(increaseUiUx());
      }
    };
    count !== 0 && call();
  }, [count]);

  const change = () => {
    if (!apps.includes(tagvalue) && tagvalue) {
      dispatch(addApps(tagvalue));
      setcount(count + 1);
    }

    settagvalue("");
  };
  const handlechange = (e) => {
    if (e.keyCode === 13) {
      change();
    }
  };
  const remove = (name) => {
    dispatch(removeapps(name));
  };
  const Tags = ({ name }) => {
    return (
      <div className="bg-cyan-800 flex justify-between items-center mx-1 rounded-full pl-4">
        <p className=" text-white whitespace-nowrap flex py-1">{name}</p>
        <button
          onClick={() => remove(name)}
          className=" text-white bg-black rounded-full w-6 h-6 flex justify-center items-center ml-2 font-semibold"
        >
          {" "}
          <ClearIcon sx={{ fontSize: "15px" }} />{" "}
        </button>
      </div>
    );
  };
  return (
    <div className="w-auto h-auto flex items-center border py-1 flex-wrap gap-1">
        {apps.map((c, i) => (
          <Tags key={i} name={c} />
        ))}
        <input
        onKeyDown={handlechange}
        className="h-auto outline-none border-none px-4 flex items-center"
        type="text"
        placeholder=" Type"
        onChange={(e) => settagvalue(e.target.value)}
        value={tagvalue}
        />
      
      <button onClick={change} className="fixed right-10">
        <AddCircleIcon />
      </button>
    </div>
  );
};

export default TagsInput;

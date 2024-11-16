import { createSlice } from "@reduxjs/toolkit";

const Clientslice = createSlice({
  name: "Details",
  initialState: {
    step: 1,
    apps: [],
    SrDev: 0,
    JrDev: 0,
    UiUx: 0,
    projectname: "",
    projectoverview: "",
    err: false,
    slide: true,
    docs: JSON.parse(localStorage.getItem("docs")) || "",
  },
  reducers: {
    enableErr: (state, action) => {
      state.err = true;
    },
    disableErr: (state, action) => {
      state.err = false;
    },
    setprojectname: (state, action) => {
      state.projectname = action.payload;
    },
    setprojectoverview: (state, action) => {
      state.projectoverview = action.payload;
    },
    setSrDev: (state, action) => {
      state.SrDev = action.payload;
    },
    increaseSrDev: (state, action) => {
      state.SrDev += 1;
    },
    DecreaseSrDEv: (state, action) => {
      state.SrDev = state.SrDev - 1;
    },
    increaseJrDev: (state, action) => {
      state.JrDev += 1;
    },
    DecreaseJrDEv: (state, action) => {
      state.JrDev = state.JrDev - 1;
    },
    increaseStep: (state, action) => {
      state.step += 1;
    },
    increaseUiUx: (state, action) => {
      state.UiUx += 1;
    },
    DecreaseUiUx: (state, action) => {
      state.UiUx = state.UiUx - 1;
    },
    decreaseStep: (state, action) => {
      state.step = state.step - 1;
    },
    addApps: (state, action) => {
      state.apps.push(action.payload);
    },
    removeapps: (state, action) => {
      const updated = state.apps.filter((c) => c !== action.payload);
      state.apps = updated;
    },
    changeSlidePos: (state, action) => {
      state.slide = true;
    },
    changeSlideNeg: (state, action) => {
      state.slide = false;
    },
    setdocs: (state, action) => {
      state.docs = action.payload;
      localStorage.setItem("userDocs", JSON.stringify(action.payload));
    },
  },
});

export const {
  DecreaseJrDEv,
  increaseJrDev,
  increaseSrDev,
  DecreaseSrDEv,
  increaseStep,
  decreaseStep,
  increaseUiUx,
  DecreaseUiUx,
  setprojectname,
  setprojectoverview,
  addApps,
  removeapps,
  setSrDev,
  enableErr,
  disableErr,
  changeSlidePos,
  changeSlideNeg,
  setdocs,
} = Clientslice.actions;
export default Clientslice.reducer;

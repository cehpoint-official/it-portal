import { createSlice } from "@reduxjs/toolkit";

const Clientslice = createSlice({
  name: "Auth",
  initialState: {
    userDataPresent: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    name: JSON.parse(localStorage.getItem("name")) || null,
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload.uid;
      state.name = action.payload.name;
      localStorage.setItem("user", JSON.stringify(action.payload.uid));
      localStorage.setItem("name", JSON.stringify(action.payload.name));
    },
    setadmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", JSON.stringify(action.payload));
    },
  },
});

export const { setuser, setadmin } = Clientslice.actions;
export default Clientslice.reducer;

import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer w-screen h-60 bg-black flex flex-col justify-center ">
      <div className=" text-white w-full flex justify-center text-2xl mb-4">
        <FacebookIcon sx={{ fontSize: "45px" }} />
        <TwitterIcon sx={{ fontSize: "45px" }} />
        <YouTubeIcon sx={{ fontSize: "45px" }} />
        <InstagramIcon sx={{ fontSize: "45px" }} />
      </div>
      <div className=" text-white w-full flex justify-center my-2 ">
        <p>Terms of Use . Privacy Policy</p>
      </div>
      <div className="text-white w-full flex justify-center">
        <p>© Copyright.All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

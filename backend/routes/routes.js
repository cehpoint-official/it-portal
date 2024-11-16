import express from "express";
import { handlerequest } from "../controller/chatgpt.js";
import { sendPdf } from "../controller/nodemail.js";

const router = express.Router();

router.post("/gpt/generate", handlerequest);
router.post("/sendpdf", sendPdf);
export default router;

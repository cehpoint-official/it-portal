import nodemailer from "nodemailer";
import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
// const sendpdf = (req, res) => {
//   console.log(req.body);
// };

export const sendPdf = (req, res) => {
  // pathToAttachment = path.join(__dirname, 'invoice.pdf')
  // attachment = fs.readFileSync(pathToAttachment).toString("base64")

  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EmailFrom,
      pass: process.env.AppPass,
    },
    tls: { rejectUnauthorized: false },
  });

  smtpTransport.sendMail(
    {
      from: process.env.EmailFrom,
      to: process.env.EmailTo,
      subject: "Pdf Generate document",
      html: `
        Testing Pdf Generate document, Thanks.`,
      attachments: [
        {
          content: req.body.string,
          filename: "invoice.pdf",
          contentType: "application/pdf",
          encoding: "base64",
        },
      ],
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send("Mail has been sended to your email. Check your mail");
      }
    }
  );
};

export default router;

// export const sendPdf = (req,res)=>{

//     pathToAttachment = path.join(__dirname, 'invoice.pdf')
//     attachment = fs.readFileSync(pathToAttachment).toString("base64")

//     let smtpTransport = nodemailer.createTransport({
//         host:'smtp.gmail.com',
//         service:'Gmail',
//         port:465,
//         secure:true,
//         auth:{
//             user:process.env.USER,
//             pass:process.env.PASSWORD
//         },
//         tls:{rejectUnauthorized:false}
//     })

//     smtpTransport.sendMail({
//         from:process.env.EMAIL,
//         to:req.body.email,
//         subject:'Pdf Generate document',
//         html:`
//         Testing Pdf Generate document, Thanks.`,
//         attachments:[
//             {
//                 content:attachment,
//                 filename:'invoice.pdf',
//                 contentType: 'application/pdf',
//                 path:pathToAttachment
//             }
//         ]
//     },function(error,info){

//         if(error){
//             console.log(error);
//         }
//         else{
//             res.send("Mail has been sended to your email. Check your mail")
//         }

//     })
// }

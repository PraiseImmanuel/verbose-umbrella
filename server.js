const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/api/email/send-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // Your Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tochimmanuel@gmail.com",
        pass: "wualzxerpoaxbhgm",
      },
    });

    // Read PDF file (adjust the path accordingly)
    const pdfFilePath = path.join(__dirname, "./Platonic_Relationship.pdf");
    const pdfAttachment = fs.readFileSync(pdfFilePath);

    const mailOptions = {
      from: "tochimmanuel@gmail.com",
      to: email,
      subject: "Purchase of Ebook Sucessfully",
      text: "Congratulations",
      attachments: [
        {
          filename: "20 Things to do before 20.pdf",
          content: pdfAttachment,
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error, email);
    res.status(500).send("Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = `${process.env.SENDGRID_API_KEY}`;
console.log("SendGrid key ", apiKey);
const app = express();
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/emails", (req, res) => {
  sgMail.setApiKey(apiKey);
  const msg = {
    to: "peiyunhite@gmail.com",
    from: "ollylee8520@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => console.log("send mail success"))
    .catch(console.log);
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

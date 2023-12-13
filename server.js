const express = require("express");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = `${process.env.SENDGRID_API_KEY}`;
const bodyParser = require("body-parser");
console.log("SendGrid key ", apiKey);
const app = express();
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/emails", (req, res) => {
  sgMail.setApiKey(apiKey);
  const data = req.body;
  console.log("data!!!!!!!!", data);
  const msg = {
    to: data.to,
    from: "ollylee8520@gmail.com",
    subject: data.subject,
    text: data.body,
    html: `<strong>${data.body}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => console.log("send mail success"))
    .catch(console.log);
  res.send({
    express: "Your Email send",
    msg: {
      to: data.to,
      from: "ollylee8520@gmail.com",
      subject: data.subject,
      text: data.body,
      html: `<strong>${data.body}</strong>`,
    },
  });
});

const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 8082; 

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/emails", (req, res) => {
    
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
}); 

const express = require("express");
const app = express();

const authRoute = require("./routes/auth");

app.use(express.json());
app.use(authRoute);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

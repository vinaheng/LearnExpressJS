const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const route = require("./routes");
const db = require("./config/db");
// connect to DB
require('dotenv').config();
db.connect();
const app = express();
// set path public
app.use(express.static(path.join(__dirname, "public")));
// config body parametes re.body query parameters use req.query
app.use(
  express.urlencoded({
    extended: true,
  })
);
//
app.use(express.json());
//hTTP Logger;
app.use(methodOverride("_method"));
// app.use(morgan("combined"));
// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sub:(a, b) => a - b,
      eq: (a,b) => Number(a)==Number(b),
      formatDate:(dateString)=>{
        const date = new Date(dateString);
        const formattedDate = `${date.getUTCFullYear()}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCDate().toString().padStart(2, '0')}`;
        // Format time to "hh:mm AM/PM" format
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${(hours % 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
        
        // Combine date and time
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        return formattedDateTime
      },
          
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// Router

route(app);
app.listen(process.env.PORT, () => {
  console.log(`app listening on port: localhost:${process.env.PORT}`);
});

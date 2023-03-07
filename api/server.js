const cors = require ("cors");
const exp = require("express");
const bp = require("body-parser");
const { success, error } = require("consola");
const {connect} = require("mongoose");

// Bring in the app constants
const { DB, PORT } = require("./config/connect");

// Initialize the application
const app = exp();


// Middlewares
app.use(cors());
app.use(bp.json());

const startApp = async () => {
    try {
      // Connection With DB
      await connect(DB);
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true
      });
  
      // Start Listenting for the server on PORT
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );
    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true
      });
      startApp();
    }
  };
  
  startApp();
 
  
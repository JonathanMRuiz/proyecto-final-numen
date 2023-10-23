const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

//Middleware

//Rutas

const postMovie = require("./routes/PostMovie");
const getMovies = require("./routes/GetMovies");
const editMovie = require("./routes/UpdateMovie");
const deleteMovie = require("./routes/DeleteMovie");
const signup = require("./routes/Signup");
const signin = require("./routes/Signin");
const auth = require("./middlewares/auth");

mongoose
  .connect(
    "mongodb+srv://jonathanruiz:maniydante96@cluster0.qcpxv.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Cluster0");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Cluster0", error);
  });

app.use(express.json());

// Rutas

app.use("/user", signup);
app.use("/user", signin);
app.use("/movies", auth, postMovie);
app.use("/movies", auth, getMovies);
app.use("/movies", auth, editMovie);
app.use("/movies", auth, deleteMovie);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

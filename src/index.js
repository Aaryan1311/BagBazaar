import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectToDB from "./config/dbConnection.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import apiRoutes from "./routes/index.js"
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("combined"));
app.use(cookieParser());

connectToDB();

app.use(
  cors({ 
    origin: [process.env.FRONTEND_URL],
    credentials: true, 
  }) 
);

app.use('/api', apiRoutes);

app.all("*", (req, res) => {
  res.status(200).send("<div>OOPS! 404 page not found</div>");
});

app.use(errorMiddleware); 
 
app.listen(process.env.PORT, async () => {
    console.log(`App is running at http://localhost:${process.env.PORT}`)
})
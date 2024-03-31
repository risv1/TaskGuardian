import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
  adminRoutes,
  managerRoutes,
  router,
  userRoutes,
} from "./src/routes/routes";
import { config } from "dotenv";

config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);
app.use(userRoutes);
app.use(managerRoutes);
app.use(adminRoutes);

const port = process.env.PORT!
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

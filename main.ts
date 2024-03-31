import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router } from './src/routes/user.routes';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router)

const port = 8000
app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})

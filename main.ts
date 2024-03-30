import express from 'express';
import bodyParser from 'body-parser';
import { router } from './src/routes/user.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

const port = 8000
app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})

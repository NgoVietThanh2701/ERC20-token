import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { router } from "./routes/APIRoute.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);
app.listen(port, () => {
   console.log('server running on http://localhost:' + port)
});

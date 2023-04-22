import express from 'express';
import { loginController } from './controller/loginController';

const app = express();

app.get('/arqinfo/login', loginController)
app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})
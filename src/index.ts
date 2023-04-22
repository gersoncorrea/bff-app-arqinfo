import express from 'express';
import { forgotController, loginController, signupController } from './controller/auth.controller';

const app = express();

app.get('/arqinfo/login', loginController)
app.get('/arqinfo/signup', signupController)
app.get('/arqinfo/recover', forgotController)

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})
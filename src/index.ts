import express from 'express';
import { forgotController, loginController, signupController, signupUserController, signinUserController } from './controller/auth.controller';
import { checkToken } from './controller/middleware';
import bodyParser from 'body-parser';
import { homeController } from './controller/home.controller';

const app = express();

app.use(bodyParser.json())
app.get('/arqinfo/login', loginController)
app.post('/arqinfo/login', signinUserController)
app.get('/arqinfo/signup', signupController)
app.post('/arqinfo/signup', signupUserController)
app.get('/arqinfo/recover', forgotController)
app.get('/arqinfo/home',checkToken,homeController)

app.use(bodyParser.json)
app.listen(3000,()=>{
  console.log('Server listening on port 3000')
})



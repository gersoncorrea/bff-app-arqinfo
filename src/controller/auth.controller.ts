import { Request, Response } from 'express';

import { getForgotPassScreen, getLogin, getSignUpScreen, signInUser, signUpUser } from '../auth.screen';
import { Login } from '../model/login.dto';

export function loginController(req: Request, res: Response){
    getLogin((err,data)=>{
        if(err){
            return res.status(500).json({error: 'Error reading login.json file'})
        } else {
            return res.status(200).json(JSON.parse(data))
        }
    })
}

export function forgotController(req: Request, res: Response){
    getForgotPassScreen((err,data)=>{
        if(err){
            return res.status(500).json({error: 'Error reading login.json file'})
        } else {
            return res.status(200).json(JSON.parse(data))
        }
    })
}

export function signupController(req: Request, res: Response){
    getSignUpScreen((err,data)=>{
        if(err){
            return res.status(500).json({error: 'Error reading login.json file'})
        } else {
            return res.status(200).json(JSON.parse(data))
        }
    })
}

export function signupUserController(req: Request, res: Response){
    signUpUser(req,(err,data)=>{
        if(err){
            return res.status(500).json({error: 'Error reading login.json file'})
        } else {
            return res.status(200).json({"hash":data})
        }
    })
}

export function signinUserController(req: Request, res: Response){
    let loginCredential:Login = req.body
    signInUser(loginCredential.email,loginCredential.password,(err,data)=>{
        if(err){
            return res.status(500).json({error: err.message})
        } else {
            return res.status(200).json({"token":data})
        }
    })
}

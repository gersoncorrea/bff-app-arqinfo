import { Request, Response } from 'express';

import { getForgotPassScreen, getLogin, getSignUpScreen, signUpUser } from '../auth.screen';

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

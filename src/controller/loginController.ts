import { Request, Response } from 'express';

import { getLogin } from '../login.screen';

export function loginController(req: Request, res: Response){
    getLogin((err,data)=>{
        if(err){
           return res.status(500).json({error: 'Error reading login.json file'})
        } else {
           return res.status(200).json(JSON.parse(data))
        }
    })
}
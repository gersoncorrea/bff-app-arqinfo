import { NextFunction, Request, Response } from "express";

export function checkToken(req: Request, res:Response, next:NextFunction){
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if(token){
    next()
  } else{
    return res.status(400).send({
      "error":true,
      "message":"no token provided"
    })
  }

}
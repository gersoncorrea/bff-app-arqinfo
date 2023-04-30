import { getHome } from "../home.screen"
import { Response } from "express"

export function homeController(res: Response){
  getHome((err,data)=>{
      if(err){
         return res.status(500).json({error: 'Error reading login.json file'})
      } else {
         return res.status(200).json(JSON.parse(data))
      }
  })
}
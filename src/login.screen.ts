import * as fs from 'fs'
import path from 'path'
export function getLogin(callback: (err: NodeJS.ErrnoException | null, data: string)=>void){
    const filePath = path.join(__dirname,'raw','login.screen.json')
    fs.readFile(filePath,'utf-8',callback)
}
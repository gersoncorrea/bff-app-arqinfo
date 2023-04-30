import * as fs from 'fs'
import path from 'path'
export function getHome(callback: (err: NodeJS.ErrnoException | null, data: string)=>void){
    const filePath = path.join(__dirname,'raw','home.screen.json')
    fs.readFile(filePath,'utf-8',callback)
}
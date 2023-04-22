import * as fs from 'fs'
import path from 'path'
export function getLogin(callback: (err: NodeJS.ErrnoException | null, data: string)=>void){
    const filePath = path.join(__dirname,'raw','login.screen.json')
    fs.readFile(filePath,'utf-8',callback)
}

export function getForgotPassScreen(callback: (err: NodeJS.ErrnoException | null, data: string)=>void){
    const filePath = path.join(__dirname,'raw','forgotpass.screen.json')
    fs.readFile(filePath,'utf-8',callback)
}

export function getSignUpScreen(callback: (err: NodeJS.ErrnoException | null, data: string)=>void){
    const filePath = path.join(__dirname,'raw','signup.screen.json')
    fs.readFile(filePath,'utf-8',callback)
}
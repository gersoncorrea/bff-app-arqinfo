import { json } from 'body-parser'
import { Request } from 'express'
import * as fs from 'fs'
import { promises } from 'fs'
import { writeFile } from 'fs/promises'
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

export function signUpUser(req:Request, callback: (err: NodeJS.ErrnoException | null, data: String | null)=>void){
    const filePath = path.join(__dirname,'raw','user.data.json')
    interface User{
        user: String,
        email: String,
        password: String
    }
    const userItem:User = req.body
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error('Error writing to file', err)
            callback(err,null);
            return;
        }
        let items: User[] = []
        try{
            items = JSON.parse(data)
            var existUser = items.filter( element =>element.email == userItem.email)
            if(existUser){
                callback(null,"already exist")
                return
            }
            
        } catch(e){
            callback
            return;
        }
        items.push(userItem)
        fs.writeFile(filePath,JSON.stringify(items),err=>{
            if(err){
                console.error('Error writing to file ', err)
            }
            callback(null,"ahusdihasudhi")
        })
    }) 
}
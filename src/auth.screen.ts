import { Request } from 'express'
import * as fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { User } from './model/user.model'
import { Token } from './model/token.model'
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
 
    const userDto:UserDto = req.body
    let saveUser:User = new User()
    saveUser.name = userDto.name
    saveUser.email = userDto.email
    let currentPassword: string = userDto.password
    let salt = randomSalt()
    let hash = crypto.pbkdf2Sync(currentPassword, salt,  
        1000, 64, `sha512`).toString(`hex`);
    saveUser.salt = salt
    saveUser.hash = hash
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            callback(err,null);
            return;
        }
        let items: User[] = []
            if(data != ''){
                items = JSON.parse(data)
            }
            if(data != '' && checkEmailAlreadyExist(userDto.email,items)){
                callback(null,"Usuario ja existe")
                return
            } else {
                items.push(saveUser)
                fs.writeFile(filePath,JSON.stringify(items),err=>{
                    if(err){
                        callback(err,null)
                        return
                    }
                    callback(null,"Usuario Criado")
                    return
                })
            }
    }) 
}

export function signInUser(loginEmail:string, loginPassword:string, callback: (err: NodeJS.ErrnoException | null, data?: String | null)=>void){
    const filePath = path.join(__dirname,'raw','user.data.json')
 
    
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error('Error reading to file', err)
            callback(err,null);
            return;
        }
        let items: User[] = []
        try{
            items = JSON.parse(data)
            let signCredential = validateCredential(loginEmail,loginPassword,items)
            if(signCredential == undefined){
                callback(new Error('Erro nas credenciais'))
                return
            } else {
                
                if( saveToken(signCredential) == true){
                    callback(null,signCredential)
                    return
                } else {
                    callback(new Error('Erro ao salvar hash'))
                }
            }
            
        } catch(e){
            callback
            return;
        }
        
    }) 
}

function saveToken(token: string):boolean{
    const filePath = path.join(__dirname,'raw','user.token.json')
 
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error('Error reading to file', err)
            return false;
        }
        let tokens: Token[] = []
        if(data != ''){
            tokens = JSON.parse(data)
        } 
        let currentUserToken:Token = new Token()
        if(tokens.length == 0){
            currentUserToken.id = 1;
        } else {
            currentUserToken.id = tokens[tokens.length-1].id+1
        }
        currentUserToken.token = token
        tokens.push(currentUserToken)
        fs.writeFile(filePath,JSON.stringify(tokens),err=>{
            if(err){
                return false
            }
        })
    })
    return true;
}

function checkEmailAlreadyExist(email:string, itemsData: User[]):boolean{
    return itemsData.some(search => search.email == email);
 }

function getUserByEmail(email:string, itemsData: User[]):User|undefined{
   return itemsData.find(search => search.email == email);
}

function validateCredential(email: string, password: string, itemsData: User[]):string|undefined{
     
        let currentUser = getUserByEmail(email,itemsData)
        if(currentUser== undefined){
            return undefined
        }
        else {
            let salt = currentUser.salt
            let currentHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            if(currentHash == currentUser.hash){
                return randomSalt()
            } else {
                undefined
            }
        }
}

function randomSalt(){
    return crypto
.randomBytes(16)
.toString('base64')
.slice(0, 16)
}
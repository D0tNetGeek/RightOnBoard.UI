import { Injectable } from '@angular/core';

@Injectable()
export class BrowserStorageService {
    
    getSession(key: string): any {       
        
        //console.info("Browser Storage Service : Getting Session Key : ", key);

        const data = window.sessionStorage.getItem(key);

        //console.info("Browser Storage Service : Getting Session Data : ", data);

        if(data){
            return JSON.parse(data);
        }
        else{
            return null;
        }
    }

    setSession(key: string, value: any): void{

        const data = value === undefined ? "" : JSON.stringify(value);
        window.sessionStorage.setItem(key, data);
    }

    removeSession(key: string): void {
        window.sessionStorage.removeItem(key);
    }

    removeAllSessions(): void {
        
        for(const key in window.sessionStorage){
            if(window.sessionStorage.hasOwnProperty(key)){
                this.removeSession(key);
            }
        }
    }

    getLocal(key: string): any {
        
        //console.info("Browser Storage Service : Getting Local Key : ", key);

        const data = window.localStorage.getItem(key);

        if(data){
            return JSON.parse(data);
        }
        else{
            return null;
        }
    }

    setLocal(key: string, value: any): void{

        const data = value === undefined ? "" : JSON.stringify(value);
        window.localStorage.setItem(key, data);
    }

    removeLocal(key: string): void {
        window.localStorage.removeItem(key);
    }

    removeAllLocals(): void {
        
        for(const key in window.sessionStorage){
            if(window.localStorage.hasOwnProperty(key)){
                this.removeLocal(key);
            }
        }
    }
}
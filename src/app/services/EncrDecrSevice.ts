import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }
  //The set method is use for encrypt the value.
  set(keys:any, value:any){
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), keys.toString());

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys:any, value:any){
    var decrypted = CryptoJS.AES.decrypt(value, keys.toString());

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

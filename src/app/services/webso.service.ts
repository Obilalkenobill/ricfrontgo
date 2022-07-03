import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class WebsoService {
UserId!:any;
UserLogin!:any;
ws!:any;
  constructor(private jwt: JwtHelperService) {

    let token=localStorage.getItem('id_token');
  if (typeof token == 'string') {
    this.UserId=this.jwt.decodeToken(token).id;
    this.UserLogin=this.jwt.decodeToken(token).login;
  }
  if (this.ws && this.ws.readyState === 3 ) {
    this.ws.close();
this.ws=new  WebSocket('ws://localhost:5000');
    // wait until new connection is open
    while (this.ws.readyState !== 1) {
      this.timWss();
    }
} else {
this.ws=new  WebSocket('ws://localhost:5000');
} }


async timWss(){
  await new Promise(r => setTimeout(r, 250));
}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/userLogin.model';
import { ProjetService } from './projet.service';
import { ServerService } from './server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: any;
  redirectUrl: string;
  UserId: any;

  constructor(private location: Location, private httpC: HttpClient,private http: ServerService, private router: Router, private projetService: ProjetService, private jwt: JwtHelperService)
  {
    this.isLoggedIn = localStorage.getItem('id_token') != null;
    this.redirectUrl = '/';
  }

  public getCurrentUser(): User
  {
      let token=localStorage.getItem('id_token');

      let roles!:any;
      let id!:any;
      let is_verified!:number;
      if(typeof token == 'string'){
      roles = this.jwt.decodeToken(token)?.roles;
        id = this.jwt.decodeToken(token)?.id;
        is_verified = this.jwt.decodeToken(token)?.is_verified;
      }
      let userbis;
      try{
      userbis = JSON.parse(localStorage.getItem('user') || '');}
      catch{}
      const newUser = new User({
        roles : roles,
        id : id,
        is_verified : is_verified,
        username : userbis?.username
      });
      const user:User=(newUser);
  return user;
  }

  public updateCurrentUser(user: User)
  {
    if(!user.password)
    {
      let oldUser = JSON.parse(localStorage.getItem('user') || '')
      user.roles = oldUser.roles;
    }
    localStorage.setItem('user', JSON.stringify(user));
  }
  public IsUserProjet(projetId:any,UserId:any){
    return this.projetService.getOneByID(projetId).subscribe(m=>{
      if(m?.personne_id_id==UserId)
      {
        return true;
      }
      else {
        return false;
      }
    })
      }
  public login(user: User): Observable<boolean>
  {
    return this.http.login(user).pipe(
      map(res =>
        {
          this.isLoggedIn = res;
          return res;
        })
    );
  }

  public logout(UserId:any,status:any=true): void// le parametre status se trouve par est-ce l'utilisateur qui décide de se logout lui même, dans ce cas nous effacons sa session. Sinon nous le metton hors ligne et nous gardons sa session active.
  {
    if (status){
    this.isLoggedIn = false;}
    const token =  localStorage.getItem('token');
  const headers2 = new HttpHeaders()
   .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
   this.httpC.put('https://gestion2vote.herokuapp.com/api/users/setOnline/'+ UserId +'/0',  {'headers':headers2}).subscribe(()=>{ this.router.navigate(['/']);;});
   if(status){
   this.http.logout();
    this.redirectUrl = '/';
    this.router.navigate(['/']);
   }
  }
}

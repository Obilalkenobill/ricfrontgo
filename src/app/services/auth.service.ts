import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/userLogin.model';
import { ProjetService } from './projet.service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: any;
  redirectUrl: string;

  constructor(private http: ServerService, private router: Router, private projetService: ProjetService, private jwt: JwtHelperService)
  {
    this.isLoggedIn = sessionStorage.getItem('id_token') != null;
    this.redirectUrl = '/';
  }

  public getCurrentUser(): User
  {
      let token=sessionStorage.getItem('id_token');

      let roles!:any;
      let id!:any;
      let is_verified!:number;
      if(typeof token == 'string'){
      roles = this.jwt.decodeToken(token)?.roles;
        id = this.jwt.decodeToken(token)?.id;
        is_verified = this.jwt.decodeToken(token)?.is_verified;
      }

      const user = new User({
        roles : roles,
        id : id,
        is_verified : is_verified
      });
      const follow:User=(user);
  console.log(user);
  return user;
  }

  public updateCurrentUser(user: User)
  {
    if(!user.password)
    {
      let oldUser = JSON.parse(sessionStorage.getItem('user') || '')
      user.roles = oldUser.roles;
    }
    sessionStorage.setItem('user', JSON.stringify(user));
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

  public logout(): void
  {
    this.isLoggedIn = false;
    this.http.logout();
    this.redirectUrl = '/';
    this.router.navigate(['/']);
  }
}

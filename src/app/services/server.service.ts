import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Models/userLogin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, flatMap, map } from 'rxjs/operators';
import { EncrDecrService } from './EncrDecrSevice';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private BASE_URL: string = 'https://gestion2vote.herokuapp.com/api/';
  /**
     * Instance privée de ce helper qui nous aidera à vérifier si
     * un token est expiré ou non.
     */
headers!:any;
  constructor(private http: HttpClient, private jwt: JwtHelperService,
    private EncrDecr: EncrDecrService)
  {
  }

  public get<T>(url: string, secure: boolean = true): Observable<any>
  {
    if(secure){
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    }
    return this.call(() =>{
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    };
     return this.http.get(this.BASE_URL + url, {'headers':headers})});
   }
   else
   {
     return this.http.get(this.BASE_URL + url);
   }
}

  public post<T>(url: string, body: T, secure:boolean=true): Observable<any>
  {
    if(secure){
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    }
    return this.call(() =>{
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    };
    return  this.http.post(this.BASE_URL + url, body,  {'headers':headers})});
   }
   else{
    return this.http.post(this.BASE_URL + url, body);
   }
}


public postbis<T>(url: string, body: T, secure:boolean=true): Observable<any>
{
  if(secure){
    let token=localStorage.getItem('id_token');
    let headers = new HttpHeaders();
if (typeof token === 'string'){
   headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token ).set( 'method' , 'POST').set('Access-Control-Allow-Origin','*');
  }
  return this.call(() =>{
    let token=localStorage.getItem('id_token');
    let headers = new HttpHeaders();
if (typeof token === 'string'){
   headers = new HttpHeaders()
   .set( 'method' , 'POST').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
  };
  return  this.http.post(this.BASE_URL + url, body,  {'headers':headers})});
 }
 else{
  return this.http.post(this.BASE_URL + url, body);
 }
}


  public put<T>(url: string,body?: T): Observable<any>
  {
    let token=localStorage.getItem('id_token');
    let headers = new HttpHeaders();
if (typeof token === 'string'){
   headers = new HttpHeaders()
    .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
  }
    return this.call(() =>{
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    }
      return this.http.put(this.BASE_URL + url, body,  {'headers':headers});
    });
  }

  public delete<T>(url: string, body: any): Observable<any>
  {
    return this.call(() => this.http.delete(this.BASE_URL + url, body));
  }
  public deletebis<T>(url: string): Observable<any>
  {
    let token=localStorage.getItem('id_token');
    let headers = new HttpHeaders();
if (typeof token === 'string'){
   headers = new HttpHeaders()
    .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
  }
    return this.call(() => {
      let token=localStorage.getItem('id_token');
      let headers = new HttpHeaders();
  if (typeof token === 'string'){
     headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
    };
  return  this.http.delete(this.BASE_URL + url, {'headers':headers})
      })
  }



  public login(user: User): Observable<any>
  {
    const headers = new HttpHeaders()
   .set('content-type', 'application/json').set('Access-Control-Allow-Origin','*')

    return this.http.post<any>(this.BASE_URL + 'login_check', user, {'headers':headers}).pipe(
      map((data: any) => {
        if(data.token)
        {
          const token = data.token;
          user.password=this.EncrDecr.set('!4379^D&JWBfbve;}iqJ5^9H7',user.password);
          user.roles=this.jwt.decodeToken(data.token).roles;
          user.id=this.jwt.decodeToken(data.token).id;
          user.login=this.jwt.decodeToken(data.token).login;
          localStorage.setItem("id"+JSON.stringify(user.id), JSON.stringify(user.id));
          user.is_verified=this.jwt.decodeToken(data.token).is_verified;
          user.roles=this.EncrDecr.set('gs,D]5W8Exct=7^6Hm3Dq#nrP',user.roles);
          user.id=this.EncrDecr.set('gs,D]5W8Exct=7^6Hm3Dq#nrP',user.id);
          user.login=this.EncrDecr.set('gs,D]5W8Exct=7^6Hm3Dq#nrP',user.login)
          user.is_verified=this.EncrDecr.set('lutilisateurnedoitpasconnaitrecemotdepasse',user.is_verified);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('id_token', token);

          return true;
        }
        return false;
      }),  catchError((res: any) =>
      {
        if (res.error.message)
        {return of(res.error.message);}
        else
        return of(res);
      })
  );
}
  /**
     * Le but de la méthode call() est de préalablement vérifier si le token existe
     * et s'il n'est pas expiré. S'il est expiré, elle en redemande un nouveau. Ensuite
     * elle exécute la fonction lambda (func) qu'elle a reçue en paramètre et qui, elle,
     * fait réellement appel au serveur via AuthHttp. De cette manière, on peut appeler
     * les méthodes ci-dessus sans se préoccuper de vérifier si le token est encore
     * valide. Cette vérification est faite de manière automatique et transparente pour
     * le code qui utilise ce service.
     */
   private call<T>(func: any): Observable<any> {
    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('id_token');
    // Si le token n'existe pas ou s'il est expiré ...
    if (!token || this.jwt.isTokenExpired(token)) {
      let user = JSON.parse(localStorage.getItem('user') || '');

      user.password = this.EncrDecr.get('!4379^D&JWBfbve;}iqJ5^9H7',user.password);

      const headers = new HttpHeaders()
      .set('content-type', 'application/json').set('Access-Control-Allow-Origin','*');
      return this.http.post<any>(this.BASE_URL + 'login_check', user, {'headers':headers}).pipe(
        flatMap((data: any) => {
          if(data.token)
          {

            const token = data.token;
            // localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('id_token', token);

          }
          return func();
        }), catchError((res: any) =>
          {
            return func();
          })
      );
    } else {
      let UserId;
      if (typeof token === 'string' ){
        UserId=this.jwt.decodeToken(token).id;
        const headers2 = new HttpHeaders()
         .set('content-type', 'application/json').set('Authorization', 'Bearer ' + token ).set('Access-Control-Allow-Origin','*');
         this.http.put(this.BASE_URL +'users/setOnline/'+ UserId +'/1',  {'headers':headers2}).subscribe();
        }
        // si le token est valide et n'est pas expiré, on peut directement
        // faire appel à l'API protégée
        return func();
    }
}
public logout(): void
{
  localStorage.removeItem('user');
  localStorage.removeItem('id_token');
}
}

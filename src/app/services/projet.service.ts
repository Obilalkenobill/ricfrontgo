import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Commentaire } from '../Models/commentaire.model';
import { Follow } from '../Models/follow.model';
import { Projet } from '../Models/projet.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  constructor(private server: ServerService) { }

  public addProjet(projet: Projet):  Observable<Projet[]> 
  {
    return this.server.post<Projet>('projet/create', projet).pipe(
      map(res => res),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public addFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/create/follow', follow).pipe(
      map(res => {console.log(res);return res}),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public addCommentaire(comment: Commentaire):  Observable<Commentaire[]> 
  {
    return this.server.post<Commentaire>('projet/create/comment', comment).pipe(
      map(res => {console.log(res);return res}),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public unFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/delete/follow', follow).pipe(
      map(res => {console.log(res);return res}),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public isFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/get/follow', follow).pipe(
      map(res =>{console.log(res);return res}),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public getOneByID(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/'+ id).pipe(
      map(res => res.length > 0 ? new Projet(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getCommentByProjetID(id: any): Observable<Commentaire[]| null> 
  {
    return this.server.get<Commentaire>('projet/comment/byProjetID/'+ id).pipe(
      map(res =>{
        console.log(res) ;
        return res.commentaires;
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public getProjetByUserId(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/byUser/'+ id).pipe(
      map(res =>{
        console.log(res) ;
        return res;
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getProjetByFollowerID(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/byFollower/'+ id).pipe(
      map(res =>{
        console.log(res) ;
        return res;
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public getAll(): Observable<Projet[]> 
  {
    return this.server.get<Projet[]>('projet/readAll').pipe(
      
      map(res =>{
        console.log(res.projets) ;
        return res.projets.map((m: Projet) => new Projet(m));
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
  public deleteProjet(id:any): Observable<Projet[]>
  {
    return this.server.deletebis<Projet>('projet/delete/'+ id).pipe(
      map(res => res.map((m: any) => new Projet(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  // public getOneByID(id: any): Observable<Role | null> 
  // {
  //   return this.server.get<Role>('role/'+ id).pipe(
  //     map(res => res.length > 0 ? new Role(res[0]) : null),
  //     catchError(err => 
  //       {
  //         console.error(err);
  //         return [];
  //       })
  //   );
  // }

  // public getRoleUserByID (rolePers:RolePers):  Observable<RolePers>  
  //   {
  //     return this.server.post<RolePers>('roleUserById', rolePers).pipe(
  //       map(res => {
  //         console.log(res);
  //         return res
  //       }),
  //       catchError(err => 
  //         {
  //           console.error(err);
  //           return [];
  //         })
  //     );
  //   }
  //   public deleteRolePers(rolePers: RolePers): Observable<RolePers[]>
  //   {
  //     return this.server.post<RolePers>('delete/role', rolePers).pipe(
  //       map(res => res.map((m: any) => new RolePers(m))),
  //       catchError(err => 
  //         {
  //           console.error(err);
  //           return [];
  //         })
  //     );
  //   }
  //   public deleteRolePersRole(rolePers: RolePers): Observable<RolePers[]>
  //   {
  //     return this.server.post<RolePers>('delete/role/role', rolePers).pipe(
  //       map(res => res.map((m: any) => new RolePers(m))),
  //       catchError(err => 
  //         {
  //           console.error(err);
  //           return [];
  //         })
  //     );
  //   }
}

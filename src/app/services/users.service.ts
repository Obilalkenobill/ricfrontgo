import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Groupe } from '../Models/group.model';
import { Message } from '../Models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private server: ServerService)
  {}


  public getAmiSearch(search_txt:any,UserId:any): Observable<User[]>
  {
    return this.server.get<User[]>('personne/searchCont/'+search_txt+'/'+UserId).pipe(

      map(res =>{
        return res[0].map((m: any) => new User(m));
      },
      catchError(err =>
        {

          return [];
        })
    ));
  }


  public getAll(): Observable<User[]>
  {
    return this.server.get<User[]>('personne/all').pipe(

      map(res =>{
        return res.Personnes.map((m: any) => new User(m));
      },
      catchError(err =>
        {

          return [];
        })
    ));
  }


  public getAllbis(UserId:number): Observable<User[]>
  {
    return this.server.get<User[]>('personne/contact/'+UserId).pipe(

      map(res =>{
        return res.Personnes.map((m: any) => new User(m));
      },
      catchError(err =>
        {

          return [];
        })
    ));
  }
public addContact(UserId1:any,UserId2:any){
  return this.server.put('personne/invitation/'+UserId1+'/'+UserId2).pipe(

    map(res => {return []}),
    catchError(err =>
      {

        return [];
      })
  );
}
public accepter_invit(UserId1:any,UserId2:any){
  return this.server.put('personne/invitation/accepter/'+UserId1+'/'+UserId2).pipe(

    map(res => {return []}),
    catchError(err =>
      {

        return [];
      })
  );
}

public retirer_ami(UserId1:any,UserId2:any){
  return this.server.put('personne/contact/retirer/'+UserId1+'/'+UserId2).pipe(

    map(res => {return []}),
    catchError(err =>
      {

        return [];
      })
  );
}
  public getInvitation(UserId:any): Observable<User[]>
  {
    return this.server.get<User[]>('personne/invitation/'+UserId).pipe(

      map(res =>{

        return res.Personnes.map((m: any) => new User(m));
      },
      catchError(err =>
        {

          return [];
        })
    ));
  }



  public getMessageByGroupeID(Groupe_ID:any,User_id:any):Observable<Message[]>{
    return this.server.get<Message[]>('personne/message_by_group/'+Groupe_ID+'/'+User_id).pipe(
      map(res =>{
        return res[0].map((m: any) => new Message(m));
      },
      catchError(err =>
        {
          return [];
        })
    ));
  }


  public addMessage(message: Message):  Observable<Message[]>
  {
    return this.server.post<Message>('personne/send/message', message).pipe(
      map(res => {;return res}),
      catchError(err =>
        {

          return [];
        })
    );
  }
  public getAmi(UserId:any): Observable<User[]>
  {
    return this.server.get<User[]>('personne/ami/'+UserId).pipe(

      map(res =>{

        return res.Personnes.map((m: any) => new User(m));
      },
      catchError(err =>
        {

          return [];
        })
    ));
  }

  public getGroupMessage(UserId:any):Observable<Groupe[]>{
    return this.server.get<Groupe[]>('personne/group/'+UserId).pipe(
      map(res =>{
        return res[0].map((m: any) => new Groupe(m));
      },
      catchError(err =>
        {
          return [];
        })
    ));
  }
  public openConvers(group_id:any):Observable<Groupe[]>{
    return this.server.get<Groupe[]>('personne/groupConvers/'+group_id).pipe(
      map(res =>{
        return res[0].map((m: any) => new Groupe(m));
      },
      catchError(err =>
        {
          return [];
        })
    ));
  }
  public voirPartic(group_id:any):Observable<User[]>{
    return this.server.get<User[]>('personne/voirMessPartic/'+group_id).pipe(
      map(res =>{
        return res[0].map((m: any) => new User(m));
      },
      catchError(err =>
        {
          return [];
        })
    ));
  }
  public getOneByID(id: any): Observable<User | null>
  {
    return this.server.get<User>('users/id/'+ id).pipe(
      map(res => res.length > 0 ? new User(res[0][0]) : null),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public getOneByName(name: string): Observable<User | null>
  {
    return this.server.get<User>('users/name/'+ name).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public getOneByEmail(email: string): Observable<User | null>
  {
    return this.server.get<User>('users/email/'+ email).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public addUser(user: User):  Observable<User[]>
  {
    return this.server.post<User>('register', user).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err =>
        {

          return [];
        })
    );
  }
  public validateUser(data: any):  Observable<User[]>
  {
    return this.server.postbis<any>('personne/imageverif', data).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public createGroup(data: any,param: any):  Observable<User[]>
  {
    return this.server.postbis<any>('personne/creategroup/'+param, data).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }


  public updateUser(user: User): Observable<User | null>
  {
    return this.server.put<User>('users/'+ user.id, user).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err =>
        {

          return [];
        })
    );
  }
 public ajouter_nvo_o_group(userid:any,group_actif:any): any
  {
    return this.server.put<any>('personne/groupes/ajouter_part/'+ userid+'/'+group_actif).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public retirer_part_group(userid:any,group_actif:any): any
  {
    return this.server.deletebis<any>('personne/groupes/retirer_part/'+ userid+'/'+group_actif).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }
  public deleteUser(id:number): Observable<User[]>
  {
    return this.server.deletebis<User>('users/delete/'+ id).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err =>
        {

          let err1!:any[];
          err1[1]=err;
          return err1;
        })
    );
  }

  public validate(id:number){
    return this.server.put('users/validate/'+ id).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public setOnline(id:number,status:number){
    return this.server.put('users/setOnline/'+ id +'/'+status).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public dissoudreGroupe(group_id:number){
    return this.server.deletebis('personne/groupes/delete/'+group_id).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    )
  }

  public elireAdminGroupe(user_id:number,group_id:number){
    return this.server.put('personne/groupes/elire/'+group_id+'/'+user_id).pipe(
      map(res => res),
      catchError(err =>
        {
          return [];
        })
    )
  }

}

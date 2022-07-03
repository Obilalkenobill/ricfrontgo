import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';
import { catchError, map } from 'rxjs/operators';
import { SignalCommentaire } from '../Models/signal_commentaire.model';


@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor(private server: ServerService) { }


  public getAllSignComm(): Observable<SignalCommentaire[]>
  {
    return this.server.get<SignalCommentaire[]>('projet/get/comment/signal').pipe(

      map(res =>{
        return res.map((m: SignalCommentaire) => new SignalCommentaire(m));
      }),
      catchError(err =>
        {

          return [];
        })
    );
  }

  public addSignalComm(id_comm:any,status:any): any
  {
    return this.server.put('projet/signal_act/comment/'+id_comm+'/'+status).pipe(
      map(res => res),
      catchError(err =>
        {

          return [];
        })
    );
  }
}

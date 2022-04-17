import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-mat-participant',
  templateUrl: './mat-participant.component.html',
  styleUrls: ['./mat-participant.component.scss']
})
export class MatParticipantComponent implements OnInit {
ListUsers!:User[];
curr_user!:any;
user_init!:any;
  constructor(public dialogRef: MatDialogRef<MatParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ListUsers=data.data;
      this.curr_user=data.curr_user;
      this.user_init=data.user_init;
    }

  ngOnInit(): void {

  }
  retirer_part_group(userid:any,group_actif:any){

  }
}

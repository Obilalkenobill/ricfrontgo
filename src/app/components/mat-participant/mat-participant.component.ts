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
  constructor(public dialogRef: MatDialogRef<MatParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]) {
      this.ListUsers=data;
    }

  ngOnInit(): void {

  }
  retirer_part_group(userid:any,group_actif:any){

  }
}

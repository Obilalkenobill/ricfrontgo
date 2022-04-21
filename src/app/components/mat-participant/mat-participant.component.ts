import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-mat-participant',
  templateUrl: './mat-participant.component.html',
  styleUrls: ['./mat-participant.component.scss']
})
export class MatParticipantComponent implements OnInit {
ListUsers!:User[];
curr_user!:any;
user_init!:any;
group_id!:any;
  constructor(private userService: UsersService,public dialogRef: MatDialogRef<MatParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ListUsers=data.data;
      this.curr_user=data.curr_user;
      this.user_init=data.user_init;
      this.group_id=data.group_id;
    }

  ngOnInit(): void {

  }
  refresh(){
  this.userService.voirPartic(this.group_id).subscribe((response) => {
   this.ListUsers=response;
  },
  (err) => {
  },
  () => {
  } )

  }
  retirer_part_group(userid:any,group_actif:any){
    this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {

    },
    (err:any) => {
    },
    () => {
      this.refresh();
    }
    );
  }
}

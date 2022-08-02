import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
group_name!:any;

constructor( public snackBar: MatSnackBar,private userService: UsersService,public dialogRef: MatDialogRef<MatParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ListUsers=data.data;
      this.curr_user=data.curr_user;
      this.user_init=data.user_init;
      this.group_id=data.group_id;
      this.group_name=data.group_name;
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

    if ((this.curr_user == this.user_init) && this.ListUsers.length>1 ){
      if(confirm("Êtes vous sûre de vouloir quitté le groupe '"+this.group_name+"', veuillez d'abord élire un autre administrateur !")){
      }
    }
    else if(this.ListUsers.length>1  &&  confirm("Êtes vous sûre de vouloir quitté le groupe '"+this.group_name+"'")) {
    this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {

    },
    (err:any) => {
    },
    () => {
      this.refresh();
    }
    );
  }
  else if(!(this.ListUsers.length>1)  &&  confirm("Êtes vous sûre de vouloir quitté le groupe '"+this.group_name+"'") && (this.curr_user == this.user_init))
  {
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

  elir_admin(user_id:any,group_id:any,curr_user:any,user_init:any,group_name_actif:any,user_login:any){
    if(confirm("Voulez vous vraiment élire gérant '"+user_login+"' du groupe '"+group_name_actif+"' ?")){
    this.userService.elireAdminGroupe(user_id,group_id).subscribe(
      (res:any)=>
    this.snackBar.open("Vous avez élu'"+user_login+"' gérant du groupe '"+group_name_actif+"",
    "Continuer",
    {duration:5000}),
    err=>err,
    ()=>this.dialogRef.close({chgt:true})


    );

  }
  }
}

import { Component, ElementRef, Inject, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator }  from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { Groupe } from 'src/app/Models/group.model';
import { MatParticipantComponent } from '../mat-participant/mat-participant.component';

@Component({
  selector: 'app-ami-message',
  templateUrl: './ami-message.component.html',
  styleUrls: ['./ami-message.component.scss']
})
export class AmiMessageComponent implements OnInit {
  searchCtl!: FormControl;
  searchForm!: FormGroup;
  groupeCtl!: FormControl;
  groupeForm!: FormGroup;
  UserId!:any;
  ListGroups!:Groupe[];
  displayedColumns: string[] = [
  'nom',
  'prenom',
  'actions',
  'login',
  'is_on_line'
  ];
  dataSource!: MatTableDataSource<User>;
  formData:FormData=new FormData();
  formArray:number[]=[];
  k:any=0;
  element_group:number[]=[];
  group_pers!:User[];
  group_pers_array:number[]=[];
  group_actif!:any;
  group_name_actif!:any;
  pers_init_id!:any;
  partic_actif!:any;
  public groupsList:any=[] ;
  public usersList!: User[];
  pageSize!:any;
  pageSizeOptions!:any;
    itemsPerPageLabel = 'Item par page';
  @ViewChildren('el') public div:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  scroll: any;

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService,private formBuilder: FormBuilder,private jwt: JwtHelperService,private matpag :MatPaginatorIntl) {

//window.scrollTo(0, 999999999);

      this.initFormGroupe()
      this.initForm();
      matpag.itemsPerPageLabel = 'Items par page';
     }

  ngOnInit(): void {

    let token=sessionStorage.getItem('id_token');
    if (typeof token == 'string') {this.UserId=this.jwt.decodeToken(token).id;}
    this.refresh();
  }
  refresh()
  {
    if (window.innerWidth > 450 && window.innerWidth <= 650) {
      this.pageSize = 10;
      this.pageSizeOptions= [6,10,12,16,20];
    }
    else if (window.innerWidth > 650 ) {
      this.pageSize = 15;
      this.pageSizeOptions= [6,9,12,15,21];
    } else {
      this.pageSize = 10;
      this.pageSizeOptions= [6,10,12,16,20];
    }
    this.userService.getGroupMessage(this.UserId).subscribe(groups =>    {
 this.ListGroups=groups;
})
this.formData=new FormData();
this.k=0;
    this.formArray=[];
    this.userService.getAmi(this.UserId).subscribe(users =>
    {

      this.usersList = users;
      this.updateDataSource();
    });



}
onResize(event:any) {

  if (event.target.innerWidth > 450 && event.target.innerWidth <= 650) {
    this.pageSize = 10;
    this.pageSizeOptions= [6,10,12,16,20];
  }
  else if (event.target.innerWidth > 650 ) {
    this.pageSize = 15;
    this.pageSizeOptions= [6,9,12,15,21];

  } else {
    this.pageSize = 10;
    this.pageSizeOptions= [6,10,12,16,20];
  }

}
initFormGroupe(): void
  {

    this.groupeCtl = this.formBuilder.control('', [Validators.required,Validators.minLength(7),Validators.maxLength(78),Validators.pattern('^[A-Za-z0-9_-]*$')]);

    this.groupeForm = this.formBuilder.group({
      name: this.groupeCtl
    });
  }
  updateDataSource()
  {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initForm(): void
  {

    this.searchCtl = this.formBuilder.control('',[Validators.required]);


    this.searchForm = this.formBuilder.group({
      search: this.searchCtl
    });
  }

  onSubmit()
  {
    const formVal = this.searchForm.value;



      // this.searchService.searchContact(formVal.search).subscribe(m => {
      //   this.router.navigate(['/projets-view'])
      // });
  }
  retirer_ami(UserId1:any,UserId2:any,username:any){
    if (confirm("Êtes vous sûre de vouloir retirer '"+ username +"' de votre liste de contacts? ")){
    this.userService.retirer_ami(UserId1,UserId2).subscribe(m=>{
      this.snackBar.open("Prise de distance avec '"+username+"'","Continuer",{duration:5000});
      this.refresh();
      //window.location.reload();
    });
    }
  }

ajouter_group(ROWID:number){
  this.formArray.push(ROWID);

}
createGroup(){
if(this.formArray.length>=1){
for (var key in this.formArray) {
  this.formData.append(key.toString(),this.formArray[key].toString());
  this.k=key;
};
this.formData.append("pers_init",this.UserId.toString());
}
else{
this.formData.append("pers_init",this.UserId.toString());

}
const formVal = this.groupeForm.value;

let newGroup = new Groupe(formVal);

let groupe_name= newGroup.name.toString();
this.userService.createGroup(this.formData,groupe_name).subscribe( (response) => {
},
(err) => {
},
() => {
  this.snackBar.open("Groupe '"+ groupe_name+"' créé","Continuer",{duration:5000});
  this.refresh();
}
);
}

retirer_group(ROWID:number){
  const index = this.formArray.indexOf(ROWID, 0);
  if (index > -1) {
     this.formArray.splice(index, 1);
  }
}
quitter_convers(){
  this.group_pers_array=[];
  this.group_actif=null;
  this.group_name_actif=null;
  this.pers_init_id=null;
  this.group_pers=[];
}
openConvers(group_id:any,group_name:any,pers_init:any){
  this.div.changes.subscribe((comps:any)=>
  {
   comps.first.nativeElement.scrollTo(0,999999999);//Now you can access the child component
  });

  this.group_pers_array=[];
  this.group_actif=group_id;
  this.group_name_actif=group_name;
  this.pers_init_id=pers_init;
  this.userService.voirPartic(group_id).subscribe( (response) => {
this.group_pers=response
  },
  (err) => {
  },
  () => {

    for (let index = 0; index < this.group_pers.length; index++) {
      this.group_pers_array.push(this.group_pers[index].id);
    }
  }
  );
  // this.userService.openConvers(group_id).subscribe( (response) => {
  // },
  // (err) => {
  // },
  // () => {
  //   this.refresh();
  // }
  // );
}

voirPartic(group_id:any){

  this.userService.voirPartic(group_id).subscribe( (response) => {
    const dlg = this.dialog.open(MatParticipantComponent, {data:{data:response,group_id:group_id,curr_user:this.UserId,user_init:this.pers_init_id}});
  },
  (err) => {
  },
  () => {
    this.refresh();
  }
  );

}
retirer_part_group_bis(userid:any,group_actif:any,group_name:any){
  if(confirm("Êtes vous sûre de vouloir quitté le groupe '"+group_name+"'")) {
  this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {
  this.refresh();
  const index = this.group_pers_array.indexOf(userid, 0);
    if (index > -1) {
       this.group_pers_array.splice(index, 1);
    }


  },
  (err:any) => {
  },
  () => {
this.quitter_convers();
    this.snackBar.open("Vous avez quitté le groupe '"+group_name+"'","Continuer",{duration:5000});
  }
  );
}}


retirer_part_group(userid:any,group_actif:any,username:any){
  this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {

  },
  (err:any) => {
  },
  () => {
    const index = this.group_pers_array.indexOf(userid, 0);
    if (index > -1) {
       this.group_pers_array.splice(index, 1);
    }
    this.snackBar.open("'"+username+"' a été retiré du groupe '"+this.group_name_actif+"'","Continuer",{duration:5000});
  }
  );
}
ajouter_nvo_o_group(userid:any,group_actif:any,username:any){
  this.userService.ajouter_nvo_o_group(userid,group_actif).subscribe( (response:any) => {

  },
  (err:any) => {
  },
  () => {
    this.group_pers_array.push(userid);
    this.snackBar.open("'"+username+"' a été ajouté au groupe '"+this.group_name_actif+"'","Continuer",{duration:5000});
  }
  );
}
}

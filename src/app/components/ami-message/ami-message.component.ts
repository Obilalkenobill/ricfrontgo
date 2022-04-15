import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { Groupe } from 'src/app/Models/group.model';

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
  'login'
  ];
  dataSource!: MatTableDataSource<User>;
  formData:FormData=new FormData();;
  formArray:number[]=[];
  k:any=0;
  element_group:number[]=[];
  group_pers:[]=[];
  public groupsList:any=[] ;
  public usersList!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService,private formBuilder: FormBuilder,private jwt: JwtHelperService,private matpag :MatPaginatorIntl) {
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
    this.userService.getAmi(this.UserId).subscribe(users =>
    {

      this.usersList = users;
      this.updateDataSource();
    });

//     this.userService.getGroupMessage(this.UserId).subscribe((users:any) =>    {

//       this.groupsList =users;
//       const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
//   list.reduce((previous, currentItem) => {
//     const group = getKey(currentItem);
//     if (!previous[group]) previous[group] = [];
//     previous[group].push(currentItem);
//     return previous;
//   }, {} as Record<K, T[]>);

//     this.groupsList = groupBy(this.groupsList, (i:any) => i.group_group_id_id);
//     this.groupsList= Object.entries(this.groupsList);
// })

this.userService.getGroupMessage(this.UserId).subscribe(groups =>    {
 this.ListGroups=groups;
})

}

initFormGroupe(): void
  {

    this.groupeCtl = this.formBuilder.control('', [Validators.required,Validators.minLength(7),Validators.maxLength(78),Validators.pattern('^[A-Za-z0-9_-]+$')]);

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
  retirer_ami(UserId1:any,UserId2:any){
    this.userService.retirer_ami(UserId1,UserId2).subscribe(m=>{

      this.refresh();
      //window.location.reload();
    });
    }

ajouter_group(ROWID:number){
  this.formArray.push(ROWID);

}
createGroup(){

for (var key in this.formArray) {
  this.formData.append(key.toString(),this.formArray[key].toString());
  this.k=key;
};
this.k++;


this.formData.append(this.k,this.UserId);

const formVal = this.groupeForm.value;

let newGroup = new Groupe(formVal);

let groupe_name= newGroup.name.toString();
this.userService.createGroup(this.formData,groupe_name).subscribe(m => {this.formArray=[];this.refresh();});


}

retirer_group(ROWID:number){
  const index = this.formArray.indexOf(ROWID, 0);
  if (index > -1) {
     this.formArray.splice(index, 1);
  }
}

messageTo(group_id:any){

}
}

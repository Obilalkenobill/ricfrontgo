



import { Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})


export class InvitationsComponent implements OnInit {
  searchCtl!: FormControl;
  searchForm!: FormGroup;
  UserId!:any;
  displayedColumns: string[] = [
  'nom',
  'prenom',
  'actions',
  'login'
  ];
  dataSource!: MatTableDataSource<User>;
  public usersList!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService,private formBuilder: FormBuilder,private jwt: JwtHelperService,private matpag :MatPaginatorIntl) {
      this.initForm();
      matpag.itemsPerPageLabel = 'Items par page';
     }
  ngOnInit(): void {
    let token=localStorage.getItem('id_token');
    if (typeof token == 'string') {this.UserId=this.jwt.decodeToken(token).id;}
    this.refresh();
  }
  refresh()
  {
    this.userService.getInvitation(this.UserId).subscribe(users =>
    {

      this.usersList = users;
      this.updateDataSource();
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

accepter_invit(UserId1:any,UserId2:any,username:any){
  this.userService.accepter_invit(UserId1,UserId2).subscribe(m=>{
    this.snackBar.open("Vous avez acceptez l'invitation de '"+username+"'","Continuer",{duration:5000});

    this.refresh();
    //window.location.reload();
  });
}
retirer_ami(UserId1:any,UserId2:any,username:any){
  if (confirm("Êtes vous sûre de vouloir prendre des distances avec "+ username +" ? ")){
  this.userService.retirer_ami(UserId1,UserId2).subscribe(m=>{
    this.snackBar.open("Prise de distance avec '"+username+"'","Continuer",{duration:5000});
    this.refresh();
    //window.location.reload();
  });
  }
}
}


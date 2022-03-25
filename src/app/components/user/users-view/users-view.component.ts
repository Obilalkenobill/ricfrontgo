import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/Models/role.model';
import {MatPaginatorIntl} from '@angular/material/paginator';
@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  displayedColumns: string[] = ['id',
  'nom',
  'prenom',
  'email',
  'is_active',
  'is_verified',
  'nn',
  'actions'];
  dataSource!: MatTableDataSource<User>;
  public usersList!: User[];
  pageSize!:any;
  pageSizeOptions!:any;
  itemsPerPageLabel = 'Item par page';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService,private matpag :MatPaginatorIntl ) {
      matpag.itemsPerPageLabel = 'Items par page';
    }

  ngOnInit(): void {
    this.refresh();
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
  refresh()
  {
    this.userService.getAll().subscribe(users =>
    {
      this.usersList = users;
      this.updateDataSource();
    });
  }

  formatRole(role:Role[]){
    let output="";
    role.forEach((element:any)=>{
      output+=element.label+' ';
    })
    return output;
  }


  updateDataSource()
  {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteUser(id:any,user:any)
  {
    if (confirm("Are sur to delete user: "+user.nom+" "+user.prenom+" wich login is :"+user.login)) {
    this.userService.deleteUser(id).subscribe(result=>{this.refresh();},error=>{
      alert("Cet utilisateur a participé au projet, il ne peut pas être supprimé !");
      console.error(error);
    });
    //window.location.reload();
    }
  }
}

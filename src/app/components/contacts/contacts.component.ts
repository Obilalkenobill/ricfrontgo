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
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
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
    public authService: AuthService,private formBuilder: FormBuilder,private jwt: JwtHelperService) {
      this.initForm();
     }
  ngOnInit(): void {
    this.refresh();
  }
  refresh()
  {
    this.userService.getAll().subscribe(users =>
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
    console.log('ok');
    console.log(formVal.search);

      // this.searchService.searchContact(formVal.search).subscribe(m => {
      //   this.router.navigate(['/projets-view'])
      // });
  }
}

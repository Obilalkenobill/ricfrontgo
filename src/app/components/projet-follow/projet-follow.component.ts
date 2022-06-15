import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Projet } from 'src/app/Models/projet.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-projet-follow',
  templateUrl: './projet-follow.component.html',
  styleUrls: ['./projet-follow.component.scss']
})
export class ProjetFollowComponent implements OnInit {

  displayedColumns: string[] = [
    'titre',
    'descriptif',
    'nbr_vote_pour',
    'nbr_vote_contre',
    'nbr_vote_null',
    'date_adm',
    'date_rej',
    'creation_date',

    'actions'];
    dataSource!: MatTableDataSource<Projet>;
    public projetList!: Projet[];
    UserId!:any;
    pageSize!:any;
    pageSizeOptions!:any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private projetService: ProjetService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private authService: AuthService,private router: Router,  private jwt: JwtHelperService) { }

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

    refresh()
    {
      let token=localStorage.getItem('id_token');
      if (typeof token == 'string') {this.UserId=this.jwt.decodeToken(token).id;}
      this.projetService.getProjetByFollowerID(this.UserId).subscribe((projets:any) =>
      {

        this.projetList = projets[0];
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
    updateDataSource()
    {
      this.dataSource = new MatTableDataSource(this.projetList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    redirectCreateProjet(){
     this.router.navigate(['/create-projet']);
    }

  deleteProj(Projet_id:any,User_id:any){
    if( this.authService.IsUserProjet(Projet_id, User_id) )
    {
      this.projetService.deleteProjet(Projet_id).subscribe();
    }
  }
}

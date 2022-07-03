import { Component, OnInit, ViewChild } from '@angular/core';
import { SignalService } from 'src/app/services/signal.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { SignalCommentaire } from 'src/app/Models/signal_commentaire.model';
@Component({
  selector: 'app-signal-commentaire',
  templateUrl: './signal-commentaire.component.html',
  styleUrls: ['./signal-commentaire.component.scss']
})
export class SignalCommentaireComponent implements OnInit {
signal_comm_list!:any;
displayedColumns: string[] = [
  'descriptif',
  'creation_date',
  'login',
  'nom',
  'prenom', 'is_lock',
  'actions'

  ];
  dataSource!: MatTableDataSource<SignalCommentaire>;
  pageSize!:any;
  pageSizeOptions!:any;
    itemsPerPageLabel = 'Item par page';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private signal : SignalService ,   public dialog: MatDialog,
    public snackBar: MatSnackBar,private matpag :MatPaginatorIntl) { }

  ngOnInit(): void {
  this.get_signalement_com();
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


  updateDataSource()
  {
    this.get_signalement_com()
    this.dataSource = new MatTableDataSource(this.signal_comm_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
get_signalement_com() {
  this.signal.getAllSignComm().subscribe(SignComm =>
    {
      this.signal_comm_list = SignComm;
      this.dataSource = new MatTableDataSource(this.signal_comm_list);
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

  comment_signal_act(id_signal_com:any,status:any){

    this.signal.addSignalComm(id_signal_com,status).subscribe( (SignComm : any) =>
      {
        this.updateDataSource();
      });

  }
}

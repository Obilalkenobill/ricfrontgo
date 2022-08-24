import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ghibli:string="../../../assets/img/justice.jpg";
  constructor( private auth: AuthService ) {

  }
is_co!:any;
  ngOnInit(): void {
 this.is_co=this.auth.isLoggedIn;
  }

}

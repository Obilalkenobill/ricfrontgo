import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Models/userLogin.model';
import { AdminGuard, is_verifiedGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userCurr:any;
  userCurrId:any;
  title = 'ric';
  UserId: any;
  isNumber:any = (val: any) => typeof val === "number" && val === val;
//customize item per page label
delay(delay: number) {
  return new Promise(r => {
      setTimeout(r, delay);
  })
}
  constructor(private userService: UsersService,private authService: AuthService, private jwt: JwtHelperService, private router: Router, private adminAuth: AdminGuard, private Is_verified: is_verifiedGuard)
  {

this.doTimer();
}
ngOnInit(): void {
 const token = sessionStorage.getItem('id_token');
    if (typeof token == 'string') {
      this.UserId=this.jwt.decodeToken(token).id;
    }

}

async doTimer() {
  while(true==true) {

      const token = sessionStorage.getItem('id_token');
      // Si le token n'existe pas ou s'il est expiré ...
      if (!token || this.jwt.isTokenExpired(token)) {
        this.authService.isLoggedIn=false;
      }
      if (typeof token == 'string') {
      this.UserId=this.jwt.decodeToken(token).id;
    }
    if(this.authService.isLoggedIn==false &&  this.isNumber(this.UserId)){
      this.userService.setOnline(this.UserId,0).subscribe((response:any)=>{response});
     this.authService.logout();
      break;
    }
      await this.delay(900000);
    }

  }

public userId()
{

  this.router.navigate(['/img-validate/'])
}

  public checkAuth()
  {
    return this.authService.isLoggedIn;
  }
  public isAdmin()
  {

    return this.adminAuth.canActivate();
  }
  public is_verified()
  {
    return this.Is_verified.canActivate();
  }
  public logout(): void
  {
    this.authService.logout();
  }
}

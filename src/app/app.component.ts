import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGuard, is_verifiedGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncrDecrService } from './services/EncrDecrSevice';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:beforeunload')
  beforeUnloadHandler(event: any) {
    const token = localStorage.getItem('id_token');
    if (typeof token === 'string'){
      this.UserId=this.jwt.decodeToken(token).id;
    }
    else {
      this.UserId= localStorage.getItem('user_id');}
      this.authService.logout(this.UserId,false);
      event.preventDefault();
      event.returnValue = "Si vous quittez votre session restera active sur ce pc.";
      return "Si vous quittez votre session restera active sur ce pc.";
  }

//   @HostListener('window:unload')
//   unloadHandler() {
//     const token = localStorage.getItem('id_token');
//     if (typeof token === 'string'){
//       console.log("etape 2");
//       this.UserId=this.jwt.decodeToken(token).id;
//     }
//     else {
//       this.UserId= localStorage.getItem('user_id');
//     }
// this.authService.logout(this.UserId);
//   }
  userCurr:any;
  userCurrId:any;
  title = 'ric';
  UserId: any;
  isNumber:any = (val: any) => typeof val === "number" && val === val;
  beforeUn:any=false;
//customize item per page label
delay(delay: number) {
  return new Promise(r => {
      setTimeout(r, delay);
  })
}
  constructor(private EncrDecr: EncrDecrService,private userService: UsersService,private authService: AuthService, private jwt: JwtHelperService, private router: Router, private adminAuth: AdminGuard, private Is_verified: is_verifiedGuard,
    public snackBar: MatSnackBar)
  {

this.doTimer();
}
ngOnInit(): void {
 const token = localStorage.getItem('id_token');
    if (typeof token == 'string') {
      this.UserId=this.jwt.decodeToken(token).id;
    }

}

async doTimer() {
  while(true==true) {

      const token = localStorage.getItem('id_token');
      // Si le token n'existe pas ou s'il est expiré ...

      if (typeof token == 'string') {
      this.UserId=this.jwt.decodeToken(token).id;
    }
    else{
      this.UserId=localStorage.getItem('user_id');
    }
    if((!token || this.jwt.isTokenExpired(token) || localStorage.getItem('id_token')==null ) &&  this.isNumber(this.UserId)){
      this.userService.setOnline(this.UserId,0).subscribe((response:any)=>{response});
    }
      await this.delay(30000);
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
    this.authService.logout(this.UserId);
  }
}

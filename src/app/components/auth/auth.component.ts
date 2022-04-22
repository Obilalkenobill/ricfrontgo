import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userForm!: FormGroup;
  usernameCtl!: FormControl;
  passwordCtl!: FormControl;
  constructor(private userService: UsersService, private authserv: AuthService , private server: ServerService, private router: Router, private formBuilder: FormBuilder, private jwt: JwtHelperService) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm(): void
  {
    this.usernameCtl = this.formBuilder.control('', [Validators.required]);
    this.passwordCtl = this.formBuilder.control('', [Validators.required]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtl,
      password: this.passwordCtl
    });
  }

  onSubmit()
  {
    const formVal = this.userForm.value;
    const newUser = new User(formVal);
    this.server.login(newUser).subscribe((m) =>
      {
        if(m==401)
{alert("Mot de passe ou Email incorrect");}


          if(m===true)
          {

          this.authserv.isLoggedIn=m;
          this.router.navigate(['/projets-view']);
          }
          },
          (error) =>{
        }
      );
  }
}


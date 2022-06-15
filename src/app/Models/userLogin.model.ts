export class User
{
id!:any;
username!:string;
password!:string;
roles!:any;
is_verified!:any;
login!:any;
constructor(data: any)
{
  this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.roles=data.roles;
        this.is_verified=data.is_verified;
        this.login=data.login;
}
}

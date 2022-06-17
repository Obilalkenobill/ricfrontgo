import { Component, ElementRef, Inject, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator }  from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { Groupe } from 'src/app/Models/group.model';
import { MatParticipantComponent } from '../mat-participant/mat-participant.component';
import { Message } from 'src/app/Models/message.model';
import { DatePipe } from '@angular/common';
import { forEach } from 'lodash';

@Component({
  selector: 'app-ami-message',
  templateUrl: './ami-message.component.html',
  styleUrls: ['./ami-message.component.scss']
})
export class AmiMessageComponent implements OnInit {
  searchCtl!: FormControl;
  searchForm!: FormGroup;
  groupeCtl!: FormControl;
  groupeForm!: FormGroup;
  UserId!:any;
  ListGroups!:Groupe[];
  displayedColumns: string[] = [
  'nom',
  'prenom',
  'actions',
  'login',
  'is_on_line'
  ];
  dataSource!: MatTableDataSource<User>;
  formData:FormData=new FormData();
  formArray:number[]=[];
  k:any=0;
  element_group:number[]=[];
  group_pers!:User[];
  group_pers_array:number[]=[];
  group_actif!:any;
  group_name_actif!:any;
  pers_init_id!:any;
  partic_actif!:any;
  public groupsList:any=[] ;
  public usersList!: User[];
  pageSize!:any;
  pageSizeOptions!:any;
    itemsPerPageLabel = 'Item par page';
  @ViewChildren('el') public div!: QueryList<ElementRef>;
  @ViewChildren('out') public out!: QueryList<ElementRef>;
  @ViewChildren('msg') public  msgElement!: QueryList<ElementRef>;

  charg1: any=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  scroll: any;
  messageCtl!: FormControl;
  messagesForm!: FormGroup;
  message!: string;
  messageOFCom!: string;
  messages!: Message[];
  messagesWOREF!: Message[];
  messages_tps!: Message[];
  group!:any;
  ws!:any;
  UserLogin!:any;
  listTpsUserGroup: any;
  constructor(private userService: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService,private formBuilder: FormBuilder,private jwt: JwtHelperService,private matpag :MatPaginatorIntl) {

//window.scrollTo(0, 999999999);

      this.initFormGroupe()
      this.initForm();
      matpag.itemsPerPageLabel = 'Items par page';
     }

  ngOnInit(): void {
    let token=localStorage.getItem('id_token');
    if (typeof token == 'string') {
      this.UserId=this.jwt.decodeToken(token).id;
      this.UserLogin=this.jwt.decodeToken(token).login;
    }
    if(!this.ws){
this.wss();
    }
  }
  async timWss(){
    await new Promise(r => setTimeout(r, 250));
  }
wss(){
  if (this.ws && this.ws.readyState === 3 ) {
    this.ws.close();
this.ws=new  WebSocket('wss://web-so.herokuapp.com');
    // wait until new connection is open
    while (this.ws.readyState !== 1) {
      this.timWss();
    }
} else {
this.ws=new  WebSocket('wss://web-so.herokuapp.com');
}
  this.ws.onclose=function(e:any){  console.log("wss closed");}
  this.ws.onerror=function(e:any){console.log("error",e)}
  this.ws.onopen=function(){
  console.log('wws:connected');
  }
  this.refresh();
  this.bjoin(this.UserLogin);
  let self=this;
  this.ws.onmessage=function(ms:any){ console.log('ms', ms);
  let reader = new FileReader();
  if (reader){
  reader.onload = () => {
      let result=JSON.parse(reader.result as string);
      console.log("Result.msg: " , result.msg);
      console.log("result.group_id :"+result.msg.group_group_id.id.id,"this.group_id :"+self.group_actif);
      if (result.msg.message_txt && result.msg.group_group_id.id.id==self.group_actif){
        console.log("je push le message");
      self.pushbis(result.msg);
      this.goToAnchor(true);
      }
      self.refresh();
    }
    if (ms.data instanceof Blob)
    {
      reader.readAsText(ms.data);
    }
    }
  };
}

  refresh()
  {
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
    this.userService.getGroupMessage(this.UserId).subscribe(groups =>    {
 this.ListGroups=groups;
 if(this.msgElement.first!=undefined){this.msgElement.first.nativeElement.focus();}
})
this.formData=new FormData();
this.k=0;
    this.formArray=[];
    this.userService.getAmi(this.UserId).subscribe(users =>
    {

      this.usersList = users;
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
initFormGroupe(): void
  {

    this.groupeCtl = this.formBuilder.control('', [Validators.required,Validators.minLength(7),Validators.maxLength(78),Validators.pattern('^[A-Za-z0-9_-]*$')]);

    this.groupeForm = this.formBuilder.group({
      name: this.groupeCtl
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
  retirer_ami(UserId1:any,UserId2:any,username:any){
    if (confirm("Êtes vous sûre de vouloir retirer '"+ username +"' de votre liste de contacts? ")){
    this.userService.retirer_ami(UserId1,UserId2).subscribe(m=>{
      this.snackBar.open("Prise de distance avec '"+username+"'","Continuer",{duration:5000});
      this.refresh();
      //window.location.reload();
    });
    }
  }

ajouter_group(ROWID:number){
  this.formArray.push(ROWID);

}
createGroup(){
if(this.formArray.length>=1){
for (var key in this.formArray) {
  this.formData.append(key.toString(),this.formArray[key].toString());
  this.k=key;
};
this.formData.append("pers_init",this.UserId.toString());
}
else{
this.formData.append("pers_init",this.UserId.toString());

}
const formVal = this.groupeForm.value;

let newGroup = new Groupe(formVal);

let groupe_name= newGroup.name.toString();
this.userService.createGroup(this.formData,groupe_name).subscribe( (response) => {
},
(err) => {
},
() => {
  this.snackBar.open("Groupe '"+ groupe_name+"' créé","Continuer",{duration:5000});
  this.refresh();
}
);
}

retirer_group(ROWID:number){
  const index = this.formArray.indexOf(ROWID, 0);
  if (index > -1) {
     this.formArray.splice(index, 1);
  }
}
quitter_convers(){
  this.group_pers_array=[];
  this.group_actif=null;
  this.group_name_actif=null;
  this.pers_init_id=null;
  this.group_pers=[];
  this.refresh();
}

chargerMessage(){

  this.userService.getMessageByGroupeID(this.group_actif,this.UserId).subscribe((m:any)=>{
    this.messages=m;
    this.messagesWOREF=[];
    this.messages.forEach(element => {
      if(element.message_ref_id === undefined){
       this.messagesWOREF.push(element);
      }
    });
    while(!this.doTimer(this.messages)){
      this.goToAnchor(true);
    }
},o=>o,()=>this.refresh());
;
}

delay(delay: number) {
  return new Promise(r => {
      setTimeout(r, delay);
  })
}

 atBottom(ele:any) {
  var sh = ele.scrollHeight;
  var st = ele.scrollTop;
  var ht = ele.offsetHeight;
  if(ht==0) {
      return true;
  }
  if(st == sh - ht)
      {return true;}
  else
      {return false;}
}
async doTimMess(){
  while(1==1){
    let bool=false;
  this.userService.getGroupMessage(this.UserId).subscribe(
    m=>{
      let i =0;
      for(i =0;i<m.length;i++)
        {
          if(m[i].message_read==0 && m[i].id==this.group_actif)
          {bool=true;}
        }
      },
o=>o,
  ()=> {
      if(bool)
    {
      this.chargerMessage();
    }
  }
  )
  await this.delay(4500);
  }
}



async doTimer(messages:any) {
  const appaer= document.querySelector("#appaer");
  const element = document.querySelector("#el");
  while(this.messages_tps!=messages || !this.atBottom(element)) {
    this.goToAnchor(true);
    this.messages_tps=messages;
    return !false;
      // await this.delay(30000);
  }
  if(this.messages_tps==messages){
    this.goToAnchor(true);
    return !false;
  } else{
    this.goToAnchor(true);
  return !true;}
}
clicktoggle() {
  const targetDiv = document.getElementById("#inptbtn1");
  const btn = document.getElementById("#inptbtn1");
    if (targetDiv && targetDiv?.style.display !== "none") {
      targetDiv.style.display = "none";
    } else if (targetDiv ){
      targetDiv.style.display = "block";
    }
  }
async goToAnchor(oui?:any){

  const appaer= document.querySelector("#appaer");
  const element = document.querySelector("#el");
if (element && appaer && ( oui ))
{
  element.scrollTo(0, 99999999999);
  return true
}
  else {
    return false;
  }
}

pushbis(mess:any){
this.messagesWOREF.push(mess);
this.goToAnchor(true);
}
openConvers(group_id:any,group_name:any,pers_init:any){
  this.group_actif=group_id;
  this.chargerMessage();
  this.group_name_actif=group_name;
  this.pers_init_id=pers_init;
  this.group_pers_array=[];
  this.userService.voirPartic(group_id).subscribe( (response) => {
    this.group_pers=response
  },
  (err) => {
  },
  () => {
    for (let index = 0; index < this.group_pers.length; index++) {
      this.group_pers_array.push(this.group_pers[index].id);
    }
  }
  );
  this.group=group_name+group_id;
  this.bjoin(this.group);
  this.userService.voirPartic(group_id).subscribe( (response) => {
    this.listTpsUserGroup=response;
  })
  if(this.msgElement.first!=undefined){this.msgElement.first.nativeElement.focus();}

  this.messageCtl = this.formBuilder.control('', [Validators.required],);

  this.messagesForm = this.formBuilder.group({
    message_txt: this.messageCtl,
 group_group_id: this.group_actif,
 expediteur:this.UserId
  });
  this.goToAnchor(true);
}
  onSubmitMess()
  {

    for (let index = 0; index < this.listTpsUserGroup.length; index++) {
      let element = [];
      element.push(this.listTpsUserGroup[index].login);

    }
    let formVal = this.messagesForm.value;
    console.log(formVal);
const newMessage = new Message(formVal);
console.log(newMessage);
this.userService.addMessage(newMessage).subscribe(m => {
        this.refresh();
        this.message='';
      },o=>o,()=>{this.goToAnchor(true);});

this.send_websckt(newMessage);
for (let index = 0; index < this.listTpsUserGroup.length; index++) {
  this.bjoin(this.listTpsUserGroup[index].login);
  this.broadcast(newMessage.group_group_id,this.listTpsUserGroup[index].login)
}
this.goToAnchor(true);
}



  send_websckt(newMessage:any){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'YYYY-MM-dd H:m:s');
    const newMessageBis=new Message(newMessage);
    newMessageBis.login=this.UserLogin;
    if(formattedDate){
      newMessageBis.creation_date=formattedDate;
    }
    newMessageBis.is_on_line=1;
    console.log(newMessageBis.creation_date);
    this.broadcast(newMessageBis,this.group);
    console.log(newMessage);
  }


  onSubmit2(idReferent:any){
    let formVal = this.messagesForm.value;
    formVal.expediteur_id=this.UserId;
    formVal.message_ref_id=idReferent;
    formVal.message_read=false;

      const newMessage = new Message(formVal);
      this.userService.addMessage(newMessage).subscribe(m => {
        this.refresh();
        this.messageOFCom='';
        this.chargerMessage();
      },o=>o,()=>{this.goToAnchor(true);});
    }

    send(msg:any,room?:any){
      setTimeout(() => {this.ws.send(JSON.stringify({room:room,msg:msg})); },1000)

    }
    broadcast(msg:any,room:any){
      setTimeout(() => {this.ws.send(JSON.stringify({room:room,msg:msg}));console.log(room) },1000)
    }
   join(room:any){
    setTimeout(() => {this.ws.send(JSON.stringify({"join":room})); },1000)
    }
    bjoin(group:any){
    //alert(group);
    this.join(group);
    }





voirPartic(group_id:any){

  this.userService.voirPartic(group_id).subscribe( (response) => {
    this.listTpsUserGroup=response;
    const dlg = this.dialog.open(MatParticipantComponent,
      {data:
        {data:response,
          group_id:group_id,
          curr_user:this.UserId,
          user_init:this.pers_init_id,
          group_name:this.group_name_actif
        }
      });
      dlg.afterClosed().subscribe( (data:any) => {if(data != undefined && data.chgt===true){this.quitter_convers(); this.refresh()}});
  },
  (err) => {
  },
  () => {
  }
  );

}
retirer_part_group_bis(userid:any,group_actif:any,group_name:any){
  if(confirm("Êtes vous sûre de vouloir quitté le groupe '"+group_name+"'")) {
  this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {
  this.refresh();
  const index = this.group_pers_array.indexOf(userid, 0);
    if (index > -1) {
       this.group_pers_array.splice(index, 1);
    }


  },
  (err:any) => {
  },
  () => {
this.quitter_convers();
    this.snackBar.open("Vous avez quitté le groupe '"+group_name+"'","Continuer",{duration:5000});
  }
  );
}}


retirer_part_group(userid:any,group_actif:any,username:any){
  this.userService.retirer_part_group(userid,group_actif).subscribe( (response:any) => {

  },
  (err:any) => {
  },
  () => {
    const index = this.group_pers_array.indexOf(userid, 0);
    if (index > -1) {
       this.group_pers_array.splice(index, 1);
    }
    this.snackBar.open("'"+username+"' a été retiré du groupe '"+this.group_name_actif+"'","Continuer",{duration:5000});
  }
  );
}
ajouter_nvo_o_group(userid:any,group_actif:any,username:any){
  this.userService.ajouter_nvo_o_group(userid,group_actif).subscribe( (response:any) => {

  },
  (err:any) => {
  },
  () => {
    this.group_pers_array.push(userid);
    this.snackBar.open("'"+username+"' a été ajouté au groupe '"+this.group_name_actif+"'","Continuer",{duration:5000});
  }
  );
}


}

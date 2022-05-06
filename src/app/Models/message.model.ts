import { CommentaireREF } from "./commRef.model";
import { GroupGroup } from "./GroupGroup.model";
import { Projet } from "./projet.model";
import { User } from "./user.model";


export class Message
{
    id!:number;
    expediteur!:User;
    message_txt!:string;
    creation_date!:Date;
    group_group_id!:GroupGroup;
    message_ref_id!:number;
    message_read!:any;
    login!:string;

    constructor(data: any)
    {
        this.id=data.id;
        this.message_txt=data.message_txt;
        this.creation_date=data.creation_date;
        let data0;
        let groupgroup= new GroupGroup(data0={id:undefined});
        if(data.group_group_id){
        groupgroup= new GroupGroup(data0={id:data.group_group_id});
        }else if (data.group_group_id_id){
        groupgroup= new GroupGroup(data0={id:data.group_group_id_id});
        }
        this.group_group_id=groupgroup;
        let data1;
        let user = new User(data1={id:undefined});
        if(data.expediteur){
       user= new User(data1={id:data.expediteur});
        }else if (data.expediteur_id){
          user= new User(data1={id:data.expediteur});
        }
        this.expediteur=user ;
        this.login=data.login;
        this.message_ref_id=data.message_ref_id;
          this.message_read=data.message_read;
    }
}

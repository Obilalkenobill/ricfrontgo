import { Role } from "./role.model";

export class User
{
    id: any;
    nom:string;
    prenom:string;
    login:string;
    email:string;
    nn:number;
    roles:any;
    role_pers:Role[]=[];
    creation_date:Date;
    is_active:number;
    is_verified:number;
    photoverif:Blob;
    mimeTypephotoverif:string;
    rectocarteid:Blob;
    mimeTyperectocarteid:string;
    versocarteid:Blob;
    mimeTypeversocarteid:string;
    filephotoverif:File;
    filerectocarteid:File;
    fileversocarteid:File;
    username: string;
    password: string;
    salt:string;
    accept_personne1:any;
    accept_personne2:any;
    personne1_id_id:any;//il s'agit ici de voir si l'user est ami ou non avec lui
    personne2_id_id:any;// idem
    group_group_id_id:any;
    is_on_line:any;
    constructor(data: any)
    {
        this.salt=data.salt;
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.login = data.login;
        this.nn=data.nn ;
        this.roles=data.roles;
        this.creation_date=data.creation_date;
        this.is_active=data.is_active;
        this.is_verified=data.is_verified;
        this.photoverif=data.photoverif;
        this.mimeTypephotoverif=data.mime_typephotoverif;
        this.rectocarteid=data.rectocarteid;
        this.mimeTyperectocarteid=data.mime_typerectocarteid;
        this.versocarteid=data.versocarteid;
        this.mimeTypeversocarteid=data.mime_typeversocarteid;
        this.filephotoverif=data.filephotoverif;
        this.filerectocarteid=data.filerectocarteid;
        this.fileversocarteid=data.fileversocarteid;
        if (data.role_pers) {data.role_pers.forEach((element: any) => {
            this.role_pers.push(element.role_id);
        });
    }
    this.accept_personne1=data.accept_personne1;
    this.accept_personne2=data.accept_personne2;
    this.personne1_id_id=data.personne1_id_id;
    this.personne2_id_id=data.personne2_id_id;
    this.group_group_id_id=data.group_group_id_id;
    this.is_on_line=data.is_on_line;
    }
}

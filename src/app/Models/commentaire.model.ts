import { CommentaireREF } from "./commRef.model";
import { Projet } from "./projet.model";
import { User } from "./user.model";


export class Commentaire
{
    id!:number;
    commentaire!:string;
    creation_date!:Date;
    personne_id!:User;
    projet_id!:Projet;
    login!:string;
    
    constructor(data: any)
    {
        this.id=data.id;
        this.commentaire=data.commentaire;
        this.creation_date=data.creation_date;
        this.personne_id=data.personne_id_id;
        this.projet_id=data.projet_id;
        this.login=data.login
    }
}
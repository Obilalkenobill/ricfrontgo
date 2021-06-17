import { CommentaireREF } from "./commRef.model";
import { Projet } from "./projet.model";
import { User } from "./user.model";


export class Commentaire
{
    id!:number;
    commentaire!:string;
    creation_date!:Date;
    commentaire_referent_id!:CommentaireREF;
    personne_id!:User;
    projet_id!:Projet;
    
    constructor(data: any)
    {
        this.id=data.id;
        this.commentaire=data.commentaire;
        const newCommentaire= new CommentaireREF ({
            id: data.commentaire_referent_id
        });
        this.commentaire_referent_id=newCommentaire;
        this.creation_date=data.creation_date;
        this.personne_id=data.personne_id;
        this.projet_id=data.projet_id;
    }
}
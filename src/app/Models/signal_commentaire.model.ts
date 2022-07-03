

export class SignalCommentaire
{
    id!:number;
    descriptif!:string;
    personne_id_id!:number;
    commentaire_id_id!:number;
    login!:string;
    nom!:string;
    prenom!:string;
    is_lock!:number;
    creation_date!: string;

    constructor(data: any)
    {
        this.id=data.id;
        this.descriptif=data.descriptif;
        this.personne_id_id=data.personne_id_id;
        this.commentaire_id_id=data.commentaire_id_id;
        this.is_lock=data.is_lock;
        this.login=data.login;
        this.nom=data.nom;
        this.creation_date=data.creation_date;
        this.prenom=data.prenom;
    }
}

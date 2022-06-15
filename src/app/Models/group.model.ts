export class Groupe
{
    id!:number;
    name!:string;
    pers_init_id_id!:number;
    message_read!:any;
    constructor(data: any)
    {
        this.id=data.id;
        this.name=data.name;
        this.pers_init_id_id=data.pers_init_id_id;
        this.message_read=data.message_read;
      }
}

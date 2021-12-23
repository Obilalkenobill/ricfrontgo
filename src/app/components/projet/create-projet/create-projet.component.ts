import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Projet } from 'src/app/Models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.scss']
})
export class CreateProjetComponent implements OnInit {

  projetForm!: FormGroup;
  titreCtl!: FormControl;
  descriptifCtl!: FormControl;
  projet!: Projet;

  UserId!:any;

  constructor(private projetService: ProjetService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private jwt: JwtHelperService)   {
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(): void
  {

    this.titreCtl = this.formBuilder.control('', [Validators.required],);
    this.descriptifCtl = this.formBuilder.control('', [Validators.required] );
    let token=sessionStorage.getItem('id_token');
    if (typeof token == 'string') {this.UserId=this.jwt.decodeToken(token).id;}

    this.projetForm = this.formBuilder.group({
      titre: this.titreCtl,
      descriptif: this.descriptifCtl,
      personne_id_id:this.UserId
    });
  }


  onSubmit()
  {
    const formVal = this.projetForm.value;

      const newProjet = new Projet(formVal);
      this.projetService.addProjet(newProjet).subscribe(m => {
        this.router.navigate(['/projets-view'])
      });
  }
}

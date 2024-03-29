import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CharteComponent } from './components/charte/charte.component';
import { FourhofourComponent } from './components/fourhofour/fourhofour.component';
import { HomeComponent } from './components/home/home.component';
import { ProjetFollowComponent } from './components/projet-follow/projet-follow.component';
import { CreateProjetComponent } from './components/projet/create-projet/create-projet.component';
import { DetailsProjetComponent } from './components/projet/details-projet/details-projet.component';
import { OwnProjectComponent } from './components/projet/own-project/own-project.component';
import { ProjetViewComponent } from './components/projet/projet-view/projet-view.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { RolesViewComponent } from './components/role/roles-view/roles-view.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ImageValidateComponent } from './components/user/image-validate/image-validate.component';
import { UsersViewComponent } from './components/user/users-view/users-view.component';
import { ValidateComponent } from './components/user/validate/validate.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { AmiMessageComponent } from './components/ami-message/ami-message.component';
import { AuthGuard,AdminGuard } from './services/auth-guard.service';
import { SignalComponent } from './components/signal/signal/signal.component';
import { SignalCommentaireComponent } from './components/signal/signal-commentaire/signal-commentaire.component';


const routes: Routes = [
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: CreateUserComponent},
  { path: 'signal-com',canActivate: [AdminGuard], component: SignalCommentaireComponent},
  { path: 'users-view', canActivate: [AdminGuard], component: UsersViewComponent},
  { path: 'edit-user/:id', canActivate: [AdminGuard], component: EditUserComponent},
  { path: 'img-validate',canActivate: [AuthGuard], component: ImageValidateComponent},
  { path: 'validate/:id',canActivate: [AdminGuard], component: ValidateComponent},
  { path: 'view-roles',canActivate: [AdminGuard], component: RolesViewComponent},
  { path: 'create-role',canActivate: [AdminGuard], component: CreateRoleComponent},
  { path: 'projets-view', canActivate: [AuthGuard], component: ProjetViewComponent},
  { path: 'projets-follow',canActivate: [AuthGuard], component: ProjetFollowComponent},
  { path: 'detail-proj/:id',canActivate: [AuthGuard], component: DetailsProjetComponent},
  { path: 'create-projet',canActivate: [AuthGuard], component: CreateProjetComponent},
  { path: 'own-projet',canActivate: [AuthGuard], component: OwnProjectComponent},
  { path: 'contacts',canActivate: [AuthGuard], component: ContactsComponent},
  { path: 'invitations',canActivate: [AuthGuard], component: InvitationsComponent},
  { path: 'ami-message',canActivate: [AuthGuard], component: AmiMessageComponent},
  { path: 'not-found', component: FourhofourComponent },
  { path: 'charte', component: CharteComponent},
  { path: 'signal',canActivate: [AdminGuard], component: SignalComponent},
  { path: '**', redirectTo: 'not-found' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

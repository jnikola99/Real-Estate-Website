import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminizmeniComponent } from './adminizmeni/adminizmeni.component';
import { AgentComponent } from './agent/agent.component';
import { DodajagentComponent } from './dodajagent/dodajagent.component';
import { DodavanjenekretnineComponent } from './dodavanjenekretnine/dodavanjenekretnine.component';
import { EditnekretninaComponent } from './editnekretnina/editnekretnina.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { LoginComponent } from './login/login.component';
import { Nekretnina } from './models/nekretnina';
import { MojenekretnineComponent } from './mojenekretnine/mojenekretnine.component';
import { MojeponudeComponent } from './mojeponude/mojeponude.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { NekretnineadminComponent } from './nekretnineadmin/nekretnineadmin.component';
import { OdobravanjeComponent } from './odobravanje/odobravanje.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PonudeadminComponent } from './ponudeadmin/ponudeadmin.component';
import { PonudeagentComponent } from './ponudeagent/ponudeagent.component';
import { ProfileComponent } from './profile/profile.component';
import { PromovisiComponent } from './promovisi/promovisi.component';
import { RegisterComponent } from './register/register.component';
import { RegistracijeComponent } from './registracije/registracije.component';
import { SifraComponent } from './sifra/sifra.component';
import { SifraadminComponent } from './sifraadmin/sifraadmin.component';
import { SifraagentComponent } from './sifraagent/sifraagent.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'agent', component:AgentComponent},
  {path: 'sifra', component:SifraComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'mojenekretnine',component:MojenekretnineComponent},
  {path:'nekretnina',component:NekretninaComponent},
  {path:'editn',component:EditnekretninaComponent},
  {path:'mojeponude',component:MojeponudeComponent},
  {path:'dodavanjenekretnine',component:DodavanjenekretnineComponent},
  {path:'odobravanje',component:OdobravanjeComponent},
  {path:'promovisanje',component:PromovisiComponent},
  {path:'dodajagent',component:DodajagentComponent},
  {path:'ponudeagent',component:PonudeagentComponent},
  {path:'registracije',component:RegistracijeComponent},
  {path:'korisnici',component:KorisniciComponent},
  {path:'nekretnineadmin',component:NekretnineadminComponent},
  {path:'sifraagent',component:SifraagentComponent},
  {path:'sifraadmin',component:SifraadminComponent},
  {path:'adminizmeni',component:AdminizmeniComponent},
  {path:'ponudeadmin',component:PonudeadminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

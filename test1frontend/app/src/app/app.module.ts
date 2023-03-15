import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AgentComponent } from './agent/agent.component';
import { SifraComponent } from './sifra/sifra.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProfileComponent } from './profile/profile.component';
import {MatTableModule} from '@angular/material/table';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { MojenekretnineComponent } from './mojenekretnine/mojenekretnine.component';
import { DodavanjenekretnineComponent } from './dodavanjenekretnine/dodavanjenekretnine.component';
import { EditnekretninaComponent } from './editnekretnina/editnekretnina.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MojeponudeComponent } from './mojeponude/mojeponude.component';

import { ChartsModule } from 'ng2-charts';
import { OdobravanjeComponent } from './odobravanje/odobravanje.component';
import { PromovisiComponent } from './promovisi/promovisi.component';
import { DodajagentComponent } from './dodajagent/dodajagent.component';
import { PonudeagentComponent } from './ponudeagent/ponudeagent.component';
import { RegistracijeComponent } from './registracije/registracije.component';
import { NekretnineadminComponent } from './nekretnineadmin/nekretnineadmin.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { SifraagentComponent } from './sifraagent/sifraagent.component';
import { SifraadminComponent } from './sifraadmin/sifraadmin.component';
import { AdminizmeniComponent } from './adminizmeni/adminizmeni.component';
import { PonudeadminComponent } from './ponudeadmin/ponudeadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    AgentComponent,
    SifraComponent,
    PocetnaComponent,
    ProfileComponent,
    NekretninaComponent,
    MojenekretnineComponent,
    DodavanjenekretnineComponent,
    EditnekretninaComponent,
    MojeponudeComponent,
    OdobravanjeComponent,
    PromovisiComponent,
    DodajagentComponent,
    PonudeagentComponent,
    RegistracijeComponent,
    NekretnineadminComponent,
    KorisniciComponent,
    SifraagentComponent,
    SifraadminComponent,
    AdminizmeniComponent,
    PonudeadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    NgImageSliderModule,
    MatTableModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

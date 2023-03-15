import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css']
})
export class NekretninaComponent implements OnInit {

  constructor(private ruter:Router,private ponService:PonudeService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.nekretnina=JSON.parse(localStorage.getItem("izabranaNekretnina"));
    this.ponudaBool=false;
    this.ponuda="0";
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    this.iznCena="0";
  }
  ponudaBool:boolean;
  ponuda:string;
  nekretnina:Nekretnina;
  kredit:string;
  loginedUser:User;
  iznCena:string;

  pocetak:string;
  kraj:string;

  dodavanje(){
    this.ruter.navigate(['dodavanjenekretnine']);
  }

  ponude(){
    this.ruter.navigate(['mojeponude']);
  }

  home(){
    this.ruter.navigate(['user']);
  }

  logout(){
    localStorage.clear();
    this.ruter.navigate(['']);
    
  }

  menjanjeSifre(){
    this.ruter.navigate(['sifra']);
  }

  profile(){
    this.ruter.navigate(['profile']);
  }

  odiNaMoje(){
    this.ruter.navigate(['mojenekretnine']);
  }

  posaljiPonudu(){
    if(this.loginedUser.username==this.nekretnina.vlasnik)this.snackbar.open("Ne mozete poslati ponudu samom sebi","OK")
    else{
    this.ponService.posaljiPonudu(this.loginedUser.username,this.nekretnina.vlasnik,parseInt(this.ponuda),this.nekretnina.id).subscribe((res)=>{
      window.location.reload();
      this.snackbar.open("Poslata ponuda","OK");
    })
  }
  }

  dajPonudu(){
    this.ponudaBool=!this.ponudaBool;
  }

  izaberiDatum(){
    if(this.loginedUser.username==this.nekretnina.vlasnik)this.snackbar.open("Ne mozete poslati ponudu samom sebi","OK")
    else{
    let poc=new Date(this.pocetak).toISOString().substring(0,10);
    let kraj=new Date(this.kraj).toISOString().substring(0,10);
    console.log(poc,kraj,this.iznCena);
    this.ponService.proveriDatume(this.nekretnina.id,poc,kraj).subscribe((resp)=>{
      if(resp['poruka']=='rezervisano')this.snackbar.open("Rezervisao je neko u tom periodu","OK");
      else{
        this.ponService.posaljiPonuduIznajmljivanje(this.loginedUser.username,this.nekretnina.vlasnik,parseInt(this.iznCena),this.nekretnina.id,poc,kraj).subscribe((res)=>{
          this.snackbar.open("Poslata je ponuda","Okej");
        })
      }
    })
  }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Ponuda } from '../models/ponuda';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-mojeponude',
  templateUrl: './mojeponude.component.html',
  styleUrls: ['./mojeponude.component.css']
})
export class MojeponudeComponent implements OnInit {

  constructor(private ruter: Router, private ponService: PonudeService, private nekService: NekretnineService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    this.ponService.getMojePonude(this.loginedUser.username).subscribe((ponude: Ponuda[]) => {
      this.mojePonude = ponude;

      for (let i = 0; i < ponude.length; i++) {

        this.nekService.getMojaNekretninaId(this.loginedUser.username, ponude[i].idNekretnine).subscribe((nek: Nekretnina) => {
          this.mojePonude[i].imeNekretnine = nek.naziv;
          console.log(nek.naziv);
        })
      }
    })

  }
  loginedUser: User;
  mojePonude: Ponuda[];
  naziviNekretnina: string[] = [];

  displayedColumns: string[] = ['poslao', 'naziv', 'ponuda', 'datumOd', 'datumDo', 'dugme'];

  prihvatiPonudu(idPonude, idNekretnine, datumOd, datumDo) {
    if (datumDo == "") {
      this.ponService.setPrihvati(idPonude).subscribe((res) => {
        this.ponService.prihvatiPonuduKupovina(this.loginedUser.username, idNekretnine).subscribe((resp) => {
          window.location.reload();
        });

      });
    }
    else{
      console.log("ovde:"+idNekretnine);
      this.ponService.setPrihvati(idPonude).subscribe((res)=>{
        console.log("ovde2:"+idNekretnine);
        this.ponService.proveriDatumePonuda(idNekretnine,datumOd,datumDo).subscribe((resp:Ponuda[])=>{
          
          for(let i=0;i<resp.length;i++){
            this.ponService.deletePonuda(resp[i].id).subscribe((r)=>{
              console.log(idNekretnine);

            })
          }
          window.location.reload();
          
        })
      })
    }
  }
  dodavanje(){
    this.ruter.navigate(['dodavanjenekretnine']);
  }

  ponude() {
    this.ruter.navigate(['mojeponude']);
  }

  home() {
    this.ruter.navigate(['user']);
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  menjanjeSifre() {
    this.ruter.navigate(['sifra']);
  }

  profile() {
    this.ruter.navigate(['profile']);
  }

  odiNaMoje() {
    this.ruter.navigate(['mojenekretnine']);
  }


}

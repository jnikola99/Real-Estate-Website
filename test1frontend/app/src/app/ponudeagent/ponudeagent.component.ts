import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Ponuda } from '../models/ponuda';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-ponudeagent',
  templateUrl: './ponudeagent.component.html',
  styleUrls: ['./ponudeagent.component.css']
})
export class PonudeagentComponent implements OnInit {

  constructor(private ruter:Router,private ponService:PonudeService,private nekService:NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="agent")this.ruter.navigate(['']);
    this.ponService.getMojePonude("Agencija").subscribe((ponude: Ponuda[]) => {
      this.mojePonude = ponude;

      for (let i = 0; i < ponude.length; i++) {

        this.nekService.getMojaNekretninaId("Agencija", ponude[i].idNekretnine).subscribe((nek: Nekretnina) => {
          this.mojePonude[i].imeNekretnine = nek.naziv;
          console.log(nek.naziv);
        })
      }
    })

    this.ponService.getPrihvacene().subscribe((pons:Ponuda[])=>{this.prodaje=pons})
  }
  displayedColumns: string[] = ['poslao', 'naziv', 'ponuda', 'datumOd', 'datumDo', 'dugme'];

  displayedColumns1: string[] = ['poslao','vlasnik', 'naziv', 'ponuda', 'datumOd', 'datumDo'];

  mojePonude: Ponuda[];
  naziviNekretnina: string[] = [];
  loginedUser:User;
  prodaje:Ponuda[];

  home() {
    this.ruter.navigate(['agent']);
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  prihvatiPonudu(idPonude, idNekretnine, datumOd, datumDo){
    if (datumDo == "") {
      this.ponService.setPrihvati(idPonude).subscribe((res) => {
        this.ponService.prihvatiPonuduKupovina("Agencija", idNekretnine).subscribe((resp) => {
          window.location.reload();
        });

      });
    }
    else{
      
      this.ponService.setPrihvati(idPonude).subscribe((res)=>{
        
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

  promovisanje() {
    this.ruter.navigate(['promovisanje'])
  }

  odobravanje() {
    this.ruter.navigate(['odobravanje']);
  }

  dodavanje() {
    this.ruter.navigate(['dodajagent'])
  }

  ponude() {
    this.ruter.navigate(['ponudeagent'])
  }

  sifra(){
    this.ruter.navigate(['sifraagent'])
  }

}

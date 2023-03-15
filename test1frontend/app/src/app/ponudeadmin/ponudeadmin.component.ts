import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Ponuda } from '../models/ponuda';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-ponudeadmin',
  templateUrl: './ponudeadmin.component.html',
  styleUrls: ['./ponudeadmin.component.css']
})
export class PonudeadminComponent implements OnInit {

  constructor(private ruter:Router,private ponService:PonudeService,private nekService:NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
    this.ponService.getMojePonude(this.loginedUser.username).subscribe((ponude: Ponuda[]) => {
      this.mojePonude = ponude;

      for (let i = 0; i < ponude.length; i++) {

        this.nekService.getMojaNekretninaId(this.loginedUser.username, ponude[i].idNekretnine).subscribe((nek: Nekretnina) => {
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

  prihvatiPonudu(idPonude, idNekretnine, datumOd, datumDo){
    if (datumDo == "") {
      this.ponService.setPrihvati(idPonude).subscribe((res) => {
        this.ponService.prihvatiPonuduKupovina(this.loginedUser.username, idNekretnine).subscribe((resp) => {
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

  home() {
    this.ruter.navigate(['admin']);
  }

  sifra(){
    this.ruter.navigate(['sifraadmin'])
  }

  ponude(){
    this.ruter.navigate(['ponudeadmin'])
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  nekretnineI(){
    this.ruter.navigate(['nekretnineadmin'])
  }

  korisnici(){
    this.ruter.navigate(['korisnici'])
  }

  registracije(){
    this.ruter.navigate(['registracije'])
  }
}

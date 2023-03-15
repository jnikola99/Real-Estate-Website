import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-promovisi',
  templateUrl: './promovisi.component.html',
  styleUrls: ['./promovisi.component.css']
})
export class PromovisiComponent implements OnInit {

  constructor(private ruter:Router,private nekService:NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="agent")this.ruter.navigate(['']);

    this.nekService.getNepromovisane().subscribe((neks:Nekretnina[])=>{
      this.nekretnine=neks
      this.nekService.getPromovisaneNekretnine().subscribe((nek:Nekretnina[])=>{
        this.nekretnineN=nek;
      })
    })
  }

  home() {
    this.ruter.navigate(['agent']);
  }

  loginedUser:User;
  nekretnine:Nekretnina[];
  nekretnineN:Nekretnina[];
  displayedColumns:string[]=['slika','naziv','adresa','tip','brojspratova','sprat','kvadratura','sobe','izdaje','cena','gradopstina','dugme'];


  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  promovisi(id){
    
    this.nekService.promovisiNekretninu(id).subscribe((res)=>{
      window.location.reload();
    })
  }

  nepromovisi(id){
    this.nekService.nepromovisiNekretninu(id).subscribe((res)=>{
      window.location.reload();
    })
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

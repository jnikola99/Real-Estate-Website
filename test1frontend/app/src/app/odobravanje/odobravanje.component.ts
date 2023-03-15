import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-odobravanje',
  templateUrl: './odobravanje.component.html',
  styleUrls: ['./odobravanje.component.css']
})
export class OdobravanjeComponent implements OnInit {

  constructor(private ruter:Router,private nekService:NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="agent")this.ruter.navigate(['']);
    this.nekService.getNeodobreneNekretnine().subscribe((neks:Nekretnina[])=>{
      this.nekretnine=neks;
    })
    
  }

  home() {
    this.ruter.navigate(['agent']);
  }

  loginedUser:User;
  nekretnine:Nekretnina[];

  displayedColumns:string[]=['slika','naziv','adresa','tip','brojspratova','sprat','kvadratura','sobe','izdaje','cena','gradopstina','dugme'];


  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  odobri(id){
    console.log(id);
    this.nekService.odobriNekretninu(id).subscribe((res)=>{
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
  this.ruter.navigate(['dodajagent']);
  }

  ponude() {
    this.ruter.navigate(['ponudeagent'])
  }

  sifra(){
    this.ruter.navigate(['sifraagent'])
  }
}

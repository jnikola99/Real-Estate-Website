import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mojenekretnine',
  templateUrl: './mojenekretnine.component.html',
  styleUrls: ['./mojenekretnine.component.css']
})
export class MojenekretnineComponent implements OnInit {

  constructor(private userService:UserService,private nekService:NekretnineService,private ruter:Router) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((rez:Nekretnina[])=>{
      this.nekretnine=rez;
    })
  }
  loginedUser:User;
  nekretnine:Nekretnina[];

  

  displayedColumns:string[]=['slika','naziv','adresa','tip','brojspratova','sprat','kvadratura','sobe','izdaje','cena','gradopstina','dugme'];


  edit(id){
    localStorage.setItem("id",JSON.stringify(id));
    this.ruter.navigate(['editn']);
  }

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


}

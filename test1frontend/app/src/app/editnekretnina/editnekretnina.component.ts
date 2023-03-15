import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-editnekretnina',
  templateUrl: './editnekretnina.component.html',
  styleUrls: ['./editnekretnina.component.css']
})
export class EditnekretninaComponent implements OnInit {

  constructor(private nekService:NekretnineService,private ruter:Router) { }

  ngOnInit(): void {
    this.nekretnine=new Array<Nekretnina>();
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    console.log(this.loginedUser.username);
    this.id=JSON.parse(localStorage.getItem("id"));
    console.log(this.id)
    this.nekService.getMojaNekretninaId(this.loginedUser.username,this.id).subscribe((res:Nekretnina)=>{
      this.nekretnine.push(res);
      this.nekret=res;
      console.log(res.naziv);
      console.log(this.nekretnine.length);
    })
  }

  loginedUser:User;
  id:string;
  naziv:string;
  adresa:string;
  tip:string;
  brojspratova:string; //toInt
  sprat:string;
  kvadratura:string;
  sobe:string;
  namestena:boolean;
  izdaje:string;
  cena:string;
  gradopstina:string;
  nekretnine:Array<Nekretnina>;
  nekret:Nekretnina;

  test:boolean=false;
  displayedColumns:string[]=['slika','naziv','adresa','tip','brojspratova','sprat','kvadratura','sobe','izdaje','cena','gradopstina'];

  promeniNaziv(id){
    if(this.naziv!=null){
      this.nekService.promeniNaziv(this.loginedUser.username,this.naziv,id).subscribe((res)=>{
        window.location.reload();
      })
    }
  }

  promeniAdresu(id){
    if(this.adresa!=null){
      this.nekService.promeniAdresu(this.loginedUser.username,this.adresa,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  promeniTip(id){
    if(this.tip!=null){
      this.nekService.promeniTip(this.loginedUser.username,this.tip,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
         
          window.location.reload();
        })
      })
    }
  }

  promeniBrojspratova(id){
    if(this.brojspratova!=null){
      this.nekService.promeniBrojspratova(this.loginedUser.username,parseInt(this.brojspratova),id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
         
          window.location.reload();
        })
      })
    }
  }

  promeniSprat(id){
    if(this.sprat!=null){
      this.nekService.promeniSprat(this.loginedUser.username,this.sprat,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  promeniKvadraturu(id){
    if(this.kvadratura!=null){
      this.nekService.promeniKvadraturu(this.loginedUser.username,this.kvadratura,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  promeniSobe(id){
    if(this.sobe!=null){
      this.nekService.promeniSobe(this.loginedUser.username,this.sobe,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  

  promeniIzdaje(id){
    if(this.izdaje!=null){
      this.nekService.promeniIzdaje(this.loginedUser.username,this.izdaje,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  promeniCenu(id){
    if(this.cena!=null){
      this.nekService.promeniCenu(this.loginedUser.username,parseInt(this.cena),id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
  }

  promeniGradopstinu(id){
    if(this.gradopstina!=null){
      this.nekService.promeniGradopstinu(this.loginedUser.username,this.gradopstina,id).subscribe((res)=>{
        this.nekService.getMojeNekretnine(this.loginedUser.username).subscribe((r:Nekretnina[])=>{
          
          window.location.reload();
        })
      })
    }
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

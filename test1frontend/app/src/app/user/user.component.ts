import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private ruter:Router,private nekService:NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    
    this.promovisaneNekretnine=[];
    this.imageObject=new Array<object>();
    this.nekService.getPromovisaneNekretnine().subscribe(
      (rez:Nekretnina[])=>{
        
        this.promovisaneNekretnine=rez;
        for(let e=0;e<rez.length;e++){
          var obj={
            image:"/assets/"+rez[e].galerija[0].path,
            thumbImage:"/assets/"+rez[e].galerija[0].path,
            title:rez[e].naziv
          }
          this.imageObject.push(obj);
        }
      }
    )

    for(let e=0;e<this.promovisaneNekretnine.length;e++){
      var obj={
        image:"/assets/"+this.promovisaneNekretnine[e].galerija[0].path,
        thumbImage:"/assets/"+this.promovisaneNekretnine[e].galerija[0].path,
        title:this.promovisaneNekretnine[e].naziv,
        alt:this.promovisaneNekretnine[e].id
      }
      this.imageObject.push(obj);
    }
   
  }

  loginedUser:User;

  imageObject:Array<object>;
  promovisaneNekretnine:Nekretnina[];
  donjiopseg:string;
  gornjiopseg:string;
  grad:string;
  nekretnine:Array<Nekretnina>;
  poceni:boolean=false;
  pogradu:boolean=false;


  getNekretnine(){
    if(this.poceni && this.pogradu && this.donjiopseg!=null && this.gornjiopseg!=null && this.grad!=null){
      this.nekretnine=null;
      this.nekService.getNekretnineCenaGrad(parseInt(this.donjiopseg),parseInt(this.gornjiopseg),this.grad).subscribe(
        (rez:Nekretnina[])=>{
          this.nekretnine=rez;
          this.donjiopseg=null;
          this.gornjiopseg=null;
          this.grad=null;
        }
      )
    }else if(this.poceni && this.donjiopseg!=null && this.gornjiopseg!=null){
      this.nekretnine=null;
      this.nekService.getNekretnineCena(parseInt(this.donjiopseg),parseInt(this.gornjiopseg)).subscribe(
        (rez:Nekretnina[])=>{
          this.nekretnine=rez;
          this.donjiopseg=null;
          this.gornjiopseg=null;
          this.grad=null;
        }     
       )
    }else if(this.pogradu && this.grad!=null){
      this.nekretnine=null;
      console.log(this.grad);
      this.nekService.getNekretnineGrad(this.grad).subscribe(
        (rez:Nekretnina[])=>{
          this.nekretnine=rez;
          this.donjiopseg=null;
          this.gornjiopseg=null;
          this.grad=null;
        }     
      )
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

  imageClickHandler(event){
   var a=(event.target as HTMLInputElement).alt;
    this.nekService.getNekretninaNaziv(a).subscribe((nek)=>{
      localStorage.setItem("izabranaNekretnina",JSON.stringify(nek));
      this.ruter.navigate(['nekretnina']);
    })
  }

  pogledaj(naziv){
    this.nekService.getNekretninaNaziv(naziv).subscribe((nek)=>{
      localStorage.setItem("izabranaNekretnina",JSON.stringify(nek));
      this.ruter.navigate(['nekretnina']);
    })
  }

 @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (event?.target['src']) {
      this.imageClickHandler(event);
    }
  }

}

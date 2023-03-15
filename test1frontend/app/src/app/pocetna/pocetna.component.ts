import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isBuffer } from 'util';

import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private nekService:NekretnineService,private ruter:Router) { }

  ngOnInit(): void {
    this.promovisaneNekretnine=[];
    this.imageObject=new Array<object>();
    this.nekService.getPromovisaneNekretnine().subscribe(
      (rez:Nekretnina[])=>{
        console.log(rez.length);
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
        title:this.promovisaneNekretnine[e].naziv
      }
      this.imageObject.push(obj);
    }
   
    
   
  }
  
  imageObject:Array<object>;
  donjiopseg:string;
  gornjiopseg:string;
  grad:string;
  nekretnine:Array<Nekretnina>;
  poceni:boolean=false;
  pogradu:boolean=false;
  promovisaneNekretnine:Nekretnina[];

  getNekretnine(){
    if(this.poceni && this.pogradu && this.donjiopseg!=null && this.gornjiopseg!=null && this.grad!=null){
      this.nekretnine=null;
      console.log(this.poceni,this.pogradu,this.donjiopseg,this.gornjiopseg,this.grad)
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

  home(){
    this.ruter.navigate(['']);
  }

  loginClick(){
    this.ruter.navigate(['login']);
  }

  registerClick(){
    this.ruter.navigate(['register']);
  }

  
}

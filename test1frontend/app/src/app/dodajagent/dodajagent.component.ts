import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Slika } from '../models/slika';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-dodajagent',
  templateUrl: './dodajagent.component.html',
  styleUrls: ['./dodajagent.component.css']
})
export class DodajagentComponent implements OnInit {

  constructor(private ruter:Router,private nekService:NekretnineService,private snackbar:MatSnackBar) { }
  form:FormGroup;
  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="agent")this.ruter.navigate(['']);
    this.form=new FormGroup({
      naziv:new FormControl(null,Validators.required),
      adresa:new FormControl(null,Validators.required),
      tip:new FormControl('Kuca'),
      sprat:new FormControl(""),
      brojspratova:new FormControl(null,Validators.required),
      kvadratura:new FormControl(null,Validators.required),
      sobe:new FormControl(null,Validators.required),
      namestena:new FormControl(false),
      izdaje:new FormControl('Prodaje se'),
      cena:new FormControl(null,Validators.required),
      gradopstina:new FormControl(null,Validators.required)
    })
    this.imagenames=new Array<Slika>();
    
  }

  images:FileList;
  imagenames:Array<Slika>;
  loginedUser:User;

  home() {
    this.ruter.navigate(['agent']);
  }
  
  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

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

  onSubmit(){
    if(this.images.length<3) this.snackbar.open("Unesite bar 3 slike","OK");
  
    else{
      for(let i=0;i<this.images.length;i++){
        let s=new Slika();
        s.path=this.images[i].name;
        this.imagenames.push(s);
      }
      this.nekService.uploadMany(this.images).subscribe((res)=>{
        this.nekService.dodajNekretninuAgent(this.form.value.naziv,this.form.value.gradopstina,this.form.value.adresa,this.form.value.tip,
          parseInt(this.form.value.brojspratova),this.form.value.sprat,this.form.value.kvadratura,this.form.value.izdaje,this.form.value.sobe,
          parseInt(this.form.value.cena),this.form.value.namestena,this.imagenames,"Agencija").subscribe((res)=>{
            window.location.reload();
          })
      })
    }
  }

  onFileSelect(event:Event){
    this.images=(event.target as HTMLInputElement).files;
  }

  get naziv(){ return this.form.get('naziv')};
  get adresa(){ return this.form.get('adresa')};
  get tip(){ return this.form.get('tip')}
  get gradopstina(){ return this.form.get('gradopstina')}
  get brojspratova(){ return this.form.get('brojspratova')}
  get kvadratura(){ return this.form.get('kvadratura')}
  get sobe(){ return this.form.get('sobe')}
  get namestena(){ return this.form.get('namestena')}
  get sprat(){return this.form.get('sprat')}
  get izdaje(){ return this.form.get('username')}
  get cena(){ return this.form.get('cena')}

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Slika } from '../models/slika';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-nekretnineadmin',
  templateUrl: './nekretnineadmin.component.html',
  styleUrls: ['./nekretnineadmin.component.css']
})
export class NekretnineadminComponent implements OnInit {

  constructor(private ruter:Router,private nekService:NekretnineService,private snackbar:MatSnackBar) { }
  form:FormGroup;
  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"))
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
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
    
    this.nekService.getNeodobreneNekretnine().subscribe((neks:Nekretnina[])=>{
      this.nekretnine=neks;
    })
  }

  loginedUser:User;
  images:FileList;
  imagenames:Array<Slika>;
  nekretnine:Nekretnina[];

  displayedColumns:string[]=['slika','naziv','adresa','tip','brojspratova','sprat','kvadratura','sobe','izdaje','cena','gradopstina','dugme'];

  home() {
    this.ruter.navigate(['admin']);
  }

  odobri(id){
    console.log(id);
    this.nekService.odobriNekretninu(id).subscribe((res)=>{
      window.location.reload();
    })
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

  sifra(){
    this.ruter.navigate(['sifraadmin'])
  }

  ponude(){
    this.ruter.navigate(['ponudeadmin'])
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
          parseInt(this.form.value.cena),this.form.value.namestena,this.imagenames,this.loginedUser.username).subscribe((res)=>{
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

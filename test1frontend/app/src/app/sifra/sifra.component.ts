import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sifra',
  templateUrl: './sifra.component.html',
  styleUrls: ['./sifra.component.css']
})
export class SifraComponent implements OnInit {

  constructor(private ruter:Router,private service:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.user.type!="korisnik")this.ruter.navigate(['']);
    this.form=new FormGroup({
      oldpassword: new FormControl(null,Validators.required),
      newpassword: new FormControl(null,[Validators.required,Validators.pattern(/^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/)]),
      confirm: new FormControl(null,[Validators.required,this.matchValues('newpassword')])
    }
    );
  }

  form:FormGroup;
  user:User;

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}
  
submit(){
  if(this.user.password!=this.form.value.oldpassword){
    alert('Old password is not OK');
  }
  else{
    this.service.change(this.form.value.newpassword,this.user.username);
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}

get oldpassword(){ return this.form.get('oldpassword')};
get newpassword(){ return this.form.get('newpassword')};
get confirm(){ return this.form.get('confirm')};

home(){
  this.ruter.navigate(['user']);
}

logout(){
  localStorage.clear();
  this.ruter.navigate(['']);
  
}

dodavanje(){
  this.ruter.navigate(['dodavanjenekretnine']);
}

ponude(){
  this.ruter.navigate(['mojeponude']);
}

menjanjeSifre(){
  this.ruter.navigate(['sifra']);
}

profile(){
  this.ruter.navigate(['profile'])
}
odiNaMoje(){
  this.ruter.navigate(['mojenekretnine']);
}

}

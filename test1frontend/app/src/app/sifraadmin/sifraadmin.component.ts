import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sifraadmin',
  templateUrl: './sifraadmin.component.html',
  styleUrls: ['./sifraadmin.component.css']
})
export class SifraadminComponent implements OnInit {

  constructor(private ruter:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
    this.form=new FormGroup({
      oldpassword: new FormControl(null,Validators.required),
      newpassword: new FormControl(null,[Validators.required,Validators.pattern(/^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/)]),
      confirm: new FormControl(null,[Validators.required,this.matchValues('newpassword')])
    }
    );
  }

  form:FormGroup;
  loginedUser:User;

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
  if(this.loginedUser.password!=this.form.value.oldpassword){
    alert('Old password is not OK');
  }
  else{
    this.userService.change(this.form.value.newpassword,this.loginedUser.username);
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}

  home() {
    this.ruter.navigate(['admin']);
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  nekretnine(){
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

  get oldpassword(){ return this.form.get('oldpassword')};
get newpassword(){ return this.form.get('newpassword')};
get confirm(){ return this.form.get('confirm')};

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registracije',
  templateUrl: './registracije.component.html',
  styleUrls: ['./registracije.component.css']
})
export class RegistracijeComponent implements OnInit {

  constructor(private ruter:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
    this.userService.getUnregistered().subscribe((users:User[])=>{
      this.dataSource=users;
    })
  }

  loginedUser:User;
  dataSource:User[]=[];
  displayedColumns:string[]=['imagePath','username','mail','firstname','lastname','country','city','odobri','odbij'];

  home() {
    this.ruter.navigate(['admin']);
  }

  sifra(){
    this.ruter.navigate(['sifraadmin'])
  }

  ponude(){
    this.ruter.navigate(['ponudeadmin'])
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

  odobri(username){
    this.userService.odobriProfil(username).subscribe((res)=>{
      window.location.reload();
    })
  }

  odbij(username){
    this.userService.odbijProfil(username).subscribe((res)=>{
      window.location.reload();
    })
  }

}


import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService,private ruter:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="korisnik")this.ruter.navigate(['']);
    this.dataSource.push(this.loginedUser);
  }
  loginedUser:User;

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

  dodavanje(){
    this.ruter.navigate(['dodavanjenekretnine']);
  }
  
  ponude(){
    this.ruter.navigate(['mojeponude']);
  }
  
  odiNaMoje(){
    this.ruter.navigate(['mojenekretnine']);
  }
  

  menja:string;
  username1:string;
  lastname1:string;
  mail1:string;
  country1:string;
  city1:string;

  imageData:string;
  imagePath:File;

  dataSource:User[]=[];
  displayedColumns:string[]=['imagePath','username','mail','firstname','lastname','country','city'];

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imagePath=file;
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }

  }

  promeniSliku(){
    if (this.imageData != null) {
      this.userService.upload(this.imagePath);
      this.userService.promeniSliku(this.loginedUser.username,this.imagePath).subscribe((res)=>{
        this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
          this.loginedUser=rez;
          localStorage.setItem("ulogovan",JSON.stringify(rez));
          console.log(this.loginedUser.imagepath);
         // window.location.reload();
          
        })
      });
    }

    this.imageData=null;


  }

  promeniUsername(){
    if(this.username1!=null){
      //console.log(this.menja);
    this.userService.promeniUsername(this.loginedUser.username,this.username1).subscribe((res)=>{
      if(res['message']=='postoji')this.snackbar.open("Postoji user sa tim username-om","Zatvori");
      else{
      this.userService.getProfile(this.username1).subscribe((rez:User)=>{
        this.loginedUser=rez;
        localStorage.setItem("ulogovan",JSON.stringify(rez));
        window.location.reload();
        this.ruter.navigate(['profile']);
      })
    }
    });
    }
  }

  promeniFirstname(){
    if(this.menja!=null){
      //console.log(this.menja);
    this.userService.promeniFirstname(this.loginedUser.username,this.menja).subscribe(()=>{
      this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
        this.loginedUser=rez;
        localStorage.setItem("ulogovan",JSON.stringify(rez));
        window.location.reload();
        this.ruter.navigate(['profile']);
      })
    });
    }
   
  
  }

  promeniLastname(){
    if(this.lastname1!=null){
      
    this.userService.promeniLastname(this.loginedUser.username,this.lastname1).subscribe(()=>{
      this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
        this.loginedUser=rez;
        localStorage.setItem("ulogovan",JSON.stringify(rez));
        window.location.reload();
        this.ruter.navigate(['profile']);
      })
    });
    }
  }

  promeniCountry(){
    if(this.country1!=null){
      
      this.userService.promeniCountry(this.loginedUser.username,this.country1).subscribe(()=>{
        this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
          this.loginedUser=rez;
          localStorage.setItem("ulogovan",JSON.stringify(rez));
          window.location.reload();
          this.ruter.navigate(['profile']);
        })
      });
      }
  }

  promeniCity(){
    if(this.city1!=null){
      
      this.userService.promeniCity(this.loginedUser.username,this.city1).subscribe(()=>{
        this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
          this.loginedUser=rez;
          localStorage.setItem("ulogovan",JSON.stringify(rez));
          window.location.reload();
          this.ruter.navigate(['profile']);
        })
      });
      }
  }

  promeniMail(){
    if(this.mail1!=null){
      
      this.userService.promeniMail(this.loginedUser.username,this.mail1).subscribe((res)=>{
        if(res['message']=='postoji')this.snackbar.open("Postoji user sa tim mailom","Zatvori");
        else{
        this.userService.getProfile(this.loginedUser.username).subscribe((rez:User)=>{
          
          this.loginedUser=rez;
          localStorage.setItem("ulogovan",JSON.stringify(rez));
          window.location.reload();
          this.ruter.navigate(['profile']);
        })
      }
      });
      }
  }
}

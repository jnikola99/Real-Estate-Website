import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adminizmeni',
  templateUrl: './adminizmeni.component.html',
  styleUrls: ['./adminizmeni.component.css']
})
export class AdminizmeniComponent implements OnInit {

  constructor(private ruter:Router,private userService:UserService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
    this.uname=JSON.parse(localStorage.getItem("useredit"));
    this.userService.getProfile(this.uname).subscribe((us:User)=>{
      this.dataSource.push(us);
      this.praviuser=us;
      
    })
  }

  uname:string;
  dataSource:User[]=[];
  loginedUser:User;
  praviuser:User;

  menja:string;
  username1:string;
  lastname1:string;
  mail1:string;
  country1:string;
  city1:string;

  imageData:string;
  imagePath:File;

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
      this.userService.promeniSliku(this.uname,this.imagePath).subscribe((res)=>{
        this.userService.getProfile(this.uname).subscribe((rez:User)=>{
          
          window.location.reload();
          
        })
      });
    }

    this.imageData=null;


  }

  promeniUsername(){
    if(this.username1!=null){
      //console.log(this.menja);
    this.userService.promeniUsername(this.uname,this.username1).subscribe((res)=>{
      if(res['message']=='postoji')this.snackbar.open("Postoji user sa tim username-om","Zatvori");
      else{
      this.userService.getProfile(this.username1).subscribe((rez:User)=>{
        
        window.location.reload();
        
      })
    }
    });
    }
  }

  promeniFirstname(){
    if(this.menja!=null){
      //console.log(this.menja);
    this.userService.promeniFirstname(this.uname,this.menja).subscribe(()=>{
      this.userService.getProfile(this.uname).subscribe((rez:User)=>{
      
        window.location.reload();
        
      })
    });
    }
   
  
  }

  promeniLastname(){
    if(this.lastname1!=null){
      
    this.userService.promeniLastname(this.uname,this.lastname1).subscribe(()=>{
      this.userService.getProfile(this.uname).subscribe((rez:User)=>{
        
        window.location.reload();
       
      })
    });
    }
  }

  promeniCountry(){
    if(this.country1!=null){
      
      this.userService.promeniCountry(this.uname,this.country1).subscribe(()=>{
        this.userService.getProfile(this.uname).subscribe((rez:User)=>{
          
          window.location.reload();
          
        })
      });
      }
  }

  promeniCity(){
    if(this.city1!=null){
      
      this.userService.promeniCity(this.uname,this.city1).subscribe(()=>{
        this.userService.getProfile(this.uname).subscribe((rez:User)=>{
          
          window.location.reload();
         
        })
      });
      }
  }

  promeniMail(){
    if(this.mail1!=null){
      
      this.userService.promeniMail(this.uname,this.mail1).subscribe((res)=>{
        if(res['message']=='postoji')this.snackbar.open("Postoji user sa tim mailom","Zatvori");
        else{
        this.userService.getProfile(this.uname).subscribe((rez:User)=>{
          
         
          window.location.reload();
       
        })
      }
      });
      }
  }
}

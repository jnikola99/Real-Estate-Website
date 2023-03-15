import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,private ruter:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  poruka:string;
  
  signIn(){
    this.userService.signInService(this.username, this.password).subscribe((user:User)=>{
      if(user && user.odobren){
        localStorage.setItem('ulogovan', JSON.stringify(user));
        if(user.username=='admin'){
          this.ruter.navigate(['admin']);
        }
        else{
          if(user.type=='agent'){
            this.ruter.navigate(['agent']);
          }
          else{
            this.ruter.navigate(['user']);
          }
        }
      }
      else{
        //alert('Proverite podatke jos jednom!');
        this.snackbar.open("Proverite jos jednom podatke!","Ponovni pokusaj");
        this.ruter.navigate(['login']);
      }
    })
  }

  register(){
    this.ruter.navigate(['register']);
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

import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  
  
  constructor(private http: HttpClient) { }

  imagename:string;

  signInService(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  getProfiles(){
    return this.http.get(`${this.uri}/users/getProfiles`);
  }

  register(username,firstname,lastname,password,mail,country,city,image:File){

    
    if(image==null){
      this.imagename="image.png"
    }
    else{
      this.imagename=image.name;
    }
    
    
    const profileData={
      username:username,
      imagename:this.imagename,
      firstname:firstname,
      lastname:lastname,
      password:password,
      mail:mail,
      country:country,
      city:city
    }
    
    return this.http.post(`${this.uri}/users/register`,profileData);
  }

  test:string;
  change(newpassword,username){
   
    const data={
      newpassword:newpassword,
      username:username
    }
    console.log(data.newpassword,data.username);
    return this.http.post(`${this.uri}/users/change`, data).subscribe((res)=>{
      this.test=res['message'];
      console.log(this.test);
    });

  }

  upload(image){
    console.log(image);
    
    /*const formData={
      image:image
    }
    this.http.post(`${this.uri}/file`,formData).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err)

    );*/
    const formData = new FormData();
    formData.append('file', image);

    this.http.post<any>('http://localhost:4000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  promeniUsername(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniUsername`,data);
  }

  promeniFirstname(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniFirstname`,data);
  }

  promeniLastname(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniLastname`,data);
  }

  promeniMail(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniMail`,data);
  }

  promeniCountry(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniCountry`,data);
  }

  promeniCity(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/users/promeniCity`,data);
  }

  getProfile(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/getProfile`,data);
  }

  promeniSliku(username,filename){
    this.imagename=filename.name;
    const data={
      username:username,
      filename:this.imagename
    }

    return this.http.post(`${this.uri}/users/promeniSliku`,data);
  }

  getUnregistered(){
    return this.http.get(`${this.uri}/users/getUnregistered`);
  }

  odobriProfil(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/odobriProfil`,data);
  }

  odbijProfil(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/odbijProfil`,data);
  }
}

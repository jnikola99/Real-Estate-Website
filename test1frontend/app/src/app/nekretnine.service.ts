import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretnineService {

  uri = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  getNekretnineGrad(grad){
    const data={
      grad:grad
    }
    return this.http.post(`${this.uri}/nekretnine/getNekretnineGrad`,data);
  }

  getNekretnineCena(donjiopseg,gornjiopseg){
    const data={
      donjiopseg:donjiopseg,
      gornjiopseg:gornjiopseg
    }
    return this.http.post(`${this.uri}/nekretnine/getNekretnineCena`,data);
  }

  getNekretnineCenaGrad(donjiopseg,gornjiopseg,grad){
    const data={
      donjiopseg:donjiopseg,
      grad:grad,
      gornjiopseg:gornjiopseg
    }
    return this.http.post(`${this.uri}/nekretnine/getNekretnineCenaGrad`,data);
  }

  getPromovisaneNekretnine(){
    console.log("in service")
    return this.http.get(`${this.uri}/nekretnine/getPromovisaneNekretnine`)
  }

  getMojeNekretnine(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/nekretnine/getMojeNekretnine`,data);
  }

  promeniNaziv(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniNaziv`,data);
  }
  
  promeniAdresu(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniAdresu`,data);
  }
  
  promeniTip(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniTip`,data);
  }
  
  promeniBrojspratova(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniBrojspratova`,data);
  }
  
  promeniSprat(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniSprat`,data);
  }
  
  promeniKvadraturu(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniKvadraturu`,data);
  }
  
  promeniSobe(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniSobe`,data);
  }
  
 /* promeniNamestena(username,menja){
    const data={
      username:username,
      menja:menja
    }
    return this.http.post(`${this.uri}/nekretnine/promeniNamestena`,data);
  }*/
  
  promeniIzdaje(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniIzdaje`,data);
  }
  
  promeniCenu(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniCenu`,data);
  }
  
  promeniGradopstinu(username,menja,id){
    const data={
      username:username,
      menja:menja,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promeniGradopstinu`,data);
  }

  getMojaNekretninaId(username,id){
    const data={
      username:username,
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/getMojaNekretninaId`,data);
  }

  getNekretninaNaziv(naziv){
    const data={
      naziv:naziv
    }
    return this.http.post(`${this.uri}/nekretnine/getNekretninaNaziv`,data);
  }

  uploadMany(images){
    const formData=new FormData();
    for(let i of images){
      formData.append('files',i);
    }

    return this.http.post(`${this.uri}/files`,formData)
  }

  dodajNekretninu(naziv,gradopstina,adresa,tip,brojspratova,sprat,kvadratura,izdaje,sobe,cena,namestena,imagenames,vlasnik){
    const data={
      naziv:naziv,
      gradopstina:gradopstina,
      adresa:adresa,
      tip:tip,
      brojspratova:brojspratova,
      sprat:sprat,
      kvadratura:kvadratura,
      izdaje:izdaje,
      sobe:sobe,
      cena:cena,
      namestena:namestena,
      imagenames:imagenames,
      vlasnik:vlasnik
    }

    return this.http.post(`${this.uri}/nekretnine/dodajNekretninu`,data);
  }

  dodajNekretninuAgent(naziv,gradopstina,adresa,tip,brojspratova,sprat,kvadratura,izdaje,sobe,cena,namestena,imagenames,vlasnik){
    const data={
      naziv:naziv,
      gradopstina:gradopstina,
      adresa:adresa,
      tip:tip,
      brojspratova:brojspratova,
      sprat:sprat,
      kvadratura:kvadratura,
      izdaje:izdaje,
      sobe:sobe,
      cena:cena,
      namestena:namestena,
      imagenames:imagenames,
      vlasnik:vlasnik
    }

    return this.http.post(`${this.uri}/nekretnine/dodajNekretninuAgent`,data);
  }

  getNeodobreneNekretnine(){
    return this.http.get(`${this.uri}/nekretnine/getNeodobreneNekretnine`);
  }

  odobriNekretninu(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/odobriNekretninu`,data)
  }

  getNepromovisane(){
    return this.http.get(`${this.uri}/nekretnine/getNepromovisane`);
  }

  promovisiNekretninu(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promovisiNekretninu`,data)
  }

  nepromovisiNekretninu(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/nepromovisiNekretninu`,data)
  }
}

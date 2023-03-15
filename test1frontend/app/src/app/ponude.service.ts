import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PonudeService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000'

  posaljiPonudu(poslao,vlasnik,ponuda,nekretninaId){
    const data={
      poslao:poslao,
      vlasnik:vlasnik,
      ponuda:ponuda,
      nekretninaId:nekretninaId
    }

    return this.http.post(`${this.uri}/ponude/posaljiPonudu`,data);
  }

  proveriDatume(id,pocetak,kraj){
    const data={
      id:id,
      pocetak:pocetak,
      kraj:kraj,
    }

    return this.http.post(`${this.uri}/ponude/proveriDatume`,data);
  }

  posaljiPonuduIznajmljivanje(poslao,vlasnik,ponuda,nekretninaId,pocetak,kraj){
    const data={
      poslao:poslao,
      vlasnik:vlasnik,
      ponuda:ponuda,
      nekretninaId:nekretninaId,
      pocetak:pocetak,
      kraj:kraj
    }
    return this.http.post(`${this.uri}/ponude/posaljiPonuduIznajmljivanje`,data);
  }

  getMojePonude(vlasnik){
    const data={
      vlasnik:vlasnik
    }

    return this.http.post(`${this.uri}/ponude/getMojePonude`,data);
  }

  setPrihvati(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/ponude/setPrihvati`,data);
  }

  prihvatiPonuduKupovina(vlasnik,idNekretnine){
    const data={
      vlasnik:vlasnik,
      idNekretnine:idNekretnine
    }

    return this.http.post(`${this.uri}/ponude/prihvatiPonuduKupovina`,data);
  }

  getPonudeNekretnina(vlasnik,idNekretnine){
    const data={
      vlasnik:vlasnik,
      idNekretnine:idNekretnine
    }

    return this.http.post(`${this.uri}/ponude/getPonudeNekretnina`,data);
  }

  proveriDatumePonuda(idNekretnine,pocetak,kraj){
    const data={
      idNekretnine:idNekretnine,
      pocetak:pocetak,
      kraj:kraj,
    }
    return this.http.post(`${this.uri}/ponude/proveriDatumePonuda`,data);
  
  }

  deletePonuda(idPonude){
    const data={
      idPonude:idPonude
    }
    return this.http.post(`${this.uri}/ponude/deletePonuda`,data);
  }

  getPrihvacene(){
    return this.http.get(`${this.uri}/ponude/getPrihvacene`);
  }
}

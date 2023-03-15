import { Slika } from "./slika";
import { User } from "./user";

export class Nekretnina{
    naziv:string;
    adresa:string;
    tip:string;
    brojspratova:number;
    sprat:string;
    kvadratura:string;
    sobe:string;
    namestena:boolean;
    izdaje:string;
    cena:number;
    vlasnik:string;
    galerija:Array<Slika>; // radi?
    id:number;
    gradopstina:string;
    promovisan:boolean;
    odobrena:boolean;
    
}
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, Color, Point } from 'chart.js';
import { Nekretnina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';



@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private ruter: Router, private nekService: NekretnineService) { }

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="agent")this.ruter.navigate(['']);
    this.nekService.getNekretnineCena(0, 500000).subscribe((nek: Nekretnina[]) => {
      this.barChartLabels = ['0-25000', '25000-50000', '50000-75000', '75000+'];

      for (let n of nek) {
        if (n.cena < 25000) {
          this.int1++
          this.label1 = "0-25000";
        }
        else if (n.cena >= 25000 && n.cena < 50000) {
          this.int2++
          this.label2 = "25000-50000";
        }
        else if (n.cena >= 50000 && n.cena < 75000) {
          this.int3++
          this.label3 = "50000-75000"
        }
        else {
          this.int4++
          this.label4 = "75000+"
        }
      }



      this.data1.push(this.int1);
      this.data1.push(this.int2);
      this.data1.push(this.int3);
      this.data1.push(this.int4);

      let a = {
        data: this.data1,
        label: "Broj nekretnina",
        backgroundColor: this.background
      }

      this.barChartData.push(a);

    })

    this.nekService.getNekretnineCena(0, 500000).subscribe((nek: Nekretnina[]) => {
      this.barChartLabels1 = ['Izdaje se', 'Prodaje se'];
      this.barChartLabels2 = ['Izdaje se', 'Prodaje se'];

      for (let n of nek) {
        if (n.tip == "Kuca") {
          if (n.izdaje == "Izdaje se") {
            this.cnt1++;
            this.lbl1 = "Izdaje se"
          }
          else if (n.izdaje == "Prodaje se") {
            this.cnt2++;
            this.lbl2 = "Prodaje se"
          }
        }else{
          if (n.izdaje == "Izdaje se") {
            this.cnt3++;
            this.lbl3 = "Izdaje se"
          }
          else if (n.izdaje == "Prodaje se") {
            this.cnt4++;
            this.lbl4 = "Prodaje se"
          }
        }
      }

      this.data2.push(this.cnt1);
      this.data2.push(this.cnt2);
      this.data3.push(this.cnt3);
      this.data3.push(this.cnt4);

      let b = {
        data: this.data2,
        label: "Broj nekretnina",
        backgroundColor: this.background
      }

      let c = {
        data: this.data3,
        label: "Broj nekretnina",
        backgroundColor: this.background
      }

      this.barChartData1.push(b);
      this.barChartData2.push(c);

      for(let n of nek){
        let i=0;
        let grad=n.gradopstina.split(",")[0];
        if(!this.gradovi.includes(grad)){
          this.gradovi.push(grad);
          let cnt=0;
          this.counter.push(cnt);
        }
        for(let c=0;c<this.counter.length;c++){
          if(grad==this.gradovi[c])this.counter[c]++
        }
      }
      this.barChartLabels3=this.gradovi;
      for(let i=0;i<this.counter.length;i++){
        this.data4.push(this.counter[i]);
      }

      let d={
        data:this.data4,
        label: "Broj nekretnina",
        backgroundColor:this.background
      }

      this.barChartData3.push(d);

    })

    

  }

  counter:number[]=[]


  loginedUser: User;

  int1: number = 0;
  int2: number = 0;
  int3: number = 0;
  int4: number = 0;

  cnt1: number = 0;
  cnt2: number = 0;
  lbl1: string;
  lbl2: string;

  cnt3: number = 0;
  cnt4: number = 0;
  lbl3: string;
  lbl4: string;

  data1: number[] = [];
  data2: number[] = [];
  data3: number[] = [];
  data4: number[] = [];
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  background: string[] = ['blue'];

  gradovi:string[]=[];

  home() {
    this.ruter.navigate(['agent']);
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  promovisanje() {
    this.ruter.navigate(['promovisanje'])
  }

  odobravanje() {
    this.ruter.navigate(['odobravanje']);
  }

  dodavanje() {
    this.ruter.navigate(['dodajagent'])
  }

  ponude() {
    this.ruter.navigate(['ponudeagent'])
  }

  sifra(){
    this.ruter.navigate(['sifraagent'])
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels = [];
  public barChartLegend = true;
  public barChartType = 'bar';

  public barChartData = [

  ]


  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels1 = [];
  public barChartLegend1 = true;
  public barChartType1 = 'bar';
  public barChartData1 = [];

  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels2 = [];
  public barChartLegend2 = true;
  public barChartType2 = 'bar';
  public barChartData2 = [];

  public barChartOptions3 = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels3 = [];
  public barChartLegend3 = true;
  public barChartType3 = 'bar';
  public barChartData3 = [];


}

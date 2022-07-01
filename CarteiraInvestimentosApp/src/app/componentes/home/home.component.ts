import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { Carteira } from 'src/app/models/carteira';
import { Usuario } from 'src/app/models/usuario';
import { CarteiraService } from 'src/app/services/carteira.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  chartData:any;
  dataTest!: any [];
  usuario:any;
  constructor(private service: CarteiraService) {
    Chart.register(...registerables);
   }
  
   carteira!: Carteira;

  ngOnInit(): void {
    this.usuario = this.getUsuario();

    this.service.ListarPeloId(this.usuario.usuarioId).subscribe(data =>{
      this.carteira = data;
      this.dataTest = [
        {nome: 'Poupanca', valor: this.carteira.valorTotalPoupanca},
        {nome: 'Renda Fixa', valor: this.carteira.valorTotalRendaFixa},
        {nome: 'Renda Variavel', valor: this.carteira.valorTotalRendaVariavel},
        {nome: 'Tesouro Direto', valor: this.carteira.valorTotalTesouroDireto},
      ]

      console.log(this.dataTest)

      for(let row in this.dataTest){
        this.chartData.data.push([
          this.dataTest[row].nome,
          this.dataTest[row].valor
        ])
      }
    })

    this.chartData = {
      type: 'PieChart',
      data: [],
      title: "Alocação Carteira",
      columnNames: ["Poupança", "Renda Fixa"],
        options: {
        pieHole: 0.45,
       
    },
    width: 520,
    height: 500
    };


    
  }
  getUsuario(){
    const usuario = window.sessionStorage.getItem("usuario");
    if(usuario != null){
      return JSON.parse(usuario)
    }
    return null;
  };

}


import { PoupancaService } from './../../../services/poupanca.service';
import { TesouroDiretoService } from 'src/app/services/tesouro-direto.service';
import { RendaFixaService } from 'src/app/services/renda-fixa.service';
import { RendaVariavelService } from 'src/app/services/renda-variavel.service';
import { RendaVariavel } from 'src/app/models/rendaVariavel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ReinvestimentoRendaVariavelComponent } from '../../rendaVariavel/reinvestimento-renda-variavel/reinvestimento-renda-variavel.component';
import { ReinvestimentoPoupancaComponent } from '../../poupanca/reinvestimento-poupanca/reinvestimento-poupanca.component';
import { ReinvestimentoTesouroDiretoComponent } from '../../tesouroDireto/reinvestimento-tesouro-direto/reinvestimento-tesouro-direto.component';
import { ReinvestimentoRendaFixaComponent } from '../../rendaFixa/reinvestimento-renda-fixa/reinvestimento-renda-fixa.component';

@Component({
  selector: 'app-reinvestimento',
  templateUrl: './reinvestimento.component.html',
  styleUrls: ['./reinvestimento.component.scss']
})
export class ReinvestimentoComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private poupService: PoupancaService, 
    private tesService: TesouroDiretoService,
    private rendFService: RendaFixaService,
    private rendVService: RendaVariavelService, 
    private toastr: ToastrService
  ) { }

  
  dataSource!: MatTableDataSource<any>;
  rendaVariavel! : RendaVariavel[];
  rendaFixa:any;
  rendVariavel:any;
  tesouroDireto:any;
  poupanca:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    

    this.rendFService.pegarTodos().subscribe(result => {
      this.rendaFixa = result;
    });

    this.poupService.pegarTodos().subscribe(data => {
      this.poupanca = data;
    });

    this.tesService.pegarTodos().subscribe((data) => {
      this.tesouroDireto = data;
    });

    this.rendVService.pegarTodos().subscribe((data) => {
      this.rendVariavel = data;
   });
  }


  // editarRendaFixa(row : any){
  //   this.dialog.open(AddEditRendaFixaComponent, {
  //     width: '40%',
  //     data: row
  //   }).afterClosed().subscribe(val =>{
  //     if(val === 'atualizado'){
  //       this.ListarTodosRendaFixa();
  //     }});
  // }

  openDialogRendaVariavel(row : any){
    this.dialog.open(ReinvestimentoRendaVariavelComponent, {
      width: '40%',
      data: row
    })
    
    // .afterClosed().subscribe(val =>{
    //   if(val === 'atualizado'){
    //     this.ListarTodosPoupanca();
    //   }});
  }
  openDialogRendaFixa(row : any){
    this.dialog.open(ReinvestimentoRendaFixaComponent, {
      width: '40%',
      data: row
    })
  }
  openDialogTesouroDireto(row : any){
    this.dialog.open(ReinvestimentoTesouroDiretoComponent, {
      width: '40%',
      data: row
    })
  }
  openDialogPoupanca(row : any){
    this.dialog.open(ReinvestimentoPoupancaComponent, {
      width: '40%',
      data: row
    })
  }

}

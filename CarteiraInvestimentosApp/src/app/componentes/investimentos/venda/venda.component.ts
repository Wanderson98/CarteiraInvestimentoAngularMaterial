import { CadastroComponent } from '../../poupanca/cadastro/cadastro.component';
import { CadastroRendaFixaComponent } from '../../rendaFixa/cadastro-renda-fixa/cadastro-renda-fixa.component';
import { CadastroRendaVariavelComponent } from '../../rendaVariavel/cadastro-renda-variavel/cadastro-renda-variavel.component';
import { CadastroTesouroDiretoComponent } from '../../tesouroDireto/cadastro-tesouro-direto/cadastro-tesouro-direto.component';
import { PoupancaService } from './../../../services/poupanca.service';
import { TesouroDiretoService } from 'src/app/services/tesouro-direto.service';
import { RendaFixaService } from 'src/app/services/renda-fixa.service';
import { RendaVariavelService } from 'src/app/services/renda-variavel.service';
import { AddEditRendaFixaComponent } from '../../rendaFixa/add-edit-renda-fixa/add-edit-renda-fixa.component';
import { RendaVariavel } from 'src/app/models/rendaVariavel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ReinvestimentoRendaVariavelComponent } from '../../rendaVariavel/reinvestimento-renda-variavel/reinvestimento-renda-variavel.component';
import { VendaRendaVariavelComponent } from '../../rendaVariavel/venda-renda-variavel/venda-renda-variavel.component';
import { VendaPoupancaComponent } from '../../poupanca/venda-poupanca/venda-poupanca.component';
import { VendaTesouroDiretoComponent } from '../../tesouroDireto/venda-tesouro-direto/venda-tesouro-direto.component';
import { VendaRendaFixaComponent } from '../../rendaFixa/venda-renda-fixa/venda-renda-fixa.component';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

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
    this.dialog.open(VendaRendaVariavelComponent, {
      width: '40%',
      data: row
    })
    
    // .afterClosed().subscribe(val =>{
    //   if(val === 'atualizado'){
    //     this.ListarTodosPoupanca();
    //   }});
  }
  openDialogRendaFixa(row : any){
    this.dialog.open(VendaRendaFixaComponent, {
      width: '40%',
      data: row
    })
  }
  openDialogTesouroDireto(row : any){
    this.dialog.open(VendaTesouroDiretoComponent, {
      width: '40%',
      data: row
    })
  }
  openDialogPoupanca(row : any){
    this.dialog.open(VendaPoupancaComponent, {
      width: '40%',
      data: row
    })
  }


}

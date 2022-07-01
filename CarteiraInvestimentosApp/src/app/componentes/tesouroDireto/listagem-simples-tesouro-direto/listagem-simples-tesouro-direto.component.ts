import { AddEditTesouroDiretoComponent } from './../add-edit-tesouro-direto/add-edit-tesouro-direto.component';
import { TesouroDiretoService } from './../../../services/tesouro-direto.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CadastroTesouroDiretoComponent } from '../cadastro-tesouro-direto/cadastro-tesouro-direto.component';
@Component({
  selector: 'app-listagem-simples-tesouro-direto',
  templateUrl: './listagem-simples-tesouro-direto.component.html',
  styleUrls: ['./listagem-simples-tesouro-direto.component.scss']
})
export class ListagemSimplesTesouroDiretoComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: TesouroDiretoService,  private toastr: ToastrService) { }

  displayedColumns: string[] = [ 'valorTotal','rendimento','rentabilidade','vencimento',
   'liquidez', 'custos','bancoNome','indexadorRendimentosNome'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosTesouro();
   
  }
  ListarTodosTesouro(){
    this.service.pegarTodosValor().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(result)
    
    });
  }
}

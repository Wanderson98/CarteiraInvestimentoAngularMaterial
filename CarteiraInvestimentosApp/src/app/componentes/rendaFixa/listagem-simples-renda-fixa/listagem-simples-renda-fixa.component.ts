import { AddEditRendaFixaComponent } from './../add-edit-renda-fixa/add-edit-renda-fixa.component';
import { RendaFixaService } from './../../../services/renda-fixa.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CadastroRendaFixaComponent } from '../cadastro-renda-fixa/cadastro-renda-fixa.component';

@Component({
  selector: 'app-listagem-simples-renda-fixa',
  templateUrl: './listagem-simples-renda-fixa.component.html',
  styleUrls: ['./listagem-simples-renda-fixa.component.scss']
})
export class ListagemSimplesRendaFixaComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: RendaFixaService,  private toastr: ToastrService) { }

  displayedColumns: string[] = [ 'nomeRendaFixa','valorTotal' ,'rendimento','rentabilidade','vencimento',
  'bancoNome','indexadorRendimentosNome', 'produtoRendaFixaNome', ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosRendaFixa();
   
  }

  ListarTodosRendaFixa(){
    this.service.pegarTodosValor().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
  }

}

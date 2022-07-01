import { CadastroComponent } from './../cadastro/cadastro.component';
import { AddEditPoupancaComponent } from './../add-edit-poupanca/add-edit-poupanca.component';
import { PoupancaService } from './../../../services/poupanca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-simples-poupanca',
  templateUrl: './listagem-simples-poupanca.component.html',
  styleUrls: ['./listagem-simples-poupanca.component.scss']
})
export class ListagemSimplesPoupancaComponent implements OnInit {
  constructor(public dialog: MatDialog, private service: PoupancaService, private toastr: ToastrService) { }

  displayedColumns: string[] = [ 'valorTotalInvestido', 'valorTotal','rendimento',
  'bancoNome' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {  
    this.ListarTodosPoupanca();

  }
 
  ListarTodosPoupanca(){
    this.service.pegarTodosValor().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

}

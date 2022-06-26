import { AddEditTesouroDiretoComponent } from './../add-edit-tesouro-direto/add-edit-tesouro-direto.component';
import { TesouroDiretoService } from './../../../services/tesouro-direto.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tesouro-direto',
  templateUrl: './list-tesouro-direto.component.html',
  styleUrls: ['./list-tesouro-direto.component.scss']
})
export class ListTesouroDiretoComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: TesouroDiretoService,  private toastr: ToastrService) { }

  displayedColumns: string[] = ['tesouroDiretoId', 'valorTotalInvestido', 'rendimento','rentabilidade','vencimento',
  'isActive', 'liquidez', 'custos','carteiraNome','bancoNome','indexadorRendimentosNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosTesouro();
   
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEditTesouroDiretoComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosTesouro();
      }
    });
   
  }

  ListarTodosTesouro(){
    this.service.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
  }

  editarTesouro(row : any){
    this.dialog.open(AddEditTesouroDiretoComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosTesouro();
      }});
  }
 apagarTesouro(id: number){
  this.service.excluirTesouro(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosTesouro(); 
    },
    error:()=> {
      this.toastr.warning('Algo deu errado', 'Error')
    }
  })
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

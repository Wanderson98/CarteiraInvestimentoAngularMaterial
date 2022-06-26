import { AddEditRendaFixaComponent } from './../add-edit-renda-fixa/add-edit-renda-fixa.component';
import { RendaFixaService } from './../../../services/renda-fixa.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-renda-fixa',
  templateUrl: './list-renda-fixa.component.html',
  styleUrls: ['./list-renda-fixa.component.scss']
})
export class ListRendaFixaComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: RendaFixaService,  private toastr: ToastrService) { }

  displayedColumns: string[] = ['rendaFixaId', 'nomeRendaFixa', 'rendimento','rentabilidade','vencimento',
  'isActive', 'liquidez', 'custos','carteiraNome','bancoNome','indexadorRendimentosNome', 'produtoRendaFixaNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosRendaFixa();
   
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEditRendaFixaComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosRendaFixa();
      }
    });
   
  }

  ListarTodosRendaFixa(){
    this.service.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
  }

  editarRendaFixa(row : any){
    this.dialog.open(AddEditRendaFixaComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosRendaFixa();
      }});
  }
 apagarRendaFixa(id: number){
  this.service.excluirRendaFixa(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosRendaFixa(); 
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

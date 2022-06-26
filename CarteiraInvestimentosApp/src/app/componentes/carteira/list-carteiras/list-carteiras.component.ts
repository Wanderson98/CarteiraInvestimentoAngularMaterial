import { AddEditCarteirasComponent } from './../add-edit-carteiras/add-edit-carteiras.component';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-carteiras',
  templateUrl: './list-carteiras.component.html',
  styleUrls: ['./list-carteiras.component.scss']
})
export class ListCarteirasComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: CarteiraService,  private toastr: ToastrService) { }

    displayedColumns: string[] = ['carteiraId', 'carteiraNome', 'dataInicial','usuarioNome','usuarioEmail','action'];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    ngOnInit(): void {
      this.ListarTodasCarteiras();
     
    }
    openDialog() {
      const dialogRef = this.dialog.open(AddEditCarteirasComponent,{
        width: '40%',
      }).afterClosed().subscribe(val =>{
        if(val === 'salvo'){
          this.ListarTodasCarteiras();
        }
      });
     
    }
  
    ListarTodasCarteiras(){
      this.service.ListarTodos().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
      });
    }
  
    editarCarteira(row : any){
      this.dialog.open(AddEditCarteirasComponent, {
        width: '40%',
        data: row
      }).afterClosed().subscribe(val =>{
        if(val === 'atualizado'){
          this.ListarTodasCarteiras();
        }});
    }
   apagarCarteira(id: number){
    this.service.ExcluirCarteira(id).subscribe({
      next:(res) => {
          this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
          this.ListarTodasCarteiras(); 
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

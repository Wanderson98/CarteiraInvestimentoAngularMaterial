import { AddEditUsuariosComponent } from './../add-edit-usuarios/add-edit-usuarios.component';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit {

    constructor(public dialog: MatDialog, private service: UsuarioService,  private toastr: ToastrService) { }

    displayedColumns: string[] = ['usuarioId', 'usuarioNome', 'usuarioSobrenome','usuarioEmail','usuarioTelefone','usuarioCpf','usuarioSenha','action'];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    ngOnInit(): void {
      this.ListarTodosUsuarios();
    }
    openDialog() {
      const dialogRef = this.dialog.open(AddEditUsuariosComponent,{
        width: '40%',
      }).afterClosed().subscribe(val =>{
        if(val === 'salvo'){
          this.ListarTodosUsuarios();
        }
      });
     
    }
  
    ListarTodosUsuarios(){
      this.service.pegarTodos().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    }
  
    editarUsuario(row : any){
      this.dialog.open(AddEditUsuariosComponent, {
        width: '40%',
        data: row
      }).afterClosed().subscribe(val =>{
        if(val === 'atualizado'){
          this.ListarTodosUsuarios();
        }});
    }
   apagarUsuario(id: number){
    this.service.excluirUsuario(id).subscribe({
      next:(res) => {
          this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
          this.ListarTodosUsuarios(); 
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

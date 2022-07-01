import { CadastroComponent } from '../../poupanca/cadastro/cadastro.component';
import { CadastroRendaFixaComponent } from '../../rendaFixa/cadastro-renda-fixa/cadastro-renda-fixa.component';
import { CadastroRendaVariavelComponent } from '../../rendaVariavel/cadastro-renda-variavel/cadastro-renda-variavel.component';
import { CadastroTesouroDiretoComponent } from '../../tesouroDireto/cadastro-tesouro-direto/cadastro-tesouro-direto.component';
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



@Component({
  selector: 'app-novoinvestimento',
  templateUrl: './novoinvestimento.component.html',
  styleUrls: ['./novoinvestimento.component.scss']
})
export class NovoinvestimentoComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private poupService: PoupancaService, 
    private tesService: TesouroDiretoService,
    private rendFService: RendaFixaService,
    private rendVService: RendaVariavelService, 
    private toastr: ToastrService) { }
  
  dataSource!: MatTableDataSource<any>;
  rendaVariavel! : RendaVariavel[];
  valorAtual:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.ListarTodosPoupanca();
    this.ListarTodosRendaFixa();
    this.ListarTodosTesouro();
    this.ListarTodosRendaVariavel();
  }

  openDialogCadPoup() {
    const dialogRef = this.dialog.open(CadastroComponent,{
      width: '50%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });
  }
  openDialogCadRV() {
    const dialogRef = this.dialog.open(CadastroRendaVariavelComponent,{
      width: '50%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });
  }
  openDialogCadRF() {
    const dialogRef = this.dialog.open(CadastroRendaFixaComponent,{
      width: '50%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });
  }
  openDialogCadTD() {
    const dialogRef = this.dialog.open(CadastroTesouroDiretoComponent,{
      width: '50%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });
  }
  ListarTodosPoupanca(){
    this.poupService.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }
  ListarTodosRendaFixa(){
    this.rendFService.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }
  ListarTodosTesouro(){
    this.tesService.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
  }
  ListarTodosRendaVariavel(){
    this.rendVService.pegarTodos().subscribe(result => {
    this.rendaVariavel = result;
    //atribui os dados recebitos para o datasource que vai ser exibido
    this.dataSource = new MatTableDataSource(this.rendaVariavel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   // this.pegarProdutoParaSerAtualizado(this.rendaVariavel);// tá comentado para economizar request se quiser testar só descomentar os campos marcados
    });
  }
  //metodo para atualizar o valor da cotacao atual
  // atualizarValorProduto(produto : RendaVariavel){  //- descomentar para usar
  //   //busca pela api externa os dados pelo nome do papel
  //     this.apiService.PegarValorAtual(produto.nomeDoPapel).subscribe(data => { // - descomentar para usar
  //     this.valorAtual = data; // - descomentar para usar
  //    //atribui o valor recebido pela api externa para o produto recebido no metodo
  //     produto.cotacaoAtual = this.valorAtual[0].price.last.value;  //- descomentar para usar
  //    //atualiza o produto como o valor atualizado no banco de dados
  //     this.service.atualizarRendaVariavel(produto).subscribe({ // - descomentar para usar
  //       next:(res) => { - descomentar para usar
  //         //atualiza a lista novamente com os dados atualizados
  //         this.ListarTodosRendaVariavel() //- descomentar para usar
  //       }, //- descomentar para usar
  //       error:()=> { - descomentar para usar
  //         //se der erro ele vai dar um aviso
  //         this.toastr.error('Algo deu errado', 'Error na atualização dos valores')// - descomentar para usar
  //       } //- descomentar para usar
  //     })// - descomentar para usar
  //   }); //- descomentar para usar

}

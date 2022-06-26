import { ProdutoRendaVariavel } from './../../../models/produtoRendaVariavel';
import { AddEditRendaVariavelComponent } from './../add-edit-renda-variavel/add-edit-renda-variavel.component';
import { AddEditProdutoRendaVariavelComponent } from './../../produtoRendaVariavel/add-edit-produto-renda-variavel/add-edit-produto-renda-variavel.component';
import { RendaVariavelService } from './../../../services/renda-variavel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RendaVariavel } from 'src/app/models/rendaVariavel';
import { AtualizarRendaVariavelService } from 'src/app/services/atualizar-renda-variavel.service';

@Component({
  selector: 'app-list-renda-variavel',
  templateUrl: './list-renda-variavel.component.html',
  styleUrls: ['./list-renda-variavel.component.scss']
})
export class ListRendaVariavelComponent implements OnInit {
//servicos usados
  constructor(public dialog: MatDialog, private service: RendaVariavelService,  private toastr: ToastrService,
    private apiService: AtualizarRendaVariavelService
    ) {   }
//display das colunas da tabela material
  displayedColumns: string[] = ['rendaVariavelId', 'nomeDoPapel', 'unidades','cotacaoMedia','cotacaoAtual',
  'isActive', 'rendimento', 'custos','carteiraNome','bancoNome', 'produtoRendaVariavelNome', 'action'];
  //dataSource que vai enviar os dados para a tabela
  dataSource!: MatTableDataSource<any>;
//tres atributos usados na atualização dos valores das açòes automaticamente
  rendaVariavel! : RendaVariavel[];
  valorAtual:any;
  atualizarValor!: RendaVariavel;
//dadis da material tabela
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    //chamada para pegar os dados toda vez que abre o componente
    this.ListarTodosRendaVariavel();
  }
  //metodo para abrir o dialogo para inserir/atualizar os dados
  openDialog() {
    //ele abre o matdialog com  o componente chamado
    const dialogRef = this.dialog.open(AddEditRendaVariavelComponent,{
      //define o tamanho do dialog
      width: '40%',
    }).afterClosed().subscribe(val =>{
      //verifica resposta do dialogo e atualiza a lista
      if(val === 'salvo'){
        this.ListarTodosRendaVariavel();
      }
    });

  }
  //metodo para pegar os dados
  ListarTodosRendaVariavel(){
    this.service.pegarTodos().subscribe(result => {
    this.rendaVariavel = result;
    //atribui os dados recebitos para o datasource que vai ser exibido
    this.dataSource = new MatTableDataSource(this.rendaVariavel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
   // this.pegarProdutoParaSerAtualizado(this.rendaVariavel);// tá comentado para economizar request se quiser testar só descomentar os campos marcados

    });
  }
//metodo para editar os dados
  editarRendaVariavel(row : any){
    //ele abre o matdialog com  o componente chamado
    this.dialog.open(AddEditRendaVariavelComponent, {
      width: '40%',
      //envia o dado para o outro componente
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosRendaVariavel();
      }});
  }
  //metodo para apagar um dado
 apagarRendaVariavel(id: number){
  this.service.excluirRendaVariavel(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosRendaVariavel();
    },
    error:()=> {
      this.toastr.warning('Algo deu errado', 'Error')
    }
  })
 }
 //metodo que pegar os produtos para atualizar o valor atual automaticamente
 pegarProdutoParaSerAtualizado(produto : any){
  //for que percorre os produtos que vieram pelo metodo
  for(var product in produto){
    //busca um produto para er atualizado pelo ID
    this.service.pegarPorId(produto[product].rendaVariavelId).subscribe(data => {
    //atribui o produto recebido
    this.atualizarValor = data;
    //passa o produto recebido para outro metodo que vai atualizar o valor da cotaçao atual
    //this.atualizarValorProduto(this.atualizarValor)// - descomentar para usar
      })


  }}
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

  //metodo para o filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

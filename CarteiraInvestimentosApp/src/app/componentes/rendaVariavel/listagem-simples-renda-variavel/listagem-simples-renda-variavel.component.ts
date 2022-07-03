import { ProdutoRendaVariavel } from './../../../models/produtoRendaVariavel';
import { AddEditRendaVariavelComponent } from './../add-edit-renda-variavel/add-edit-renda-variavel.component';
import { AddEditProdutoRendaVariavelComponent } from './../../produtoRendaVariavel/add-edit-produto-renda-variavel/add-edit-produto-renda-variavel.component';
import { RendaVariavelService } from './../../../services/renda-variavel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RendaVariavel } from 'src/app/models/rendaVariavel';
import { AtualizarRendaVariavelService } from 'src/app/services/atualizar-renda-variavel.service';
import { CadastroRendaVariavelComponent } from '../cadastro-renda-variavel/cadastro-renda-variavel.component';
import { DialogoExclusaoComponent } from '../dialogo-exclusao/dialogo-exclusao.component';


@Component({
  selector: 'app-listagem-simples-renda-variavel',
  templateUrl: './listagem-simples-renda-variavel.component.html',
  styleUrls: ['./listagem-simples-renda-variavel.component.scss']
})
export class ListagemSimplesRendaVariavelComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private service: RendaVariavelService,
    private toastr: ToastrService,
    private apiService: AtualizarRendaVariavelService
  ) {}
  //display das colunas da tabela material
  displayedColumns: string[] = [
   
    'nomeDoPapel',
    'unidades',
    'valorTotal',
    'cotacaoMedia',
    'cotacaoAtual',
    'rendimento',
    'bancoNome',
    'produtoRendaVariavelNome',
    
  ];
  //dataSource que vai enviar os dados para a tabela
  dataSource!: MatTableDataSource<any>;
  //tres atributos usados na atualização dos valores das açòes automaticamente
  rendaVariavel!: RendaVariavel[];
  valorAtual: any;
  atualizarValor!: RendaVariavel;
  //dadis da material tabela
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    //chamada para pegar os dados toda vez que abre o componente
    this.ListarTodosRendaVariavel();
  }
  //metodo para abrir o dialogo para inserir/atualizar os dados
  //metodo para pegar os dados
  ListarTodosRendaVariavel() {
    this.service.pegarTodosValor().subscribe((result) => {
      this.rendaVariavel = result;
      //atribui os dados recebitos para o datasource que vai ser exibido
      this.dataSource = new MatTableDataSource(this.rendaVariavel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

     //this.pegarProdutoParaSerAtualizado(this.rendaVariavel); // tá comentado para economizar request se quiser testar só descomentar os campos marcados
    });
  }
 

  //metodo que pegar os produtos para atualizar o valor atual automaticamente
  pegarProdutoParaSerAtualizado(produto: any) {
    //for que percorre os produtos que vieram pelo metodo
    for (var product in produto) {
      //busca um produto para er atualizado pelo ID
      this.service
        .pegarPorId(produto[product].rendaVariavel.rendaVariavelId)
        .subscribe((data) => {
          //atribui o produto recebido
          this.atualizarValor = data;
          //passa o produto recebido para outro metodo que vai atualizar o valor da cotaçao atual
          this.atualizarValorProduto(this.atualizarValor); // - descomentar para usar
        });
    }
  }
  //metodo para atualizar o valor da cotacao atual
  atualizarValorProduto(produto: RendaVariavel) {
    //- descomentar para usar
    //busca pela api externa os dados pelo nome do papel
    this.apiService.PegarValorAtual(produto.nomeDoPapel).subscribe((data) => {
      // - descomentar para usar
      this.valorAtual = data; // - descomentar para usar
      //atribui o valor recebido pela api externa para o produto recebido no metodo
      produto.cotacaoAtual = this.valorAtual[0].price.last.value; //- descomentar para usar
      //    //atualiza o produto como o valor atualizado no banco de dados
      this.service.atualizarRendaVariavel(produto).subscribe({
        // - descomentar para usar
        next: (res) => {
          
            // descomentar para usar
            //         //atualiza a lista novamente com os dados atualizados
          
            console.log('ok')
           //- descomentar para usar
        }, //- descomentar para usar
        error: () => {
          -(
            // descomentar para usar
            //         //se der erro ele vai dar um aviso
            this.toastr.error(
              'Algo deu errado',
              'Error na atualização dos valores'
            )
          ); // - descomentar para usar
        }, //- descomentar para usar
      }); // - descomentar para usar
    }); //- descomentar para usar
  }



}

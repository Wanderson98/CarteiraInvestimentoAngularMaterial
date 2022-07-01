import { RendaVariavel } from './../../../models/rendaVariavel';
import { ProdutoRendaVariavel } from './../../../models/produtoRendaVariavel';
import { ProdutoRendaVariavelService } from './../../../services/produto-renda-variavel.service';
import { RendaVariavelService } from './../../../services/renda-variavel.service';
import { Banco } from 'src/app/models/banco';
import { BancoService } from './../../../services/banco.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movimentacao } from 'src/app/models/movimentacao';
import { MovimentacaoService } from './../../../services/movimentacao.service';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-renda-variavel',
  templateUrl: './cadastro-renda-variavel.component.html',
  styleUrls: ['./cadastro-renda-variavel.component.scss']
})
export class CadastroRendaVariavelComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private service: RendaVariavelService,
    private movService: MovimentacaoService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<CadastroRendaVariavelComponent>,
    private bancoService: BancoService,
    private cartService: CarteiraService, 
    private produtoRVService: ProdutoRendaVariavelService,
    private router: Router
  ) { }
  produtosRV!: ProdutoRendaVariavel[];
  bancos!: Banco[];
  carteiras! : Carteira[];
  rendaVariavelForm!: FormGroup;
  movimentacaoForm!: FormGroup;
  actionBtn : string = "Salvar";
  rendaVId!: number;

  ngOnInit(): void {

    this.bancoService.ListarTodos().subscribe(data => {
      this.bancos = data;
    })

    this.cartService.ListarTodos().subscribe(data => {
      this.carteiras = data;
    });

    this.produtoRVService.pegarTodos().subscribe(data => {
      this.produtosRV = data;
    });

    this.rendaVariavelForm = this.formBuilder.group({
      rendaVariavelId : ['', Validators.required],
      nomeDoPapel : ['', Validators.required],
      rendimento : ['', Validators.required,],
      unidades : ['', Validators.required],
      cotacaoMedia : ['', ],
      isActive : ['true', Validators.required],
      cotacaoAtual : ['',],
      custos : ['', ],
      carteiraId : ['1', Validators.required],
      produtoRendaVariavelId : ['', Validators.required],
      bancoId : ['', Validators.required],

    });

    this.movimentacaoForm = this.formBuilder.group({
      movimentacaoId : ['', Validators.required],
      valor : ['', Validators.required],
      unidades : ['', Validators.required,],
      dataMovimentacao : ['', Validators.required],
      statusMovimentacaoId : [1, ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],
    });
  }

  EnviarFormulario(): void{

    const rendaVariavel : RendaVariavel = this.rendaVariavelForm.value;
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    rendaVariavel.cotacaoMedia = movimentacao.valor;
    movimentacao.unidades = rendaVariavel.unidades;
    
    if(!this.editData){
      this.service.salvarRendaVariavel(rendaVariavel).subscribe({
        next:(res) => {
       
            this.rendaVariavelForm.reset();
            this.rendaVId = res.rendaVariavelId;
            this.dialog.close('salvo');
            movimentacao.rendaVariavelid = this.rendaVId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                
                
                  this.movimentacaoForm.reset();
                  this.dialog.close('salvo');
                  setTimeout(() => {
                    this.router.navigate(['']);
                  }, 2000,  this.toastr.success('Gravando!', 'Inserido com Sucesso!'));
              },
              error:()=> {
                this.toastr.error('Algo deu errado', 'Error')
              }
            })
      
          },
          error:()=> {
            this.toastr.error('Algo deu errado', 'Error')
          }
        })
    }
  }

}

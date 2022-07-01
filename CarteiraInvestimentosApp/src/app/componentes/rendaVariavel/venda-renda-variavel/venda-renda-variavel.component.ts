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
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-renda-variavel',
  templateUrl: './venda-renda-variavel.component.html',
  styleUrls: ['./venda-renda-variavel.component.scss']
})
export class VendaRendaVariavelComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private service: RendaVariavelService,
    private movService: MovimentacaoService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<VendaRendaVariavelComponent>,
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
      statusMovimentacaoId : [2, ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.rendaVariavelForm.controls['nomeDoPapel'].setValue(this.editData.nomeDoPapel);
      this.rendaVariavelForm.controls['bancoId'].setValue(this.editData.bancoId);
      this.rendaVariavelForm.controls['produtoRendaVariavelId'].setValue(this.editData.produtoRendaVariavelId);
    }
  }

  EnviarFormulario(): void{

    const rendaVariavel : RendaVariavel = this.rendaVariavelForm.value;
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    rendaVariavel.cotacaoMedia = movimentacao.valor;
    movimentacao.unidades = rendaVariavel.unidades;
    rendaVariavel.rendaVariavelId = this.editData.rendaVariavelId
    
    if(this.editData){
      this.service.atualizarRendaVariavel(rendaVariavel).subscribe({
        next:(res) => {
        
            this.rendaVariavelForm.reset();
            this.dialog.close('salvo');
            movimentacao.rendaVariavelid =  this.editData.rendaVariavelId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                  this.toastr.success('Gravando!', 'Venda reaizada com Sucesso!');
                  this.movimentacaoForm.reset();
                  this.dialog.close('salvo');
                  this.router.navigate(['/']);
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

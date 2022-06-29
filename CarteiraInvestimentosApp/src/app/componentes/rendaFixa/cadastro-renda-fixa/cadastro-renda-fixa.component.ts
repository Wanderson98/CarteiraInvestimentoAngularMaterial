import { RendaFixa } from './../../../models/rendaFixa';
import { ProdutoRendaFixa } from './../../../models/produtoRendaFixa';
import { RendaFixaService } from './../../../services/renda-fixa.service';
import { IndexadorRendimentos } from './../../../models/indexadorRendimentos';
import { Banco } from 'src/app/models/banco';
import { IndexadorService } from './../../../services/indexador.service';
import { BancoService } from './../../../services/banco.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoRendaFixaService } from 'src/app/services/produto-renda-fixa.service';
import { Movimentacao } from 'src/app/models/movimentacao';
import { MovimentacaoService } from './../../../services/movimentacao.service';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';


@Component({
  selector: 'app-cadastro-renda-fixa',
  templateUrl: './cadastro-renda-fixa.component.html',
  styleUrls: ['./cadastro-renda-fixa.component.scss']
})
export class CadastroRendaFixaComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, 
    private service: RendaFixaService,
    private movService: MovimentacaoService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<CadastroRendaFixaComponent>,
    private bancoService: BancoService,
    private cartService: CarteiraService,  
    private indexService: IndexadorService, 
    private produtoRFService: ProdutoRendaFixaService
    ) { }
    produtosRF!: ProdutoRendaFixa[];
    bancos!: Banco[];
    carteiras! : Carteira[];
    indexadores! : IndexadorRendimentos[];
    rendaFixaForm!: UntypedFormGroup;
    movimentacaoForm!: FormGroup;
    actionBtn : string = "Salvar";
    rendaFId!: number;

  ngOnInit(): void {
    this.bancoService.ListarTodos().subscribe(data => {
      this.bancos = data;
    })

    this.cartService.ListarTodos().subscribe(data => {
      this.carteiras = data;
    });

    this.indexService.ListarTodos().subscribe(data => {
      this.indexadores = data;
    });

    this.produtoRFService.pegarTodos().subscribe(data => {
      this.produtosRF = data;
    });

    this.rendaFixaForm = this.formBuilder.group({
      rendaFixaId : ['', Validators.required],
      nomeRendaFixa : ['', Validators.required],
      rendimento : ['', Validators.required,],
      rentabilidade : ['', Validators.required],
      vencimento : ['', ],
      isActive : ['true', Validators.required],
      liquidez : ['',],
      custos : ['', ],
      carteiraId : [1, Validators.required],
      produtoRendaFixaId : ['', Validators.required],
      bancoId : ['', Validators.required],
      indexadorRendimentosId : ['', Validators.required],

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
    
    const rendaFixa : RendaFixa = this.rendaFixaForm.value; 
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    rendaFixa.rentabilidade = rendaFixa.rentabilidade /100;
    
    
    if(!this.editData){
      this.service.salvarRendaFixa(rendaFixa).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!RendaFixa');
            this.rendaFixaForm.reset();
            this.rendaFId = res.rendaFixaId;
            this.dialog.close('salvo');
            movimentacao.rendaFixaId = this.rendaFId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                  this.toastr.success('Gravando!', 'Inserido com Sucesso! REndaFixa');
                  this.movimentacaoForm.reset();
                  this.dialog.close('salvo');
            },
            error:()=> {
              this.toastr.error('Algo deu errado', 'Error RendaFixa')
            }
          })
        },
        error:()=> {
            this.toastr.error('Algo deu errado', 'Error RendaFixa')
        }
      })
    }
  }

}

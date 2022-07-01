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
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-renda-fixa',
  templateUrl: './venda-renda-fixa.component.html',
  styleUrls: ['./venda-renda-fixa.component.scss']
})
export class VendaRendaFixaComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, 
    private service: RendaFixaService,
    private movService: MovimentacaoService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<VendaRendaFixaComponent>,
    private bancoService: BancoService,
    private cartService: CarteiraService,  
    private indexService: IndexadorService, 
    private produtoRFService: ProdutoRendaFixaService,
    private router: Router
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
    console.log(this.editData)
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
      unidades : [1, Validators.required,],
      dataMovimentacao : ['', Validators.required],
      statusMovimentacaoId : [2, ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.rendaFixaForm.controls['nomeRendaFixa'].setValue(this.editData.nomeRendaFixa);
       this.rendaFixaForm.controls['rendimento'].setValue(this.editData.rendimento),
       this.rendaFixaForm.controls['rentabilidade'].setValue(this.editData.rentabilidade * 100),
       this.rendaFixaForm.controls['vencimento'].setValue(this.editData.vencimento),

       this.rendaFixaForm.controls['isActive'].setValue(this.editData.isActive),
       this.rendaFixaForm.controls['liquidez'].setValue(this.editData.liquidez),
       this.rendaFixaForm.controls['custos'].setValue(this.editData.custos),
       this.rendaFixaForm.controls['carteiraId'].setValue(this.editData.carteiraId);
       this.rendaFixaForm.controls['produtoRendaFixaId'].setValue(this.editData.produtoRendaFixaId);
       this.rendaFixaForm.controls['bancoId'].setValue(this.editData.bancoId);
       this.rendaFixaForm.controls['indexadorRendimentosId'].setValue(this.editData.indexadorRendimentosId)
    }
  }

  EnviarFormulario(): void{
    
    const rendaFixa : RendaFixa = this.rendaFixaForm.value; 
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    rendaFixa.rentabilidade = rendaFixa.rentabilidade /100;
    rendaFixa.rendaFixaId = this.editData.rendaFixaId;
    
    if(this.editData){
      this.service.atualizarRendaFixa(rendaFixa).subscribe({
        next:(res) => {
            
            this.rendaFixaForm.reset();

            this.dialog.close('salvo');
            movimentacao.rendaFixaId = this.editData.rendaFixaId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                  this.toastr.success('Gravando!', 'Venda realizada com sucesso');
                  this.movimentacaoForm.reset();
                  this.dialog.close('salvo');
                  this.router.navigate(['/']);
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

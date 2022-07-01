import { TesouroDireto } from './../../../models/tesouroDireto';
import { IndexadorRendimentos } from './../../../models/indexadorRendimentos';
import { Banco } from 'src/app/models/banco';
import { IndexadorService } from './../../../services/indexador.service';
import { BancoService } from './../../../services/banco.service';
import { TesouroDiretoService } from './../../../services/tesouro-direto.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Movimentacao } from 'src/app/models/movimentacao';
import { MovimentacaoService } from './../../../services/movimentacao.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reinvestimento-tesouro-direto',
  templateUrl: './reinvestimento-tesouro-direto.component.html',
  styleUrls: ['./reinvestimento-tesouro-direto.component.scss']
})
export class ReinvestimentoTesouroDiretoComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private service: TesouroDiretoService, 
    private movService: MovimentacaoService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<ReinvestimentoTesouroDiretoComponent>, 
    private bancoService: BancoService,
    private cartService: CarteiraService,  
    private indexService: IndexadorService,
    private router: Router
  ) { }
  bancos!: Banco[];
  carteiras! : Carteira[];
  indexadores! : IndexadorRendimentos[];
  tesouroForm!: UntypedFormGroup;
  movimentacaoForm!: FormGroup;
  actionBtn : string = "Salvar";
  tesouroId!: number;

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

    this.tesouroForm = this.formBuilder.group({
      tesouroDiretoId : ['', Validators.required],
      valorTotalInvestido : ['', Validators.required],
      rendimento : ['', Validators.required,],
      rentabilidade : ['', Validators.required],
      vencimento : ['', ],
      isActive : ['true', Validators.required],
      liquidez : ['', ],
      custos : ['',],
      carteiraId : [1, Validators.required],
      bancoId : ['', Validators.required],
      indexadorRendimentosId : ['', Validators.required],

    });

    this.movimentacaoForm = this.formBuilder.group({
      movimentacaoId : ['', Validators.required],
      valor : ['', Validators.required],
      unidades : [1, Validators.required,],
      dataMovimentacao : ['', Validators.required,],
      statusMovimentacaoId : [1, ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],
    });

    if(this.editData){
     
      this.actionBtn = "Atualizar";
      
      this.tesouroForm.controls['valorTotalInvestido'].setValue(this.editData.valorTotalInvestido);
       this.tesouroForm.controls['rendimento'].setValue(this.editData.rendimento),
       this.tesouroForm.controls['rentabilidade'].setValue(this.editData.rentabilidade * 100),
       this.tesouroForm.controls['vencimento'].setValue(this.editData.vencimento),
       this.tesouroForm.controls['isActive'].setValue(this.editData.isActive),
       this.tesouroForm.controls['liquidez'].setValue(this.editData.liquidez),
       this.tesouroForm.controls['custos'].setValue(this.editData.custos),
       this.tesouroForm.controls['carteiraId'].setValue(this.editData.carteiraId);
       this.tesouroForm.controls['bancoId'].setValue(this.editData.bancoId);
       this.tesouroForm.controls['indexadorRendimentosId'].setValue(this.editData.indexadorRendimentosId)
    }
  }

  EnviarFormulario(): void{
    const tesouroDireto : TesouroDireto = this.tesouroForm.value; 
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    tesouroDireto.rentabilidade = tesouroDireto.rentabilidade/100;
    tesouroDireto.valorTotalInvestido = movimentacao.valor * movimentacao.unidades;
    tesouroDireto.tesouroDiretoId = this.editData.tesouroDiretoId;
  

    if(this.editData){
      this.service.atualizarTesouro(tesouroDireto).subscribe({
        next:(res) => {
            
            this.tesouroForm.reset();
            this.dialog.close('salvo');
            movimentacao.tesouroDiretoId = this.editData.tesouroDiretoId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                this.toastr.success('Gravando!', 'Reinvestimento realizado com Sucesso!');
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

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
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoRendaFixaService } from 'src/app/services/produto-renda-fixa.service';

@Component({
  selector: 'app-add-edit-renda-fixa',
  templateUrl: './add-edit-renda-fixa.component.html',
  styleUrls: ['./add-edit-renda-fixa.component.scss']
})
export class AddEditRendaFixaComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private service: RendaFixaService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditRendaFixaComponent>, private bancoService: BancoService,
    private cartService: CarteiraService,  private indexService: IndexadorService, 
    private produtoRFService: ProdutoRendaFixaService
    ) { }
    produtosRF!: ProdutoRendaFixa[];
    bancos!: Banco[];
    carteiras! : Carteira[];
    indexadores! : IndexadorRendimentos[];
    rendaFixaForm!: UntypedFormGroup;
    actionBtn : string = "Salvar";
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
      tesouroDiretoId : ['', Validators.required],
      nomeRendaFixa : ['', Validators.required],
      valorTotalInvestido : ['', Validators.required],
      rendimento : ['', Validators.required],
      rentabilidade : ['', Validators.required],
      vencimento : ['', ],
      isActive : ['', Validators.required],
      liquidez : ['',],
      custos : ['', ],
      carteiraId : ['', Validators.required],
      produtoRendaFixaId : ['', Validators.required],
      bancoId : ['', Validators.required],
      indexadorRendimentosId : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.rendaFixaForm.controls['nomeRendaFixa'].setValue(this.editData.rendaFixa.nomeRendaFixa);
       this.rendaFixaForm.controls['rendimento'].setValue(this.editData.rendaFixa.rendimento),
       this.rendaFixaForm.controls['rentabilidade'].setValue(this.editData.rendaFixa.rentabilidade * 100),
       this.rendaFixaForm.controls['vencimento'].setValue(this.editData.rendaFixa.vencimento),
       this.rendaFixaForm.controls['valorTotalInvestido'].setValue(this.editData.rendaFixa.valorTotalInvestido),
       this.rendaFixaForm.controls['isActive'].setValue(this.editData.rendaFixa.isActive),
       this.rendaFixaForm.controls['liquidez'].setValue(this.editData.rendaFixa.liquidez),
       this.rendaFixaForm.controls['custos'].setValue(this.editData.rendaFixa.custos),
       this.rendaFixaForm.controls['carteiraId'].setValue(this.editData.rendaFixa.carteiraId);
       this.rendaFixaForm.controls['produtoRendaFixaId'].setValue(this.editData.rendaFixa.produtoRendaFixaId);
       this.rendaFixaForm.controls['bancoId'].setValue(this.editData.rendaFixa.bancoId);
       this.rendaFixaForm.controls['indexadorRendimentosId'].setValue(this.editData.rendaFixa.indexadorRendimentosId)
    }
  }

  EnviarFormulario(): void{
    
    const rendaFixa : RendaFixa = this.rendaFixaForm.value; 
    rendaFixa.rentabilidade = rendaFixa.rentabilidade /100;
    if(!this.editData){
      this.service.salvarRendaFixa(rendaFixa).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.rendaFixaForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      rendaFixa.rendaFixaId = this.editData.rendaFixa.rendaFixaId
      this.service.atualizarRendaFixa(rendaFixa).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.rendaFixaForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }

}

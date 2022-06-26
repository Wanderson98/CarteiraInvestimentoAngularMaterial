import { TesouroDireto } from './../../../models/tesouroDireto';
import { IndexadorRendimentos } from './../../../models/indexadorRendimentos';
import { Banco } from 'src/app/models/banco';
import { IndexadorService } from './../../../services/indexador.service';
import { BancoService } from './../../../services/banco.service';
import { TesouroDiretoService } from './../../../services/tesouro-direto.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-tesouro-direto',
  templateUrl: './add-edit-tesouro-direto.component.html',
  styleUrls: ['./add-edit-tesouro-direto.component.scss']
})
export class AddEditTesouroDiretoComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private service: TesouroDiretoService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditTesouroDiretoComponent>, private bancoService: BancoService,
    private cartService: CarteiraService,  private indexService: IndexadorService
    ) { }
    bancos!: Banco[];
    carteiras! : Carteira[];
    indexadores! : IndexadorRendimentos[];
    tesouroForm!: UntypedFormGroup;
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

    this.tesouroForm = this.formBuilder.group({
      tesouroDiretoId : ['', Validators.required],
      valorTotalInvestido : ['', Validators.required],
      rendimento : ['', Validators.required,],
      rentabilidade : ['', Validators.required],
      vencimento : ['', ],
      isActive : ['', Validators.required],
      liquidez : ['', ],
      custos : ['',],
      carteiraId : ['', Validators.required],
      bancoId : ['', Validators.required],
      indexadorRendimentosId : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.tesouroForm.controls['valorTotalInvestido'].setValue(this.editData.valorTotalInvestido);
       this.tesouroForm.controls['rendimento'].setValue(this.editData.rendimento),
       this.tesouroForm.controls['rentabilidade'].setValue(this.editData.rentabilidade),
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
    const TesouroDireto : TesouroDireto = this.tesouroForm.value; 
    TesouroDireto.rentabilidade = TesouroDireto.rentabilidade/100;
    if(!this.editData){
      this.service.salvarTesouro(TesouroDireto).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.tesouroForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      TesouroDireto.tesouroDiretoId = this.editData.tesouroDiretoId
      this.service.atualizarTesouro(TesouroDireto).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.tesouroForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }


}

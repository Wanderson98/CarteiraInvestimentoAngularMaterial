import { PoupancaService } from './../../../services/poupanca.service';
import { Banco } from 'src/app/models/banco';
import { IndexadorService } from './../../../services/indexador.service';
import { BancoService } from './../../../services/banco.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poupanca } from 'src/app/models/poupanca';


@Component({
  selector: 'app-add-edit-poupanca',
  templateUrl: './add-edit-poupanca.component.html',
  styleUrls: ['./add-edit-poupanca.component.scss']
})
export class AddEditPoupancaComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private service: PoupancaService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditPoupancaComponent>, private bancoService: BancoService,
    private cartService: CarteiraService,  private indexService: IndexadorService
    ) { }

    bancos!: Banco[];
    carteiras! : Carteira[];
    poupancaForm!: UntypedFormGroup;
    actionBtn : string = "Salvar";

  ngOnInit(): void {

    this.bancoService.ListarTodos().subscribe(data => {
      this.bancos = data;
    })

    this.cartService.ListarTodos().subscribe(data => {
      this.carteiras = data;
    });

    this.poupancaForm = this.formBuilder.group({
      poupancaId : ['', Validators.required],
      valorTotalInvestido : ['', Validators.required],
      rendimento : ['', Validators.required,],
      isActive : ['', Validators.required],
      carteiraId : ['', Validators.required],
      bancoId : ['', Validators.required],


    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.poupancaForm.controls['valorTotalInvestido'].setValue(this.editData.poupanca.valorTotalInvestido);
       this.poupancaForm.controls['rendimento'].setValue(this.editData.poupanca.rendimento),
       this.poupancaForm.controls['isActive'].setValue(this.editData.poupanca.isActive),
       this.poupancaForm.controls['carteiraId'].setValue(this.editData.poupanca.carteiraId);
       this.poupancaForm.controls['bancoId'].setValue(this.editData.poupanca.bancoId);

    }
  }

  EnviarFormulario(): void{
    const poupanca : Poupanca = this.poupancaForm.value;
   
    if(!this.editData){
      this.service.salvarPoupanca(poupanca).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.poupancaForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      poupanca.poupancaId = this.editData.poupanca.poupancaId
      this.service.atualizarPoupanca(poupanca).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.poupancaForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }

  


}

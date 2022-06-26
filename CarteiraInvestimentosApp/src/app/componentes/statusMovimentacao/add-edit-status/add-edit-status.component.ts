import { StatusMovimentacao } from './../../../models/statusMovimentacao';
import { StatusMovimentacaoService } from './../../../services/status-movimentacao.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-status',
  templateUrl: './add-edit-status.component.html',
  styleUrls: ['./add-edit-status.component.scss']
})
export class AddEditStatusComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private service: StatusMovimentacaoService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditStatusComponent>
    ) { }
    statusForm!: UntypedFormGroup;
    actionBtn : string = "Salvar";
  ngOnInit(): void {

    this.statusForm = this.formBuilder.group({
      statusMovimentacaoNome : ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.statusForm.controls['statusMovimentacaoNome'].setValue(this.editData.statusMovimentacaoNome);
    }
  }

  EnviarFormulario(): void{
    const status : StatusMovimentacao = this.statusForm.value;
    if(!this.editData){
      this.service.SalvarStatusMovimentacao(status).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.statusForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      status.statusMovimentacaoId = this.editData.statusMovimentacaoId
      this.service.AtualizarStatusMovimentacao(status).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.statusForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }
}

import { IndexadorRendimentos } from './../../../models/indexadorRendimentos';
import { IndexadorService } from './../../../services/indexador.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-indexador-rendimentos',
  templateUrl: './add-edit-indexador-rendimentos.component.html',
  styleUrls: ['./add-edit-indexador-rendimentos.component.scss']
})
export class AddEditIndexadorRendimentosComponent implements OnInit {
 //indexadorRendimentosId indexadorRendimentosNome
 indexador!: UntypedFormGroup;
 actionBtn : string = "Salvar";

 constructor(private formBuilder: UntypedFormBuilder, private service: IndexadorService, private toastr: ToastrService,
   @Inject(MAT_DIALOG_DATA) public editData : any,
   private dialog : MatDialogRef<AddEditIndexadorRendimentosComponent>
 ){}
 ngOnInit(): void {
   this.indexador = this.formBuilder.group({
    indexadorRendimentosNome : ['', Validators.required]
   });
   if(this.editData){
     this.actionBtn = "Atualizar";
     this.indexador.controls['indexadorRendimentosNome'].setValue(this.editData.indexadorRendimentosNome);
   }
 }


 EnviarFormulario(): void{
   const indexador : IndexadorRendimentos = this.indexador.value;
   if(!this.editData){
     this.service.SalvarIndexadorRendimentos(indexador).subscribe({
       next:(res) => {
           this.toastr.success('Gravando!', 'Inserido com Sucesso!');
           this.indexador.reset();
           this.dialog.close('salvo');
       },
       error:()=> {
         this.toastr.error('Algo deu errado', 'Error')
       }
     })
   } else{
    indexador.indexadorRendimentosId = this.editData.indexadorRendimentosId
     this.service.AtualizarIndexadorRendimentos(indexador).subscribe({
       next:(res) => {
           this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
           this.indexador.reset();
           this.dialog.close('atualizado');
       },
       error:()=> {
         this.toastr.error('Algo deu errado', 'Error')
       }
     })
   }
   
 }

}

import { ProdutoRendaVariavel } from './../../../models/produtoRendaVariavel';
import { ProdutoRendaVariavelService } from './../../../services/produto-renda-variavel.service';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-produto-renda-variavel',
  templateUrl: './add-edit-produto-renda-variavel.component.html',
  styleUrls: ['./add-edit-produto-renda-variavel.component.scss']
})
export class AddEditProdutoRendaVariavelComponent implements OnInit {
 // produtoRendaVariavelNome produtoRendaVariavelId
 produtoRVForm!: FormGroup;
 actionBtn : string = "Salvar";
 constructor(private formBuilder: FormBuilder, private service: ProdutoRendaVariavelService, private toastr: ToastrService,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialog : MatDialogRef<AddEditProdutoRendaVariavelComponent>
){}

  ngOnInit(): void {
    this.produtoRVForm = this.formBuilder.group({
      produtoRendaVariavelNome : ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.produtoRVForm.controls['produtoRendaVariavelNome'].setValue(this.editData.produtoRendaVariavelNome);
    }
  }
  EnviarFormulario(): void{
    const produtoRV : ProdutoRendaVariavel = this.produtoRVForm.value;
    if(!this.editData){
      this.service.salvarProdutoRendaVariavel(produtoRV).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.produtoRVForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      produtoRV.produtoRendaVariavelId = this.editData.produtoRendaVariavelId
      this.service.atualizarProdutoRendaVariavel(produtoRV).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.produtoRVForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }
}

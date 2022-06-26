import { ProdutoRendaFixa } from './../../../models/produtoRendaFixa';
import { ProdutoRendaFixaService } from './../../../services/produto-renda-fixa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-produto-renda-fixa',
  templateUrl: './add-edit-produto-renda-fixa.component.html',
  styleUrls: ['./add-edit-produto-renda-fixa.component.scss']
})
export class AddEditProdutoRendaFixaComponent implements OnInit {


  produtoRFForm!: UntypedFormGroup;
  actionBtn : string = "Salvar";

  constructor(private formBuilder: UntypedFormBuilder, private service: ProdutoRendaFixaService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditProdutoRendaFixaComponent>
  ){}
  ngOnInit(): void {
    this.produtoRFForm = this.formBuilder.group({
      produtoRendaFixaNome : ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.produtoRFForm.controls['produtoRendaFixaNome'].setValue(this.editData.produtoRendaFixaNome);
    }
  }


  EnviarFormulario(): void{
    const produtoRF : ProdutoRendaFixa = this.produtoRFForm.value;
    if(!this.editData){
      this.service.salvarProdutoRendaFixa(produtoRF).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.produtoRFForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      produtoRF.produtoRendaFixaId = this.editData.produtoRendaFixaId
      this.service.atualizarProdutoRendaFixa(produtoRF).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.produtoRFForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }
}

import { Usuario } from './../../../models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-add-edit-carteiras',
  templateUrl: './add-edit-carteiras.component.html',
  styleUrls: ['./add-edit-carteiras.component.scss']
})
export class AddEditCarteirasComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private service: CarteiraService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditCarteirasComponent>, private userService: UsuarioService
    ) { }
    usuarios! : Usuario[];
    carteiraForm!: UntypedFormGroup;
    actionBtn : string = "Salvar";
  ngOnInit(): void {

    this.userService.pegarTodos().subscribe(data => {
      this.usuarios = data;
    })

    this.carteiraForm = this.formBuilder.group({
      carteiraNome : ['', Validators.required],
      dataInicial : ['', Validators.required],
      usuarioId : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.carteiraForm.controls['carteiraNome'].setValue(this.editData.carteiraNome);
      this.carteiraForm.controls['dataInicial'].setValue(this.editData.dataInicial);
      this.carteiraForm.controls['usuarioId'].setValue(this.editData.usuarioId);
     
    }
  }

  EnviarFormulario(): void{
    const carteira : Carteira = this.carteiraForm.value;
    
    
    if(!this.editData){
      this.service.SalvarCarteira(carteira).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.carteiraForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      carteira.carteiraId = this.editData.carteiraId
      this.service.AtualizarCarteira(carteira).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.carteiraForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }


}

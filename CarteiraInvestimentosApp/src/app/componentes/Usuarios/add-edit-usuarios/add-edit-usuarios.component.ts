import { Usuario } from './../../../models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.scss']
})
export class AddEditUsuariosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: UsuarioService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditUsuariosComponent>
    ) { }
 
    usuarioForm!: FormGroup;
    loginForm!: FormGroup
    actionBtn : string = "Salvar";
  ngOnInit(): void {

    this.usuarioForm = this.formBuilder.group({
      usuarioNome : ['', Validators.required],
      usuarioSobrenome : ['', Validators.required],
      usuarioEmail : ['', Validators.required],
      usuarioTelefone : ['', Validators.required],
      usuarioCpf : ['', Validators.required],
      usuarioSenha : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.usuarioForm.controls['usuarioNome'].setValue(this.editData.usuarioNome);
      this.usuarioForm.controls['usuarioSobrenome'].setValue(this.editData.usuarioSobrenome);
      this.usuarioForm.controls['usuarioEmail'].setValue(this.editData.usuarioEmail);
      this.usuarioForm.controls['usuarioTelefone'].setValue(this.editData.usuarioTelefone);
      this.usuarioForm.controls['usuarioCpf'].setValue(this.editData.usuarioCpf);
      this.usuarioForm.controls['usuarioSenha'].setValue(this.editData.usuarioSenha);
    }
  }

  EnviarFormulario(): void{
    const usuario : Usuario = this.usuarioForm.value;
   
    if(!this.editData){
      this.service.salvarUsuario(usuario).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.usuarioForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      usuario.usuarioId = this.editData.usuarioId
      this.service.atualizarUsuario(usuario).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.usuarioForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }
    
  }

}

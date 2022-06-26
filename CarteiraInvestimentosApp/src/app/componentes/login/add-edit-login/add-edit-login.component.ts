import { LoginService } from './../../../services/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-add-edit-login',
  templateUrl: './add-edit-login.component.html',
  styleUrls: ['./add-edit-login.component.scss']
})
export class AddEditLoginComponent implements OnInit {

  loginForm!: FormGroup;
 actionBtn : string = "Salvar";
 constructor(private formBuilder: FormBuilder, private service: LoginService, private toastr: ToastrService,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialog : MatDialogRef<AddEditLoginComponent>
){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail : ['', Validators.required],
      loginSenha : ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.loginForm.controls['loginEmail'].setValue(this.editData.loginEmail);
      this.loginForm.controls['loginSenha'].setValue(this.editData.loginSenha);
    }
  }
  EnviarFormulario(): void{
    const produtoRV : Login = this.loginForm.value;
    if(!this.editData){
      this.service.SalvarLogin(produtoRV).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.loginForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      produtoRV.loginId = this.editData.loginId
      this.service.AtualizarLogin(produtoRV).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.loginForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }

}

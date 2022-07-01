import { Usuario } from './../../../models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.component.html',
  styleUrls: ['./login-cadastro.component.scss']
})
export class LoginCadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: UsuarioService, private toastr: ToastrService, private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<LoginCadastroComponent>
    ) { }

    usuarioForm!: FormGroup;
    loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail : ['', Validators.required],
      loginSenha : ['', Validators.required]
    });
    this.usuarioForm = this.formBuilder.group({
      usuarioNome : ['', Validators.compose([Validators.required])],
      usuarioSobrenome : ['', Validators.compose([Validators.required])],
      usuarioEmail : ['', Validators.compose([Validators.required, Validators.email])],
      usuarioTelefone : ['',Validators.compose([Validators.required])],
      usuarioCpf : ['', Validators.compose([Validators.required])],
      usuarioSenha : ['', Validators.compose([Validators.required])],

    });
  }

  EnviarFormulario(): void{
    const usuario : Usuario = this.usuarioForm.value;
    const login : Login = this.loginForm.value;
    if(!this.editData){
      this.service.salvarUsuario(usuario).subscribe({

        next:(res) => {
           
            login.loginEmail = usuario.usuarioEmail;
            login.loginSenha = usuario.usuarioSenha;
            this.usuarioForm.reset();

            this.loginService.SalvarLogin(login).subscribe({
              next:(res) => {
                this.toastr.success('Gravando!', 'Inserido com Sucesso!');
                  this.loginForm.reset();
                  this.dialog.close('sucesso');
              },
              error:()=> {
                this.toastr.error('Algo deu errado', 'Error')
              }
            })
       
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
          this.dialog.close('error');
        }
      })
    }
  }
}

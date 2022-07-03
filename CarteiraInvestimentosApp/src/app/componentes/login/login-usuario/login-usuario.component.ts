import { LoginService } from './../../../services/login.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Login } from 'src/app/models/login';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCadastroComponent } from '../login-cadastro/login-cadastro.component';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  usuarioForm!: FormGroup;
  loginUs: any;
  constructor(private service: LoginService, 
    private router: Router, 
    private toastr: ToastrService,
    private usuService: UsuarioService,
    public dialog: MatDialog) 
    { 
    this.loginUs = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.email])),
      senha: new FormControl(null, Validators.compose([Validators.minLength(6)])),    
    });
  }
  loginForm!: FormGroup;
  ngOnInit(): void {
    
  }

  login(): void{

    const email = this.loginUs.get('email').value;
    const senha = this.loginUs.get('senha').value;
    var login = new Login(email, senha);

    this.usuService.obterUsuarioPorEmailSenha(email,senha).subscribe(
      (resp)=>{
        this.toastr.success('Login realizado com sucesso.', 'Sucesso!');
        window.sessionStorage.setItem('usuario', JSON.stringify(resp));
        this.router.navigate(['']);
        console.log(resp);
      },
      (error)=>{
        this.toastr.error('Verifique o email e a senha.', 'Atenção!');
      }
    )
  }

  loginCadastro(){
    this.dialog.open(LoginCadastroComponent, {
      width: '40%',
     
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.router.navigate(['/']);
      }else{
     
        this.loginUs.reset();
      }
      
    });
  }

}

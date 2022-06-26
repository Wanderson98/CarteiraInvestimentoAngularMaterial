import { BancoService } from './../../services/banco.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Banco } from 'src/app/models/banco';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'




@Component({
  selector: 'app-add-edit-banco',
  templateUrl: './add-edit-banco.component.html',
  styleUrls: ['./add-edit-banco.component.scss']
})
export class AddEditBancoComponent implements OnInit {
  //imports servicos usados pelo construtor
  constructor(private formBuilder: FormBuilder, private service: BancoService, private toastr: ToastrService,
   //injeção de dados que que vieram do outro componente
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditBancoComponent>
    ) { }
 //formulario que sai vai salvar o produto
  bancoForm!: FormGroup;
  //atributo que mudar o nome do dialog para salvar ou atualizar
  actionBtn : string = "Salvar";

  ngOnInit(): void {
//construçao do formulario
      this.bancoForm = this.formBuilder.group({
        bancoNome : ['', Validators.required]
      });
//verifica se veio data e muda o dado para atualizar e prenche o formulario com os dados
      if(this.editData){
        this.actionBtn = "Atualizar";
        this.bancoForm.controls['bancoNome'].setValue(this.editData.bancoNome);
      }
  }
//formulario para envio ou atualização dos dados
  EnviarFormulario(): void{
    const banco : Banco = this.bancoForm.value;
    if(!this.editData){
      this.service.SalvarBanco(banco).subscribe({
        //verifica se deu tudo certo, ele avisa que deu tudo certo, limpa o formulario e fecha o dialog
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.bancoForm.reset();
            this.dialog.close('salvo');
        },
        //aviso de erro
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      //adicinar o ID para ser atualizado
      banco.bancoId = this.editData.bancoId
      this.service.AtualizarBanco(banco).subscribe({
      //verifica se deu tudo certo, ele avisa que deu tudo certo, limpa o formulario e fecha o dialog
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.bancoForm.reset();
            this.dialog.close('atualizado');
        },
         //aviso de erro
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }

}

import { RendaVariavel } from './../../../models/rendaVariavel';
import { ProdutoRendaVariavel } from './../../../models/produtoRendaVariavel';
import { ProdutoRendaVariavelService } from './../../../services/produto-renda-variavel.service';
import { RendaVariavelService } from './../../../services/renda-variavel.service';
import { Banco } from 'src/app/models/banco';
import { BancoService } from './../../../services/banco.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-renda-variavel',
  templateUrl: './add-edit-renda-variavel.component.html',
  styleUrls: ['./add-edit-renda-variavel.component.scss']
})
export class AddEditRendaVariavelComponent implements OnInit {
//construto com o servicos q são usados
  constructor(private formBuilder: FormBuilder, private service: RendaVariavelService, private toastr: ToastrService,
    //injeção dos dados recebidos do outro componente que irao para o formulario quando for atualizar
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditRendaVariavelComponent>, private bancoService: BancoService,
    private cartService: CarteiraService,
    private produtoRVService: ProdutoRendaVariavelService
    ) { }
    //atributos usados no formulario
    produtosRV!: ProdutoRendaVariavel[];
    bancos!: Banco[];
    carteiras! : Carteira[];
    //formulario para inclusão atualizaçao dos dados
    rendaVariavelForm!: FormGroup;
    // Nome do botão que muda de acordo
    actionBtn : string = "Salvar";

  ngOnInit(): void {
    //recebimentos dos dados para dar opçao para o formulario nos campos de chave estrangeira
    this.bancoService.ListarTodos().subscribe(data => {
      this.bancos = data;
    })

    this.cartService.ListarTodos().subscribe(data => {
      this.carteiras = data;
    });

    this.produtoRVService.pegarTodos().subscribe(data => {
      this.produtosRV = data;
    });
//contrução dos formularios
    this.rendaVariavelForm = this.formBuilder.group({
      rendaVariavelId : ['', Validators.required],
      nomeDoPapel : ['', Validators.required],
      rendimento : ['', Validators.required,],
      unidades : ['', Validators.required],
      cotacaoMedia : ['', ],
      isActive : ['', Validators.required],
      cotacaoAtual : ['',],
      custos : ['', ],
      carteiraId : ['', Validators.required],
      produtoRendaVariavelId : ['', Validators.required],
      bancoId : ['', Validators.required],

    });
    //atribuição dos dados recebidos ao formulario quando for para atualizar
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.rendaVariavelForm.controls['nomeDoPapel'].setValue(this.editData.nomeDoPapel);
       this.rendaVariavelForm.controls['rendimento'].setValue(this.editData.rendimento),
       this.rendaVariavelForm.controls['unidades'].setValue(this.editData.unidades),
       this.rendaVariavelForm.controls['cotacaoMedia'].setValue(this.editData.cotacaoMedia),
       this.rendaVariavelForm.controls['isActive'].setValue(this.editData.isActive),
       this.rendaVariavelForm.controls['cotacaoAtual'].setValue(this.editData.cotacaoAtual),
       this.rendaVariavelForm.controls['custos'].setValue(this.editData.custos),
       this.rendaVariavelForm.controls['carteiraId'].setValue(this.editData.carteiraId);
       this.rendaVariavelForm.controls['produtoRendaVariavelId'].setValue(this.editData.produtoRendaVariavelId);
       this.rendaVariavelForm.controls['bancoId'].setValue(this.editData.bancoId);

    }
  }
 //metodo para salvar ou atualizar os dados
  EnviarFormulario(): void{

    const rendaVariavel : RendaVariavel = this.rendaVariavelForm.value;

    if(!this.editData){
      this.service.salvarRendaVariavel(rendaVariavel).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.rendaVariavelForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
       //define o ID para ser atualizado com o id recebido
      rendaVariavel.rendaVariavelId = this.editData.rendaVariavelId
      this.service.atualizarRendaVariavel(rendaVariavel).subscribe({
         //verifica se deu tudo certo, ele avisa que deu tudo certo, limpa o formulario e fecha o dialog
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.rendaVariavelForm.reset();
            this.dialog.close('atualizado');
        },
        //aviso se dê erro
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }

}

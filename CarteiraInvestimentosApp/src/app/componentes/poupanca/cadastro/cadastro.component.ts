import { PoupancaService } from './../../../services/poupanca.service';
import { Banco } from 'src/app/models/banco';
import { BancoService } from './../../../services/banco.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poupanca } from 'src/app/models/poupanca';
import { MovimentacaoService } from 'src/app/services/movimentacao.service'; 
import { Movimentacao } from 'src/app/models/movimentacao';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: PoupancaService,
    private movService: MovimentacaoService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<CadastroComponent>,
    private bancoService: BancoService,
    private cartService: CarteiraService,
    private router: Router
    ) { }

    bancos!: Banco[];
    carteiras! : Carteira[];
    poupancaForm!: UntypedFormGroup;
    movimentacaoForm!: FormGroup;
    actionBtn : string = "Salvar";
    poupId! : number;

  ngOnInit(): void {

    this.bancoService.ListarTodos().subscribe(data => {
      this.bancos = data;
    })

    this.cartService.ListarTodos().subscribe(data => {
      this.carteiras = data;
    });

    this.poupancaForm = this.formBuilder.group({
      poupancaId : ['', Validators.required],
      valorTotalInvestido : ['', Validators.required],
      rendimento : ['', Validators.required,],
      isActive : ['true', Validators.required],
      carteiraId : [1, Validators.required],
      bancoId : ['', Validators.required],

    });

    this.movimentacaoForm = this.formBuilder.group({
      movimentacaoId : ['', Validators.required],
      valor : ['', Validators.required],
      unidades : [1, Validators.required,],
      dataMovimentacao : ['', Validators.required],
      statusMovimentacaoId : [1, ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],
    });

  }
  EnviarFormulario(): void{
    const poupanca : Poupanca = this.poupancaForm.value;
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    poupanca.valorTotalInvestido = movimentacao.valor * movimentacao.unidades;
   
    if(!this.editData){
      this.service.salvarPoupanca(poupanca).subscribe({
        next:(res) => {

            this.poupancaForm.reset();
            this.poupId = res.poupancaId;
            this.dialog.close('salvo');
            movimentacao.poupancaId = this.poupId;
            this.movService.Salvarmovimentacao(movimentacao).subscribe({
              next:(res) => {
                this.toastr.success('Gravando!', 'Inserido com Sucesso!');
                  this.movimentacaoForm.reset();
                  this.dialog.close('salvo');
                  this.router.navigate(['/']);
              },
              error:()=> {
                this.toastr.error('Algo deu errado', 'Error movimentacao')
              }
            })
            
        },
        error:()=> {
          this.toastr.error('Algo deu errado Poupanca', 'Error')
        }
      })

     
    }
  }


}

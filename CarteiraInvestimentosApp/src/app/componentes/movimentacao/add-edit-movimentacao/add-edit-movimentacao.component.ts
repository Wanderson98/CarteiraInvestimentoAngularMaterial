import { MovimentacaoService } from './../../../services/movimentacao.service';
import { Movimentacao } from './../../../models/movimentacao';
import { PoupancaService } from './../../../services/poupanca.service';
import { RendaFixa } from './../../../models/rendaFixa';
import { TesouroDireto } from './../../../models/tesouroDireto';
import { Poupanca } from './../../../models/poupanca';
import { Banco } from 'src/app/models/banco';
import { IndexadorService } from './../../../services/indexador.service';
import { BancoService } from './../../../services/banco.service';
import { TesouroDiretoService } from './../../../services/tesouro-direto.service';
import { Carteira } from './../../../models/carteira';
import { CarteiraService } from './../../../services/carteira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RendaVariavel } from 'src/app/models/rendaVariavel';
import { RendaFixaService } from 'src/app/services/renda-fixa.service';
import { RendaVariavelService } from 'src/app/services/renda-variavel.service';
import { StatusMovimentacao } from 'src/app/models/statusMovimentacao';
import { StatusMovimentacaoService } from 'src/app/services/status-movimentacao.service';

@Component({
  selector: 'app-add-edit-movimentacao',
  templateUrl: './add-edit-movimentacao.component.html',
  styleUrls: ['./add-edit-movimentacao.component.scss']
})
export class AddEditMovimentacaoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private service: MovimentacaoService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialog : MatDialogRef<AddEditMovimentacaoComponent>,
    private poupService: PoupancaService,
    private tesService: TesouroDiretoService,
    private rendaFixaServ: RendaFixaService,
    private rendaVariavelService: RendaVariavelService,
    private statusMovService: StatusMovimentacaoService

    ) { }

    poupancas! : Poupanca[];
    tesouroDiretos!: TesouroDireto[];
    rendaFixas!: RendaFixa[];
    rendaVariavels!: RendaVariavel[];
    statusMovimentacao!: StatusMovimentacao[];
    movimentacaoForm!: FormGroup;
    actionBtn : string = "Salvar";

  ngOnInit(): void {

    this.poupService.pegarTodos().subscribe(data => {
      this.poupancas = data;
    });

    this.tesService.pegarTodos().subscribe((data) => {
      this.tesouroDiretos = data;
    });

    this.rendaFixaServ.pegarTodos().subscribe((data) => {
       this.rendaFixas = data;
    });

    this.rendaVariavelService.pegarTodos().subscribe((data) => {
       this.rendaVariavels = data;
    });

    this.statusMovService.ListarTodos().subscribe((data) => {
      this.statusMovimentacao = data;
    });

    this.movimentacaoForm = this.formBuilder.group({
      movimentacaoId : ['', Validators.required],
      valor : ['', Validators.required],
      unidades : ['', Validators.required,],
      dataMovimentacao : ['', Validators.required],
      statusMovimentacaoId : ['', ],
      rendaVariavelid : ['', Validators.required],
      rendaFixaId : ['', ],
      tesouroDiretoId : ['',],
      poupancaId : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.movimentacaoForm.controls['valor'].setValue(this.editData.valor);
       this.movimentacaoForm.controls['unidades'].setValue(this.editData.unidades),
       this.movimentacaoForm.controls['dataMovimentacao'].setValue(this.editData.dataMovimentacao),
       this.movimentacaoForm.controls['statusMovimentacaoId'].setValue(this.editData.statusMovimentacaoId),
       this.movimentacaoForm.controls['rendaVariavelid'].setValue(this.editData.rendaVariavelId),
       this.movimentacaoForm.controls['rendaFixaId'].setValue(this.editData.rendaFixaId),
       this.movimentacaoForm.controls['tesouroDiretoId'].setValue(this.editData.tesouroDiretoId),
       this.movimentacaoForm.controls['poupancaId'].setValue(this.editData.poupancaId);
    }
  }

  EnviarFormulario(): void{
    const movimentacao : Movimentacao = this.movimentacaoForm.value;
    console.log(movimentacao);
    if(!this.editData){
      this.service.Salvarmovimentacao(movimentacao).subscribe({
        next:(res) => {
            this.toastr.success('Gravando!', 'Inserido com Sucesso!');
            this.movimentacaoForm.reset();
            this.dialog.close('salvo');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    } else{
      movimentacao.movimentacaoId = this.editData.movimentacaoId
      this.service.Atualizarmovimentacao(movimentacao).subscribe({
        next:(res) => {
            this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
            this.movimentacaoForm.reset();
            this.dialog.close('atualizado');
        },
        error:()=> {
          this.toastr.error('Algo deu errado', 'Error')
        }
      })
    }

  }


}



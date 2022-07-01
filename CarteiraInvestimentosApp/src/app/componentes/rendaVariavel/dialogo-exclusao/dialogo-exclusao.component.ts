import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RendaVariavelService } from 'src/app/services/renda-variavel.service';

@Component({
  selector: 'app-dialogo-exclusao',
  templateUrl: './dialogo-exclusao.component.html',
  styleUrls: ['./dialogo-exclusao.component.scss']
})
export class DialogoExclusaoComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private service: RendaVariavelService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any,) { }

  ngOnInit(): void {
    console.log(this.editData)
  }



  apagarRendaVariavel(id: number) {
    this.service.excluirRendaVariavel(id).subscribe({
      next: (res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
       
      },
      error: () => {
        this.toastr.warning('Algo deu errado', 'Error');
      },
    });
  }
}

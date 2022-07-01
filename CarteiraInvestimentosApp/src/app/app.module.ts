import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HttpClientModule} from '@angular/common/http';
import { BancoComponent } from './componentes/banco/banco.component';
import { HomeComponent } from './componentes/home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditBancoComponent } from './componentes/add-edit-banco/add-edit-banco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ListarStatusComponent } from './componentes/statusMovimentacao/listar-status/listar-status.component';
import { AddEditStatusComponent } from './componentes/statusMovimentacao/add-edit-status/add-edit-status.component';
import { AddEditProdutoRendaFixaComponent } from './componentes/produtoRendaFixa/add-edit-produto-renda-fixa/add-edit-produto-renda-fixa.component';
import { ListarProdutoRendaFixaComponent } from './componentes/produtoRendaFixa/listar-produto-renda-fixa/listar-produto-renda-fixa.component';
import { ListarProdutoRendaVariavelComponent } from './componentes/produtoRendaVariavel/listar-produto-renda-variavel/listar-produto-renda-variavel.component';
import { AddEditProdutoRendaVariavelComponent } from './componentes/produtoRendaVariavel/add-edit-produto-renda-variavel/add-edit-produto-renda-variavel.component';
import { AddEditIndexadorRendimentosComponent } from './componentes/indexadorRendimentos/add-edit-indexador-rendimentos/add-edit-indexador-rendimentos.component';
import { ListIndexadorRendimentosComponent } from './componentes/indexadorRendimentos/list-indexador-rendimentos/list-indexador-rendimentos.component';
import { ListUsuariosComponent } from './componentes/Usuarios/list-usuarios/list-usuarios.component';
import { AddEditUsuariosComponent } from './componentes/Usuarios/add-edit-usuarios/add-edit-usuarios.component';
import { ListCarteirasComponent } from './componentes/carteira/list-carteiras/list-carteiras.component';
import { AddEditCarteirasComponent } from './componentes/carteira/add-edit-carteiras/add-edit-carteiras.component';
import { ListTesouroDiretoComponent } from './componentes/tesouroDireto/list-tesouro-direto/list-tesouro-direto.component';
import { AddEditTesouroDiretoComponent } from './componentes/tesouroDireto/add-edit-tesouro-direto/add-edit-tesouro-direto.component';
import { AddEditRendaFixaComponent } from './componentes/rendaFixa/add-edit-renda-fixa/add-edit-renda-fixa.component';
import { ListRendaFixaComponent } from './componentes/rendaFixa/list-renda-fixa/list-renda-fixa.component';
import { ListRendaVariavelComponent } from './componentes/rendaVariavel/list-renda-variavel/list-renda-variavel.component';
import { AddEditRendaVariavelComponent } from './componentes/rendaVariavel/add-edit-renda-variavel/add-edit-renda-variavel.component';
import { AddEditLoginComponent } from './componentes/login/add-edit-login/add-edit-login.component';
import { ListLoginComponent } from './componentes/login/list-login/list-login.component';
import { ListPoupancaComponent } from './componentes/poupanca/list-poupanca/list-poupanca.component';
import { AddEditPoupancaComponent } from './componentes/poupanca/add-edit-poupanca/add-edit-poupanca.component';
import { AddEditMovimentacaoComponent } from './componentes/movimentacao/add-edit-movimentacao/add-edit-movimentacao.component';
import { ListMovimentacaoComponent } from './componentes/movimentacao/list-movimentacao/list-movimentacao.component';
import { CadastroComponent } from './componentes/poupanca/cadastro/cadastro.component';
import { CadastroTesouroDiretoComponent } from './componentes/tesouroDireto/cadastro-tesouro-direto/cadastro-tesouro-direto.component';
import { CadastroRendaFixaComponent } from './componentes/rendaFixa/cadastro-renda-fixa/cadastro-renda-fixa.component';
import { CadastroRendaVariavelComponent } from './componentes/rendaVariavel/cadastro-renda-variavel/cadastro-renda-variavel.component';
import {GoogleChartsModule} from 'angular-google-charts'
import { HomeinvestimentoComponent } from './componentes/investimentos/homeinvestimento/homeinvestimento.component';
import { NovoinvestimentoComponent } from './componentes/investimentos/novoinvestimento/novoinvestimento.component';
import { ReinvestimentoComponent } from './componentes/investimentos/reinvestimento/reinvestimento.component';
import { VendaComponent } from './componentes/investimentos/venda/venda.component';
import { ReinvestimentoRendaVariavelComponent } from './componentes/rendaVariavel/reinvestimento-renda-variavel/reinvestimento-renda-variavel.component';
import { VendaRendaVariavelComponent } from './componentes/rendaVariavel/venda-renda-variavel/venda-renda-variavel.component';
import { ReinvestimentoPoupancaComponent } from './componentes/poupanca/reinvestimento-poupanca/reinvestimento-poupanca.component';
import { VendaPoupancaComponent } from './componentes/poupanca/venda-poupanca/venda-poupanca.component';
import { VendaRendaFixaComponent } from './componentes/rendaFixa/venda-renda-fixa/venda-renda-fixa.component';
import { ReinvestimentoRendaFixaComponent } from './componentes/rendaFixa/reinvestimento-renda-fixa/reinvestimento-renda-fixa.component';
import { ReinvestimentoTesouroDiretoComponent } from './componentes/tesouroDireto/reinvestimento-tesouro-direto/reinvestimento-tesouro-direto.component';
import { VendaTesouroDiretoComponent } from './componentes/tesouroDireto/venda-tesouro-direto/venda-tesouro-direto.component';
import { NavbarUsuarioComponent } from './componentes/navbar-usuario/navbar-usuario.component';
import { DialogoExclusaoComponent } from './componentes/rendaVariavel/dialogo-exclusao/dialogo-exclusao.component';
import { ListagemSimplesRendaVariavelComponent } from './componentes/rendaVariavel/listagem-simples-renda-variavel/listagem-simples-renda-variavel.component';
import { ListagemSimplesRendaFixaComponent } from './componentes/rendaFixa/listagem-simples-renda-fixa/listagem-simples-renda-fixa.component';
import { ListagemSimplesTesouroDiretoComponent } from './componentes/tesouroDireto/listagem-simples-tesouro-direto/listagem-simples-tesouro-direto.component';
import { ListagemSimplesPoupancaComponent } from './componentes/poupanca/listagem-simples-poupanca/listagem-simples-poupanca.component';
import { LoginUsuarioComponent } from './componentes/login/login-usuario/login-usuario.component';
import { LoginCadastroComponent } from './componentes/login/login-cadastro/login-cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BancoComponent,
    HomeComponent,
    AddEditBancoComponent,
    ListarStatusComponent,
    AddEditStatusComponent,
    AddEditProdutoRendaFixaComponent,
    ListarProdutoRendaFixaComponent,
    ListarProdutoRendaVariavelComponent,
    AddEditProdutoRendaVariavelComponent,
    AddEditIndexadorRendimentosComponent,
    ListIndexadorRendimentosComponent,
    ListUsuariosComponent,
    AddEditUsuariosComponent,
    ListCarteirasComponent,
    AddEditCarteirasComponent,
    ListTesouroDiretoComponent,
    AddEditTesouroDiretoComponent,
    AddEditRendaFixaComponent,
    ListRendaFixaComponent,
    ListRendaVariavelComponent,
    AddEditRendaVariavelComponent,
    AddEditLoginComponent,
    ListLoginComponent,
    ListPoupancaComponent,
    AddEditPoupancaComponent,
    AddEditMovimentacaoComponent,
    ListMovimentacaoComponent,
    CadastroComponent,
    CadastroTesouroDiretoComponent,
    CadastroRendaFixaComponent,
    CadastroRendaVariavelComponent,
    HomeinvestimentoComponent,
    NovoinvestimentoComponent,
    ReinvestimentoComponent,
    VendaComponent,
    ReinvestimentoRendaVariavelComponent,
    VendaRendaVariavelComponent,
    ReinvestimentoPoupancaComponent,
    VendaPoupancaComponent,
    VendaRendaFixaComponent,
    ReinvestimentoRendaFixaComponent,
    ReinvestimentoTesouroDiretoComponent,
    VendaTesouroDiretoComponent,
    NavbarUsuarioComponent,
    DialogoExclusaoComponent,
    ListagemSimplesRendaVariavelComponent,
    ListagemSimplesRendaFixaComponent,
    ListagemSimplesTesouroDiretoComponent,
    ListagemSimplesPoupancaComponent,
    LoginUsuarioComponent,
    LoginCadastroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    GoogleChartsModule
  ],
  providers: [GoogleChartsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

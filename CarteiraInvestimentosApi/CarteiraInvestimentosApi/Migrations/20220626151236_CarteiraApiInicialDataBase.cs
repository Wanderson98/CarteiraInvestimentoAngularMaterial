using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarteiraInvestimentosApi.Migrations
{
    public partial class CarteiraApiInicialDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bancos",
                columns: table => new
                {
                    BancoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BancoNome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bancos", x => x.BancoId);
                });

            migrationBuilder.CreateTable(
                name: "IndexadorRendimentos",
                columns: table => new
                {
                    IndexadorRendimentosId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IndexadorRendimentosNome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndexadorRendimentos", x => x.IndexadorRendimentosId);
                });

            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    LoginId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LoginEmail = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    LoginSenha = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.LoginId);
                });

            migrationBuilder.CreateTable(
                name: "ProdutoRendaFixas",
                columns: table => new
                {
                    ProdutoRendaFixaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProdutoRendaFixaNome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdutoRendaFixas", x => x.ProdutoRendaFixaId);
                });

            migrationBuilder.CreateTable(
                name: "ProdutoRendaVariavels",
                columns: table => new
                {
                    ProdutoRendaVariavelId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProdutoRendaVariavelNome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdutoRendaVariavels", x => x.ProdutoRendaVariavelId);
                });

            migrationBuilder.CreateTable(
                name: "StatusMovimentacoes",
                columns: table => new
                {
                    StatusMovimentacaoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StatusMovimentacaoNome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusMovimentacoes", x => x.StatusMovimentacaoId);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UsuarioNome = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    UsuarioSobrenome = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    UsuarioEmail = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    UsuarioTelefone = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    UsuarioCpf = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    UsuarioSenha = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.UsuarioId);
                });

            migrationBuilder.CreateTable(
                name: "Carteiras",
                columns: table => new
                {
                    CarteiraId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CarteiraNome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    DataInicial = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carteiras", x => x.CarteiraId);
                    table.ForeignKey(
                        name: "FK_Carteiras_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Poupancas",
                columns: table => new
                {
                    PoupancaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ValorTotalInvestido = table.Column<decimal>(type: "TEXT", nullable: false),
                    Rendimento = table.Column<decimal>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    CarteiraId = table.Column<int>(type: "INTEGER", nullable: false),
                    BancoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poupancas", x => x.PoupancaId);
                    table.ForeignKey(
                        name: "FK_Poupancas_Bancos_BancoId",
                        column: x => x.BancoId,
                        principalTable: "Bancos",
                        principalColumn: "BancoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Poupancas_Carteiras_CarteiraId",
                        column: x => x.CarteiraId,
                        principalTable: "Carteiras",
                        principalColumn: "CarteiraId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RendaFixas",
                columns: table => new
                {
                    RendaFixaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NomeRendaFixa = table.Column<string>(type: "TEXT", nullable: true),
                    Rentabilidade = table.Column<decimal>(type: "TEXT", nullable: false),
                    Rendimento = table.Column<decimal>(type: "TEXT", nullable: false),
                    Vencimento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Liquidez = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    Custos = table.Column<decimal>(type: "TEXT", nullable: false),
                    CarteiraId = table.Column<int>(type: "INTEGER", nullable: false),
                    BancoId = table.Column<int>(type: "INTEGER", nullable: false),
                    IndexadorRendimentosId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProdutoRendaFixaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RendaFixas", x => x.RendaFixaId);
                    table.ForeignKey(
                        name: "FK_RendaFixas_Bancos_BancoId",
                        column: x => x.BancoId,
                        principalTable: "Bancos",
                        principalColumn: "BancoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendaFixas_Carteiras_CarteiraId",
                        column: x => x.CarteiraId,
                        principalTable: "Carteiras",
                        principalColumn: "CarteiraId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendaFixas_IndexadorRendimentos_IndexadorRendimentosId",
                        column: x => x.IndexadorRendimentosId,
                        principalTable: "IndexadorRendimentos",
                        principalColumn: "IndexadorRendimentosId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendaFixas_ProdutoRendaFixas_ProdutoRendaFixaId",
                        column: x => x.ProdutoRendaFixaId,
                        principalTable: "ProdutoRendaFixas",
                        principalColumn: "ProdutoRendaFixaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RendaVariaveis",
                columns: table => new
                {
                    RendaVariavelId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NomeDoPapel = table.Column<string>(type: "TEXT", nullable: true),
                    Unidades = table.Column<int>(type: "INTEGER", nullable: false),
                    CotacaoMedia = table.Column<decimal>(type: "TEXT", nullable: false),
                    CotacaoAtual = table.Column<decimal>(type: "TEXT", nullable: false),
                    Custos = table.Column<decimal>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    Rendimento = table.Column<decimal>(type: "TEXT", nullable: false),
                    CarteiraId = table.Column<int>(type: "INTEGER", nullable: false),
                    BancoId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProdutoRendaVariavelId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RendaVariaveis", x => x.RendaVariavelId);
                    table.ForeignKey(
                        name: "FK_RendaVariaveis_Bancos_BancoId",
                        column: x => x.BancoId,
                        principalTable: "Bancos",
                        principalColumn: "BancoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendaVariaveis_Carteiras_CarteiraId",
                        column: x => x.CarteiraId,
                        principalTable: "Carteiras",
                        principalColumn: "CarteiraId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendaVariaveis_ProdutoRendaVariavels_ProdutoRendaVariavelId",
                        column: x => x.ProdutoRendaVariavelId,
                        principalTable: "ProdutoRendaVariavels",
                        principalColumn: "ProdutoRendaVariavelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TesouroDiretos",
                columns: table => new
                {
                    TesouroDiretoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ValorTotalInvestido = table.Column<decimal>(type: "TEXT", nullable: false),
                    Rendimento = table.Column<decimal>(type: "TEXT", nullable: false),
                    Rentabilidade = table.Column<decimal>(type: "TEXT", nullable: false),
                    Vencimento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Liquidez = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    Custos = table.Column<decimal>(type: "TEXT", nullable: false),
                    CarteiraId = table.Column<int>(type: "INTEGER", nullable: false),
                    BancoId = table.Column<int>(type: "INTEGER", nullable: false),
                    IndexadorRendimentosId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TesouroDiretos", x => x.TesouroDiretoId);
                    table.ForeignKey(
                        name: "FK_TesouroDiretos_Bancos_BancoId",
                        column: x => x.BancoId,
                        principalTable: "Bancos",
                        principalColumn: "BancoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TesouroDiretos_Carteiras_CarteiraId",
                        column: x => x.CarteiraId,
                        principalTable: "Carteiras",
                        principalColumn: "CarteiraId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TesouroDiretos_IndexadorRendimentos_IndexadorRendimentosId",
                        column: x => x.IndexadorRendimentosId,
                        principalTable: "IndexadorRendimentos",
                        principalColumn: "IndexadorRendimentosId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movimentacoes",
                columns: table => new
                {
                    MovimentacaoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Valor = table.Column<decimal>(type: "TEXT", nullable: false),
                    Unidades = table.Column<int>(type: "INTEGER", nullable: false),
                    DataMovimentacao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    StatusMovimentacaoId = table.Column<int>(type: "INTEGER", nullable: false),
                    RendaVariavelId = table.Column<int>(type: "INTEGER", nullable: true),
                    RendaFixaId = table.Column<int>(type: "INTEGER", nullable: true),
                    TesouroDiretoId = table.Column<int>(type: "INTEGER", nullable: true),
                    PoupancaId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movimentacoes", x => x.MovimentacaoId);
                    table.ForeignKey(
                        name: "FK_Movimentacoes_Poupancas_PoupancaId",
                        column: x => x.PoupancaId,
                        principalTable: "Poupancas",
                        principalColumn: "PoupancaId");
                    table.ForeignKey(
                        name: "FK_Movimentacoes_RendaFixas_RendaFixaId",
                        column: x => x.RendaFixaId,
                        principalTable: "RendaFixas",
                        principalColumn: "RendaFixaId");
                    table.ForeignKey(
                        name: "FK_Movimentacoes_RendaVariaveis_RendaVariavelId",
                        column: x => x.RendaVariavelId,
                        principalTable: "RendaVariaveis",
                        principalColumn: "RendaVariavelId");
                    table.ForeignKey(
                        name: "FK_Movimentacoes_StatusMovimentacoes_StatusMovimentacaoId",
                        column: x => x.StatusMovimentacaoId,
                        principalTable: "StatusMovimentacoes",
                        principalColumn: "StatusMovimentacaoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movimentacoes_TesouroDiretos_TesouroDiretoId",
                        column: x => x.TesouroDiretoId,
                        principalTable: "TesouroDiretos",
                        principalColumn: "TesouroDiretoId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carteiras_UsuarioId",
                table: "Carteiras",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimentacoes_PoupancaId",
                table: "Movimentacoes",
                column: "PoupancaId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimentacoes_RendaFixaId",
                table: "Movimentacoes",
                column: "RendaFixaId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimentacoes_RendaVariavelId",
                table: "Movimentacoes",
                column: "RendaVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimentacoes_StatusMovimentacaoId",
                table: "Movimentacoes",
                column: "StatusMovimentacaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimentacoes_TesouroDiretoId",
                table: "Movimentacoes",
                column: "TesouroDiretoId");

            migrationBuilder.CreateIndex(
                name: "IX_Poupancas_BancoId",
                table: "Poupancas",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_Poupancas_CarteiraId",
                table: "Poupancas",
                column: "CarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaFixas_BancoId",
                table: "RendaFixas",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaFixas_CarteiraId",
                table: "RendaFixas",
                column: "CarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaFixas_IndexadorRendimentosId",
                table: "RendaFixas",
                column: "IndexadorRendimentosId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaFixas_ProdutoRendaFixaId",
                table: "RendaFixas",
                column: "ProdutoRendaFixaId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaVariaveis_BancoId",
                table: "RendaVariaveis",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaVariaveis_CarteiraId",
                table: "RendaVariaveis",
                column: "CarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_RendaVariaveis_ProdutoRendaVariavelId",
                table: "RendaVariaveis",
                column: "ProdutoRendaVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_TesouroDiretos_BancoId",
                table: "TesouroDiretos",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_TesouroDiretos_CarteiraId",
                table: "TesouroDiretos",
                column: "CarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_TesouroDiretos_IndexadorRendimentosId",
                table: "TesouroDiretos",
                column: "IndexadorRendimentosId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.DropTable(
                name: "Movimentacoes");

            migrationBuilder.DropTable(
                name: "Poupancas");

            migrationBuilder.DropTable(
                name: "RendaFixas");

            migrationBuilder.DropTable(
                name: "RendaVariaveis");

            migrationBuilder.DropTable(
                name: "StatusMovimentacoes");

            migrationBuilder.DropTable(
                name: "TesouroDiretos");

            migrationBuilder.DropTable(
                name: "ProdutoRendaFixas");

            migrationBuilder.DropTable(
                name: "ProdutoRendaVariavels");

            migrationBuilder.DropTable(
                name: "Bancos");

            migrationBuilder.DropTable(
                name: "Carteiras");

            migrationBuilder.DropTable(
                name: "IndexadorRendimentos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}

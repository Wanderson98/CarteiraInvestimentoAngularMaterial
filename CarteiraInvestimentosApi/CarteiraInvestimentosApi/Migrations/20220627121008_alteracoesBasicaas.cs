using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarteiraInvestimentosApi.Migrations
{
    public partial class alteracoesBasicaas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ValorTotalInvestido",
                table: "RendaFixas",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorTotalInvestido",
                table: "RendaFixas");
        }
    }
}

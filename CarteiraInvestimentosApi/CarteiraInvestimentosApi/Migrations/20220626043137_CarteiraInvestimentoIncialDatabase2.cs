using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarteiraInvestimentosApi.Migrations
{
    public partial class CarteiraInvestimentoIncialDatabase2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rentabilidadae",
                table: "RendaFixas",
                newName: "Rentabilidade");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rentabilidade",
                table: "RendaFixas",
                newName: "Rentabilidadae");
        }
    }
}

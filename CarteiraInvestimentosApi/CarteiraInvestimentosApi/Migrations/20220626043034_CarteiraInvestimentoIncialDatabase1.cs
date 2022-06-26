using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarteiraInvestimentosApi.Migrations
{
    public partial class CarteiraInvestimentoIncialDatabase1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rentabilidae",
                table: "RendaFixas",
                newName: "Rentabilidadae");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rentabilidadae",
                table: "RendaFixas",
                newName: "Rentabilidae");
        }
    }
}

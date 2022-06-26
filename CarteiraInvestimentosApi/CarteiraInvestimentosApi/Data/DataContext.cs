using CarteiraInvestimentosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CarteiraInvestimentosApi.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Banco> Bancos { get; set; }
        public DbSet<Carteira> Carteiras { get; set; }
        public DbSet<RendaFixa> RendaFixas { get; set; }
        public DbSet<IndexadorRendimentos> IndexadorRendimentos { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }
        public DbSet<Poupanca> Poupancas { get; set; }
        public DbSet<ProdutoRendaFixa> ProdutoRendaFixas { get; set; }
        public DbSet<ProdutoRendaVariavel> ProdutoRendaVariavels { get; set; }
        public DbSet<RendaVariavel> RendaVariaveis { get; set; }
        public DbSet<StatusMovimentacao> StatusMovimentacoes { get; set; }
        public DbSet<TesouroDireto> TesouroDiretos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}

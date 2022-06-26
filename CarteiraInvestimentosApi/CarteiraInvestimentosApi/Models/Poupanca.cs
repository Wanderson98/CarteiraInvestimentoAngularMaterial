namespace CarteiraInvestimentosApi.Models
{
    public class Poupanca
    {
        public int PoupancaId { get; set; }
        public decimal ValorTotalInvestido { get; set; }
        public decimal Rendimento { get; set; }
        public bool IsActive { get; set; }
        public int CarteiraId { get; set; }
        public Carteira Carteira { get; set; }
        public int BancoId { get; set; }
        public Banco Banco { get; set; }
        public IEnumerable<Movimentacao> Movimentacoes { get; set; }
    }
}

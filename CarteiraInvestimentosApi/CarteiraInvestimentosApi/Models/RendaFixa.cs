namespace CarteiraInvestimentosApi.Models
{
    public class RendaFixa
    {
        public int RendaFixaId { get; set; }
        public string NomeRendaFixa { get; set; }
        public decimal Rentabilidade { get; set; }
        public decimal Rendimento { get; set; }
        public decimal ValorTotalInvestido { get; set; }
        public DateTime Vencimento { get; set; }
        public string Liquidez { get; set; }
        public bool IsActive { get; set; }
        public decimal Custos { get; set; }
        public int CarteiraId { get; set; }
        public Carteira Carteira { get; set; }
        public int BancoId { get; set; }
        public Banco Banco { get; set; }
        public int IndexadorRendimentosId { get; set; }
        public IndexadorRendimentos IndexadorRendimentos { get; set; }
        public int ProdutoRendaFixaId { get; set; }
        public ProdutoRendaFixa ProdutoRendaFixa { get; set; }
        public IEnumerable<Movimentacao> Movimentacoes { get; set; }
    }
}

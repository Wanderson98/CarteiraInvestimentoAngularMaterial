namespace CarteiraInvestimentosApi.Models
{
    public class RendaVariavel
    {
        public int RendaVariavelId { get; set; }
        public string NomeDoPapel { get; set; }
        public int Unidades { get; set; }
        public decimal CotacaoMedia { get; set; }
        public decimal CotacaoAtual { get; set; }
        public decimal Custos { get; set; }
        public bool IsActive { get; set; }
        public decimal Rendimento { get; set; }
        public int CarteiraId { get; set; }
        public Carteira Carteira { get; set; }
        public int BancoId { get; set; }
        public Banco Banco { get; set; }
        public int ProdutoRendaVariavelId { get; set; }
        public ProdutoRendaVariavel ProdutoRendaVariavel { get; set; }
        public IEnumerable<Movimentacao> Movimentacoes { get; set; }
    }
}

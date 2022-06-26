namespace CarteiraInvestimentosApi.Models
{
    public class StatusMovimentacao
    {
        public int StatusMovimentacaoId { get; set; }
        public string StatusMovimentacaoNome { get; set; }
        public IEnumerable<Movimentacao> Movimentacoes { get; set; }
    }
}

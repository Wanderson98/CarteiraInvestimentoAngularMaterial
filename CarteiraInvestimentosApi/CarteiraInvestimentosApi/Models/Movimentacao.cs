namespace CarteiraInvestimentosApi.Models
{
    public class Movimentacao
    {
        public int MovimentacaoId { get; set; }
        public decimal Valor { get; set; }
        public int Unidades { get; set; }
        public DateTime DataMovimentacao { get; set; }

        public int StatusMovimentacaoId { get; set; }
        public StatusMovimentacao StatusMovimentacao { get; set; }

        public int? RendaVariavelId { get; set; }
        public RendaVariavel RendaVariavel { get; set; }
        public int? RendaFixaId { get; set; }
        public RendaFixa RendaFixa { get; set; }
        public int? TesouroDiretoId { get; set; }
        public TesouroDireto TesouroDireto { get; set; }

        public int? PoupancaId { get; set; }
        public Poupanca Poupanca { get; set; }
    }
}
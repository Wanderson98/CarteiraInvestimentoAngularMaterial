using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class ProdutoRendaFixa
    {
        public int ProdutoRendaFixaId { get; set; }
        [Required]
        [StringLength(100)]
        public string ProdutoRendaFixaNome { get; set; }
        public IEnumerable<RendaFixa> RendaFixas { get; set; }

    }
}

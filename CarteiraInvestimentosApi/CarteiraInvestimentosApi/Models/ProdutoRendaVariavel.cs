using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class ProdutoRendaVariavel
    {
        public int ProdutoRendaVariavelId { get; set; }
        [Required]
        [StringLength(100)]
        public string ProdutoRendaVariavelNome { get; set; }
        public IEnumerable<RendaVariavel> RendaVariavels { get; set; }
    }
}

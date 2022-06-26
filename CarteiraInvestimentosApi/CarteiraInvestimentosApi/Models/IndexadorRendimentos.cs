using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class IndexadorRendimentos
    {
        public int IndexadorRendimentosId { get; set; }
        [Required]
        [StringLength(100)]
        public string IndexadorRendimentosNome { get; set; }
    }
}

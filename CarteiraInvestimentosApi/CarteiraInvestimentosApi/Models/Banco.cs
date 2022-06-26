using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class Banco
    {
        public int BancoId { get; set; }

        [Required]
        [StringLength(100)]
        public string BancoNome { get; set; }
    }
}

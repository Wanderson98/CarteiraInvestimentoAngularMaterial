using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class Carteira
    {
        public int CarteiraId { get; set; }
        [Required]
        [StringLength(100)]
        public string CarteiraNome { get; set; }
        public DateTime DataInicial { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class Usuario
    {
        public int UsuarioId { get; set; }

        [Required]
        [StringLength(50)]
        public string UsuarioNome { get; set; }
        [Required]
        [StringLength(150)]
        public string UsuarioSobrenome { get; set; }
        [Required]
        [StringLength(150)]
        [DataType(DataType.EmailAddress)]
        public string UsuarioEmail { get; set; }
        [Required]
        [StringLength(20)]
        public string UsuarioTelefone { get; set; }
        [Required]
        [StringLength(15)]
        public string UsuarioCpf { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string UsuarioSenha { get; set; }

        public IEnumerable<Carteira> Carteiras { get; set; }

    }
}

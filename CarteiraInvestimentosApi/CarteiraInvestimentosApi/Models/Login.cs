using System.ComponentModel.DataAnnotations;

namespace CarteiraInvestimentosApi.Models
{
    public class Login
    {
        public int LoginId { get; set; }
        [DataType(DataType.EmailAddress)]
        [StringLength(100)]
        public string LoginEmail { get; set; }
        [DataType(DataType.Password)]
        public int LoginSenha { get; set; }
    }
}

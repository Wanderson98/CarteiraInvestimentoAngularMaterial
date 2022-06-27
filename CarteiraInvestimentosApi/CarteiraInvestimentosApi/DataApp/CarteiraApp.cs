using CarteiraInvestimentosApi.Data;

using CarteiraInvestimentosApi.Models;

namespace CarteiraInvestimentosApi.DataApp
{
    public class CarteiraApp 
    { 
        public Carteira Carteira { get; set; }
        public decimal ValorTotalCarteira { get; set; }
        public decimal ValorTotalPoupanca { get; set; }
        public decimal ValorTotalRendaFixa { get; set; }
        public decimal ValorTotalRendaVariavel { get; set; }
        public decimal ValorTotalTesouroDireto { get; set; }


    }
}

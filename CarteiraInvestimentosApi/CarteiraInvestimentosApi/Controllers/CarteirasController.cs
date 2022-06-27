using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarteiraInvestimentosApi.Data;
using CarteiraInvestimentosApi.Models;
using CarteiraInvestimentosApi.DataApp;

namespace CarteiraInvestimentosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarteirasController : ControllerBase
    {
        private readonly DataContext _context;
       

        public CarteirasController(DataContext context)
        {
            _context = context;
          
        }

        // GET: api/Carteiras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carteira>>> GetCarteiras()
        {
           
            return await _context.Carteiras.Include(c => c.Usuario).ToListAsync();
        }

        [HttpGet("cart/")]
        public async Task<ActionResult<IEnumerable<CarteiraApp>>> GetCarteirasApp() 
        {
            List<CarteiraApp> carteiraApps = new List<CarteiraApp>();
            var carteiras = await _context.Carteiras.Include(c => c.Usuario).ToListAsync();
            foreach (var item in carteiras)
            {
                carteiraApps.Add(new CarteiraApp()
                {
                    Carteira = item,
                    ValorTotalPoupanca = ValorTotalPoup(item),
                    ValorTotalRendaFixa = ValorTotalRFixa(item),
                    ValorTotalTesouroDireto = ValorTotalTesouDireto(item),
                    ValorTotalRendaVariavel = ValorTotalRVariavel(item),
                    ValorTotalCarteira = ValorTotal(item)
                });

            };
            return carteiraApps;

        }

        // GET: api/Carteiras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarteiraApp>> GetCarteira(int id)
        {
            var carteira = await _context.Carteiras.FindAsync(id);
            var carteiraApp = new CarteiraApp()
            {
                Carteira = carteira,
                ValorTotalPoupanca = ValorTotalPoup(carteira),
                ValorTotalRendaFixa = ValorTotalRFixa(carteira),
                ValorTotalTesouroDireto = ValorTotalTesouDireto(carteira),
                ValorTotalRendaVariavel = ValorTotalRVariavel(carteira),
                ValorTotalCarteira = ValorTotal(carteira)
            };
            if (carteira == null)
            {
                return NotFound();
            }

            return Ok(carteiraApp);
        }

        // PUT: api/Carteiras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarteira(int id, Carteira carteira)
        {
            if (id != carteira.CarteiraId)
            {
                return BadRequest();
            }

            _context.Entry(carteira).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarteiraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carteiras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carteira>> PostCarteira(Carteira carteira)
        {
            _context.Carteiras.Add(carteira);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarteira", new { id = carteira.CarteiraId }, carteira);
        }

        // DELETE: api/Carteiras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarteira(int id)
        {
            var carteira = await _context.Carteiras.FindAsync(id);
            if (carteira == null)
            {
                return NotFound();
            }

            _context.Carteiras.Remove(carteira);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarteiraExists(int id)
        {
            return _context.Carteiras.Any(e => e.CarteiraId == id);
        }

        private decimal ValorTotalPoup(Carteira carteira)
        {
            decimal valorPoupanca = 0;
            var poupanca = _context.Poupancas.Where(c => c.CarteiraId == carteira.CarteiraId);
            foreach (var item in poupanca)
            {
                valorPoupanca += item.ValorTotalInvestido + item.Rendimento;
            }


            return valorPoupanca;
        }

        private decimal ValorTotalRFixa(Carteira carteira)
        {
            decimal valorRendaFixa = 0;
            var rendaFixa = _context.RendaFixas.Where(c => c.CarteiraId == carteira.CarteiraId);
            foreach (var item in rendaFixa)
            {
                valorRendaFixa += (item.ValorTotalInvestido + item.Rendimento);
            }

            return valorRendaFixa;
        }
        private decimal ValorTotalTesouDireto(Carteira carteira)
        {
            decimal valorTesouroDireto = 0;
            var tesouroDireto = _context.TesouroDiretos.Where(c => c.CarteiraId == carteira.CarteiraId);
            foreach (var item in tesouroDireto)
            {
                valorTesouroDireto += (item.ValorTotalInvestido + item.Rendimento);
            }

            return valorTesouroDireto;
        }
        private decimal ValorTotalRVariavel(Carteira carteira)
        {
            decimal valorRendaVariavel = 0;
            var rendaVariavel = _context.RendaVariaveis.Where(c => c.CarteiraId == carteira.CarteiraId);
            foreach (var item in rendaVariavel)
            {
                valorRendaVariavel += (item.Unidades * item.CotacaoAtual);
            }

            return valorRendaVariavel;
        }
        private decimal ValorTotal(Carteira carteira)
        {
            return ValorTotalRVariavel(carteira) + ValorTotalTesouDireto(carteira) +
                ValorTotalRFixa(carteira) + ValorTotalPoup(carteira);
        }

    }
}

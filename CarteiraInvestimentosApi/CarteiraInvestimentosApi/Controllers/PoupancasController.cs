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
    public class PoupancasController : ControllerBase
    {
        private readonly DataContext _context;

        public PoupancasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Poupancas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Poupanca>>> GetPoupancas()
        {
            return await _context.Poupancas.Include(c => c.Carteira).Include(c => c.Banco).ToListAsync();
        }

        [HttpGet("valor/")]
        public async Task<ActionResult<IEnumerable<PoupancaApp>>> GetPoupancasValor()
        {
            var poupancas =  await _context.Poupancas.Include(c=>c.Carteira).Include(c=>c.Banco).ToListAsync();
            List<PoupancaApp> poupancaApps = new List<PoupancaApp>();
            foreach (var item in poupancas)
            {
                poupancaApps.Add(new PoupancaApp()
                {
                    Poupanca = item,
                    ValorTotal = item.ValorTotalInvestido + item.Rendimento
                }) ; 

            }
            return Ok(poupancaApps);
        }

        // GET: api/Poupancas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poupanca>> GetPoupanca(int id)
        {
            var poupanca = await _context.Poupancas.FindAsync(id);

            if (poupanca == null)
            {
                return NotFound();
            }

            return poupanca;
        }
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Poupanca>>> GetPoupancaAtivo()
        {
            var poupanca = await _context.Poupancas.Where(c=>c.IsActive).ToListAsync();

            if (poupanca == null)
            {
                return NotFound();
            }

            return Ok(poupanca);
        }

        // PUT: api/Poupancas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPoupanca(int id, Poupanca poupanca)
        {
            if (id != poupanca.PoupancaId)
            {
                return BadRequest();
            }

            _context.Entry(poupanca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoupancaExists(id))
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

        // POST: api/Poupancas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Poupanca>> PostPoupanca(Poupanca poupanca)
        {
            _context.Poupancas.Add(poupanca);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPoupanca", new { id = poupanca.PoupancaId }, poupanca);
        }

        // DELETE: api/Poupancas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoupanca(int id)
        {
            var poupanca = await _context.Poupancas.FindAsync(id);
            if (poupanca == null)
            {
                return NotFound();
            }

            _context.Poupancas.Remove(poupanca);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PoupancaExists(int id)
        {
            return _context.Poupancas.Any(e => e.PoupancaId == id);
        }
    }
}

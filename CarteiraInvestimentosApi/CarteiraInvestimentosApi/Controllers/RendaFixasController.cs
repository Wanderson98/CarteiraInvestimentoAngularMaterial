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
    public class RendaFixasController : ControllerBase
    {
        private readonly DataContext _context;

        public RendaFixasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/RendaFixas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RendaFixa>>> GetPoupancas()
        {
            return await _context.RendaFixas.Include(c => c.Movimentacoes).Include(c => c.Carteira).Include(c => c.ProdutoRendaFixa).
               Include(c => c.IndexadorRendimentos).Include(c => c.Banco).ToListAsync();
        }

        [HttpGet("valor/")]
        public async Task<ActionResult<IEnumerable<RendaFixaApp>>> GetRendaFixas()
        {
            var rendafixa = await _context.RendaFixas.Include(c => c.Movimentacoes).Include(c => c.Carteira).Include(c => c.ProdutoRendaFixa).
               Include(c => c.IndexadorRendimentos).Include(c => c.Banco).ToListAsync();
            List<RendaFixaApp> rendaFixaApps = new List<RendaFixaApp>();
            foreach (var item in rendafixa)
            {
                rendaFixaApps.Add(new RendaFixaApp()
                {
                    RendaFixa = item,
                    ValorTotal = item.ValorTotalInvestido + item.Rendimento
                });
            };

            return rendaFixaApps;
        }




        // GET: api/RendaFixas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RendaFixa>> GetRendaFixa(int id)
        {
            var rendaFixa = await _context.RendaFixas.FindAsync(id);

            if (rendaFixa == null)
            {
                return NotFound();
            }

            return rendaFixa;
        }
        [HttpGet("produto/{id}")]
        public async Task<ActionResult<IEnumerable<RendaFixa>>> GetRendaFixasPorProduto(int id)
        {
            var rendaFixa = await _context.RendaFixas.Where(c => c.ProdutoRendaFixaId == id).
                Include(c => c.Movimentacoes).Include(c => c.ProdutoRendaFixa).
                Include(c => c.Banco).ToListAsync();

            if (rendaFixa == null)
            {
                return NotFound();
            }

            return Ok(rendaFixa);
        }
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<RendaVariavel>>> GetRendaFixaAtivo()
        {
            var rendaFixa = await _context.RendaFixas.Where(c => c.IsActive).
                    Include(c => c.Movimentacoes).Include(c => c.ProdutoRendaFixa).
                    Include(c => c.Banco).ToListAsync();

            if (rendaFixa == null)
            {
                return NotFound();
            }

            return Ok(rendaFixa);
        }
        // PUT: api/RendaFixas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRendaFixa(int id, RendaFixa rendaFixa)
        {
            if (id != rendaFixa.RendaFixaId)
            {
                return BadRequest();
            }

            _context.Entry(rendaFixa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RendaFixaExists(id))
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

        // POST: api/RendaFixas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RendaFixa>> PostRendaFixa(RendaFixa rendaFixa)
        {
            _context.RendaFixas.Add(rendaFixa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRendaFixa", new { id = rendaFixa.RendaFixaId }, rendaFixa);
        }

        // DELETE: api/RendaFixas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRendaFixa(int id)
        {
            var rendaFixa = await _context.RendaFixas.FindAsync(id);
            if (rendaFixa == null)
            {
                return NotFound();
            }

            _context.RendaFixas.Remove(rendaFixa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RendaFixaExists(int id)
        {
            return _context.RendaFixas.Any(e => e.RendaFixaId == id);
        }
    }
}

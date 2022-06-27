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
    public class TesouroDiretosController : ControllerBase
    {
        private readonly DataContext _context;

        public TesouroDiretosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TesouroDiretos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TesouroDireto>>> GetPoupancas()
        {
            return await _context.TesouroDiretos.Include(c => c.Banco).Include(c => c.Carteira).Include(c => c.IndexadorRendimentos).
                Include(c => c.Movimentacoes).ToListAsync();
        }

        [HttpGet("valor/")]
        public async Task<ActionResult<IEnumerable<TesouroDiretoApp>>> GetTesouroDiretos()
        {
            List<TesouroDiretoApp> tesouroDiretoApps = new List<TesouroDiretoApp>();
            var tesouros = await _context.TesouroDiretos.Include(c=>c.Banco).Include(c=>c.Carteira).Include(c => c.IndexadorRendimentos).
                Include(c=>c.Movimentacoes).ToListAsync();

            foreach(var item in tesouros)
            {
                tesouroDiretoApps.Add(new TesouroDiretoApp()
                {
                    TesouroDireto = item,
                    ValorTotal = item.ValorTotalInvestido + item.Rendimento
                }) ;

            }

            return Ok(tesouroDiretoApps);
        }

        // GET: api/TesouroDiretos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TesouroDireto>> GetTesouroDireto(int id)
        {
            var tesouroDireto = await _context.TesouroDiretos.FindAsync(id);

            if (tesouroDireto == null)
            {
                return NotFound();
            }

            return tesouroDireto;
        }
        [HttpGet("indexador/{id}")]
        public async Task<ActionResult<IEnumerable<TesouroDireto>>> GetTesouroDiretosPorIndexador(int id)
        {
            var tesouroDiretos = await _context.TesouroDiretos.Where(c => c.IndexadorRendimentosId == id).
                Include(c => c.IndexadorRendimentos).ToListAsync();
            if (tesouroDiretos == null)
            {
                return NotFound();
            }
            
            return Ok(tesouroDiretos);
        }
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<TesouroDireto>>> GetTesouroDiretosAtivos()
        {
            var tesouroDiretos = await _context.TesouroDiretos.Where(c => c.IsActive).
                Include(c => c.IndexadorRendimentos).ToListAsync();
            if (tesouroDiretos == null)
            {
                return NotFound();
            }

            return Ok(tesouroDiretos);
        }

        // PUT: api/TesouroDiretos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTesouroDireto(int id, TesouroDireto tesouroDireto)
        {
            if (id != tesouroDireto.TesouroDiretoId)
            {
                return BadRequest();
            }

            _context.Entry(tesouroDireto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TesouroDiretoExists(id))
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

        // POST: api/TesouroDiretos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TesouroDireto>> PostTesouroDireto(TesouroDireto tesouroDireto)
        {
            _context.TesouroDiretos.Add(tesouroDireto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTesouroDireto", new { id = tesouroDireto.TesouroDiretoId }, tesouroDireto);
        }

        // DELETE: api/TesouroDiretos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTesouroDireto(int id)
        {
            var tesouroDireto = await _context.TesouroDiretos.FindAsync(id);
            if (tesouroDireto == null)
            {
                return NotFound();
            }

            _context.TesouroDiretos.Remove(tesouroDireto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TesouroDiretoExists(int id)
        {
            return _context.TesouroDiretos.Any(e => e.TesouroDiretoId == id);
        }
    }
}

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
    public class RendaVariavelsController : ControllerBase
    {
        private readonly DataContext _context;

        public RendaVariavelsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/RendaVariavels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RendaVariavel>>> GetRendaVariaveis()
        {
            return await _context.RendaVariaveis.Include(c => c.Movimentacoes).Include(c => c.Banco).Include(c => c.ProdutoRendaVariavel)
                .Include(c => c.Carteira).Include(c=>c.Banco).ToListAsync();
        }

        [HttpGet("valor/")]
        public async Task<ActionResult<IEnumerable<RendaVariavelApp>>> GetRendaVariaveisValor()
        {
            var variaveis = await _context.RendaVariaveis.Include(c => c.Movimentacoes).Include(c => c.Banco).Include(c => c.ProdutoRendaVariavel)
                .Include(c => c.Carteira).Include(c => c.Banco).ToListAsync();
            List<RendaVariavelApp> rendaVariavelApps = new List<RendaVariavelApp>();
            foreach(var item in variaveis)
            {
                AtualizarValores(item);
                rendaVariavelApps.Add(new RendaVariavelApp()
                {
                    RendaVariavel = item,
                    ValorTotal = item.CotacaoAtual * item.Unidades
                }) ;


            }
            return Ok(rendaVariavelApps);
        }


        // GET: api/RendaVariavels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RendaVariavel>> GetRendaVariavel(int id)
        {
            var rendaVariavel = await _context.RendaVariaveis.FindAsync(id);

            if (rendaVariavel == null)
            {
                return NotFound();
            }

            return rendaVariavel;
        }
        [HttpGet("produto/{id}")]
        public async Task<ActionResult<IEnumerable<RendaVariavel>>> GetRendaVariaveisPorProduto(int id)
        {
            var rendaVariavel = await _context.RendaVariaveis.Where(c => c.ProdutoRendaVariavelId == id).
                Include(c => c.Movimentacoes).Include(c => c.ProdutoRendaVariavel).
                Include(c => c.Banco).ToListAsync();

            if (rendaVariavel == null)
            {
                return NotFound();
            }

            return Ok(rendaVariavel);
        }
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<RendaVariavel>>> GetRendaVariaveisAtivo()
        {
            var rendaVariavel = await _context.RendaVariaveis.Where(c => c.IsActive).
                Include(c => c.Movimentacoes).Include(c => c.ProdutoRendaVariavel).
                Include(c => c.Banco).ToListAsync();

            if (rendaVariavel == null)
            {
                return NotFound();
            }

            return Ok(rendaVariavel);
        }
        // PUT: api/RendaVariavels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRendaVariavel(int id, RendaVariavel rendaVariavel)
        {
            if (id != rendaVariavel.RendaVariavelId)
            {
                return BadRequest();
            }

            _context.Entry(rendaVariavel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RendaVariavelExists(id))
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

        // POST: api/RendaVariavels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RendaVariavel>> PostRendaVariavel(RendaVariavel rendaVariavel)
        {
            _context.RendaVariaveis.Add(rendaVariavel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRendaVariavel", new { id = rendaVariavel.RendaVariavelId }, rendaVariavel);
        }

        // DELETE: api/RendaVariavels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRendaVariavel(int id)
        {
            var rendaVariavel = await _context.RendaVariaveis.FindAsync(id);
            if (rendaVariavel == null)
            {
                return NotFound();
            }

            _context.RendaVariaveis.Remove(rendaVariavel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RendaVariavelExists(int id)
        {
            return _context.RendaVariaveis.Any(e => e.RendaVariavelId == id);
        }

        private void AtualizarValores(RendaVariavel item)
        {
            item.Rendimento = (item.CotacaoAtual * item.Unidades) - (item.CotacaoMedia * item.Unidades);
            _context.RendaVariaveis.Update(item);
            _context.SaveChanges();
        }
    }
}

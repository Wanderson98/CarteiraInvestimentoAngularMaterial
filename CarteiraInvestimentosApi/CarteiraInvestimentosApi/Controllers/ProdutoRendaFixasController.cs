using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarteiraInvestimentosApi.Data;
using CarteiraInvestimentosApi.Models;

namespace CarteiraInvestimentosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoRendaFixasController : ControllerBase
    {
        private readonly DataContext _context;

        public ProdutoRendaFixasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProdutoRendaFixas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoRendaFixa>>> GetProdutoRendaFixas()
        {
            return await _context.ProdutoRendaFixas.ToListAsync();
        }

        // GET: api/ProdutoRendaFixas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoRendaFixa>> GetProdutoRendaFixa(int id)
        {
            var produtoRendaFixa = await _context.ProdutoRendaFixas.FindAsync(id);

            if (produtoRendaFixa == null)
            {
                return NotFound();
            }

            return produtoRendaFixa;
        }

        // PUT: api/ProdutoRendaFixas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdutoRendaFixa(int id, ProdutoRendaFixa produtoRendaFixa)
        {
            if (id != produtoRendaFixa.ProdutoRendaFixaId)
            {
                return BadRequest();
            }

            _context.Entry(produtoRendaFixa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoRendaFixaExists(id))
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

        // POST: api/ProdutoRendaFixas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProdutoRendaFixa>> PostProdutoRendaFixa(ProdutoRendaFixa produtoRendaFixa)
        {
            _context.ProdutoRendaFixas.Add(produtoRendaFixa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProdutoRendaFixa", new { id = produtoRendaFixa.ProdutoRendaFixaId }, produtoRendaFixa);
        }

        // DELETE: api/ProdutoRendaFixas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProdutoRendaFixa(int id)
        {
            var produtoRendaFixa = await _context.ProdutoRendaFixas.FindAsync(id);
            if (produtoRendaFixa == null)
            {
                return NotFound();
            }

            _context.ProdutoRendaFixas.Remove(produtoRendaFixa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoRendaFixaExists(int id)
        {
            return _context.ProdutoRendaFixas.Any(e => e.ProdutoRendaFixaId == id);
        }
    }
}

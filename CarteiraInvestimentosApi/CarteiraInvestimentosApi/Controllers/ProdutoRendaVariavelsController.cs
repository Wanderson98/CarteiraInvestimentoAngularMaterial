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
    public class ProdutoRendaVariavelsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProdutoRendaVariavelsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProdutoRendaVariavels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoRendaVariavel>>> GetProdutoRendaVariavels()
        {
            return await _context.ProdutoRendaVariavels.ToListAsync();
        }

        // GET: api/ProdutoRendaVariavels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoRendaVariavel>> GetProdutoRendaVariavel(int id)
        {
            var produtoRendaVariavel = await _context.ProdutoRendaVariavels.FindAsync(id);

            if (produtoRendaVariavel == null)
            {
                return NotFound();
            }

            return produtoRendaVariavel;
        }

        // PUT: api/ProdutoRendaVariavels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdutoRendaVariavel(int id, ProdutoRendaVariavel produtoRendaVariavel)
        {
            if (id != produtoRendaVariavel.ProdutoRendaVariavelId)
            {
                return BadRequest();
            }

            _context.Entry(produtoRendaVariavel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoRendaVariavelExists(id))
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

        // POST: api/ProdutoRendaVariavels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProdutoRendaVariavel>> PostProdutoRendaVariavel(ProdutoRendaVariavel produtoRendaVariavel)
        {
            _context.ProdutoRendaVariavels.Add(produtoRendaVariavel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProdutoRendaVariavel", new { id = produtoRendaVariavel.ProdutoRendaVariavelId }, produtoRendaVariavel);
        }

        // DELETE: api/ProdutoRendaVariavels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProdutoRendaVariavel(int id)
        {
            var produtoRendaVariavel = await _context.ProdutoRendaVariavels.FindAsync(id);
            if (produtoRendaVariavel == null)
            {
                return NotFound();
            }

            _context.ProdutoRendaVariavels.Remove(produtoRendaVariavel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoRendaVariavelExists(int id)
        {
            return _context.ProdutoRendaVariavels.Any(e => e.ProdutoRendaVariavelId == id);
        }
    }
}

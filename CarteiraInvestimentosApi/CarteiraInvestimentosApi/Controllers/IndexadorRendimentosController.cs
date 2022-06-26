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
    public class IndexadorRendimentosController : ControllerBase
    {
        private readonly DataContext _context;

        public IndexadorRendimentosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/IndexadorRendimentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndexadorRendimentos>>> GetIndexadorRendimentos()
        {
            return await _context.IndexadorRendimentos.ToListAsync();
        }

        // GET: api/IndexadorRendimentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IndexadorRendimentos>> GetIndexadorRendimentos(int id)
        {
            var indexadorRendimentos = await _context.IndexadorRendimentos.FindAsync(id);

            if (indexadorRendimentos == null)
            {
                return NotFound();
            }

            return indexadorRendimentos;
        }

        // PUT: api/IndexadorRendimentos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIndexadorRendimentos(int id, IndexadorRendimentos indexadorRendimentos)
        {
            if (id != indexadorRendimentos.IndexadorRendimentosId)
            {
                return BadRequest();
            }

            _context.Entry(indexadorRendimentos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndexadorRendimentosExists(id))
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

        // POST: api/IndexadorRendimentos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IndexadorRendimentos>> PostIndexadorRendimentos(IndexadorRendimentos indexadorRendimentos)
        {
            _context.IndexadorRendimentos.Add(indexadorRendimentos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndexadorRendimentos", new { id = indexadorRendimentos.IndexadorRendimentosId }, indexadorRendimentos);
        }

        // DELETE: api/IndexadorRendimentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIndexadorRendimentos(int id)
        {
            var indexadorRendimentos = await _context.IndexadorRendimentos.FindAsync(id);
            if (indexadorRendimentos == null)
            {
                return NotFound();
            }

            _context.IndexadorRendimentos.Remove(indexadorRendimentos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IndexadorRendimentosExists(int id)
        {
            return _context.IndexadorRendimentos.Any(e => e.IndexadorRendimentosId == id);
        }
    }
}

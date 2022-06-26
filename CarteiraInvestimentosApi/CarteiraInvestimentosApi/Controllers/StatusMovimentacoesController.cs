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
    public class StatusMovimentacoesController : ControllerBase
    {
        private readonly DataContext _context;

        public StatusMovimentacoesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/StatusMovimentacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusMovimentacao>>> GetStatusMovimentacoes()
        {
            return await _context.StatusMovimentacoes.ToListAsync();
        }

        // GET: api/StatusMovimentacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusMovimentacao>> GetStatusMovimentacao(int id)
        {
            var statusMovimentacao = await _context.StatusMovimentacoes.FindAsync(id);

            if (statusMovimentacao == null)
            {
                return NotFound();
            }

            return statusMovimentacao;
        }

        // PUT: api/StatusMovimentacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusMovimentacao(int id, StatusMovimentacao statusMovimentacao)
        {
            if (id != statusMovimentacao.StatusMovimentacaoId)
            {
                return BadRequest();
            }

            _context.Entry(statusMovimentacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusMovimentacaoExists(id))
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

        // POST: api/StatusMovimentacoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StatusMovimentacao>> PostStatusMovimentacao(StatusMovimentacao statusMovimentacao)
        {
            _context.StatusMovimentacoes.Add(statusMovimentacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusMovimentacao", new { id = statusMovimentacao.StatusMovimentacaoId }, statusMovimentacao);
        }

        // DELETE: api/StatusMovimentacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusMovimentacao(int id)
        {
            var statusMovimentacao = await _context.StatusMovimentacoes.FindAsync(id);
            if (statusMovimentacao == null)
            {
                return NotFound();
            }

            _context.StatusMovimentacoes.Remove(statusMovimentacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusMovimentacaoExists(int id)
        {
            return _context.StatusMovimentacoes.Any(e => e.StatusMovimentacaoId == id);
        }
    }
}

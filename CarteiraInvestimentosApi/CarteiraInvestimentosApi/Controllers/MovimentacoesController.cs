﻿using System;
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
    public class MovimentacoesController : ControllerBase
    {
        private readonly DataContext _context;

        public MovimentacoesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Movimentacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoes()
        {
            return await _context.Movimentacoes.Include(c=>c.Poupanca)
            .Include(c=>c.TesouroDireto).Include(c=>c.StatusMovimentacao)
            .Include(c=>c.RendaFixa).Include(c=>c.RendaVariavel).ToListAsync();
        }

        // GET: api/Movimentacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movimentacao>> GetMovimentacao(int id)
        {
            var movimentacao = await _context.Movimentacoes.FindAsync(id);

            if (movimentacao == null)
            {
                return NotFound();
            }

            return movimentacao;
        }
        [HttpGet("poup/{id}")]
        public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoesPoupanca(int id)
        {
            var movimentacao =  await _context.Movimentacoes.Where(c => c.PoupancaId == id).Include(c=> c.Poupanca).ToListAsync();
            if (movimentacao == null)
            {
                return NotFound();
            }
            return Ok(movimentacao);
        }
         [HttpGet("rendaFixa/{id}")]
        public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoesRendaFixa(int id)
        {
            var movimentacao = await _context.Movimentacoes.Where(c => c.RendaFixaId == id).Include(c=> c.RendaFixa).ToListAsync();
            if (movimentacao == null)
            {
                return NotFound();
            }
            return Ok(movimentacao);
        }
        [HttpGet("rendaVariavel/{id}")]
        public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoesRendaVariavel(int id)
        {
            var movimentacao = await _context.Movimentacoes.Where(c => c.RendaVariavelId == id).Include(c => c.RendaVariavel).ToListAsync();
            if (movimentacao == null)
            {
                return NotFound();
            }
            return Ok(movimentacao);
        }
        [HttpGet("tesouro/{id}")]
        public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoesTesouro(int id)
        {
            var movimentacao = await _context.Movimentacoes.Where(c => c.TesouroDiretoId == id).Include(c => c.TesouroDireto).ToListAsync();
            if (movimentacao == null)
            {
                return NotFound();
            }
            return Ok(movimentacao);
        }
        // PUT: api/Movimentacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovimentacao(int id, Movimentacao movimentacao)
        {
            if (id != movimentacao.MovimentacaoId)
            {
                return BadRequest();
            }

            _context.Entry(movimentacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovimentacaoExists(id))
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

        // POST: api/Movimentacoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Movimentacao>> PostMovimentacao(Movimentacao movimentacao)
        {
            _context.Movimentacoes.Add(movimentacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovimentacao", new { id = movimentacao.MovimentacaoId }, movimentacao);
        }

        // DELETE: api/Movimentacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovimentacao(int id)
        {
            var movimentacao = await _context.Movimentacoes.FindAsync(id);
            if (movimentacao == null)
            {
                return NotFound();
            }

            _context.Movimentacoes.Remove(movimentacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovimentacaoExists(int id)
        {
            return _context.Movimentacoes.Any(e => e.MovimentacaoId == id);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourAPI.Data;
using TourAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TourAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BandController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BandController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Band>>> GetBands()
        {
            return await _context.Bands.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Band>> GetBand(int id)
        {
            var band = await _context.Bands.FindAsync(id);
            if (band == null) return NotFound();
            return band;
        }

        [HttpPost]
        public async Task<ActionResult<Band>> PostBand(Band band)
        {
            _context.Bands.Add(band);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBand), new { id = band.Id }, band);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBand(int id, Band band)
        {
            if (id != band.Id) return BadRequest();
            _context.Entry(band).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBand(int id)
        {
            var band = await _context.Bands.FindAsync(id);
            if (band == null) return NotFound();
            _context.Bands.Remove(band);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

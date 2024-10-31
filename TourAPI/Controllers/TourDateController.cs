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
    public class TourDateController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TourDateController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TourDate>>> GetTourDates()
        {
            return await _context.TourDates.Include(td => td.Tour).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourDate>> GetTourDate(int id)
        {
            var tourDate = await _context.TourDates.FindAsync(id);
            if (tourDate == null) return NotFound();
            return tourDate;
        }

        [HttpPost]
        public async Task<ActionResult<TourDate>> PostTourDate(TourDate tourDate)
        {
            _context.TourDates.Add(tourDate);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTourDate), new { id = tourDate.Id }, tourDate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTourDate(int id, TourDate tourDate)
        {
            if (id != tourDate.Id) return BadRequest();
            _context.Entry(tourDate).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTourDate(int id)
        {
            var tourDate = await _context.TourDates.FindAsync(id);
            if (tourDate == null) return NotFound();
            _context.TourDates.Remove(tourDate);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

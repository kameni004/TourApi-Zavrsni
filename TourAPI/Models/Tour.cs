using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TourAPI.Models
{
    public class Tour
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BandId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }
        
        public Band? Band { get; set; }
     
        public List<TourDate>? TourDates { get; set; }
    }
}

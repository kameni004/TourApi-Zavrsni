using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TourAPI.Models
{
    public class TourDate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TourId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(100)]
        public string Venue { get; set; }
        [JsonIgnore]
        public Tour? Tour { get; set; }
    }
}

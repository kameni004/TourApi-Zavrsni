using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TourAPI.Models
{
    public class Band
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(100)]
        public string Genre { get; set; }
        [JsonIgnore]
        public List<Tour>? Tours { get; set; }
    }
}

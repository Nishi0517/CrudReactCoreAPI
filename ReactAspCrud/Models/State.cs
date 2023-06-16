using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace ReactAspCrud.Models
{
    public class State
    {
        [Key]
        public int Id { get; set; }
        public string StateName { get; set; }

        public int CountryId { get; set; }
        [ForeignKey("CountryId")]
        public Country Country { get; set; }

        public List<City> Cities { get; set; }


    }
}

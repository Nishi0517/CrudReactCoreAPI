using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string CityName { get; set; }

        public int StateId { get; set; }
        [ForeignKey("StateId")]
        public State State { get; set; }
    }
}

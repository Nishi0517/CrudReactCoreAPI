using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; }
        public string CountryName { get; set; }

        public List<State> States { get; set; }
    }
}

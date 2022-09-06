using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase.Models
{
    public class Companies
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string VATNumber { get; set; }
        public string Number { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }
    }
}

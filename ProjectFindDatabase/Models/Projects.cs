using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase.Models
{
    public class Projects
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int User_Id { get; set; }
        public string User_Name { get; set; }
        public string User_Email { get; set; }
        public bool Closed { get; set; }
        public string Company_Id { get; set; }
    }
}

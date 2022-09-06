using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase.Models
{
    public class Students
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime StartDateFax { get; set; }
        public int Faculty_Id { get; set; }
        public bool Academy { get; set; }
        public string AcademyName { get; set; }
        public int GradeLevel { get; set; }
        public Helpers.Enumerations.Degree Degree { get; set; }
        public string StudentEmail { get; set; }
        public int Skill_Id { get; set; }
        public string Biography { get; set; }
    }
}

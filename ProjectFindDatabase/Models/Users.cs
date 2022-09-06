using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase.Models
{
    public class Users
    {
        public int Id { get; set; }
        public Helpers.Enumerations.Role Role { get; set; }
        public Helpers.Enumerations.Gender Gender { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public string Image { get; set; }
        public int Company_Id { get; set; }
        public string Name { get; set; }
        public int Student_Id { get; set; }
    }
}

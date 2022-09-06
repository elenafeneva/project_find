using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase.Helpers
{
    public class Enumerations
    {
        public enum Role : ushort
        {
            Administrator = 1,
            Operator = 2,
            Student=3,
        }
        public enum Gender : ushort
        {
            Male = 0,
            Female = 1,
            Other = 2,
        }
        public enum Degree : ushort
        {
            Dodiplomski = 1,
            Magisterski = 2,
            Doktorski = 3,
        }
    }
}

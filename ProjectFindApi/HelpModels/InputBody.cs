using ProjectFindDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectFindApi.HelpModels
{
    public class InputBody
    {
        public Users Login { get; set; }
        public string Podatoci { get; set; }
        public string Metod { get; set; }
        public string Parametar { get;  set; }
    }
}

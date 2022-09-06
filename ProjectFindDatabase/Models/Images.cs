using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectFindDatabase
{
    public class Images
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Image { get; set; }
        public int User_Id { get; set; }
    }
}

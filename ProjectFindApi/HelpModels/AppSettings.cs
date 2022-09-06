using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectFindApi.HelpModels
{
    public class AppSettings
    {
        public string ConnectionString { get; set; }
        public string WEBaddress { get; set; }
        public string SMTPfrom { get; set; }
        public string SMTPserver { get; set; }
        public int SMTPport { get; set; }
        public string SMTPuser { get; set; }
        public string SMTPpassword { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ProjectFindApi.HelpModels
{
    public class Global
    {
        #region Variables
        public static string dbConnString;
        public static AppSettings appSettings;
        #endregion

        public static void ReadAppSetting()
        {
            string appPath = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            string appsettingsPath = appPath + "\\appsettings.json";
            appSettings = JsonConvert.DeserializeObject<AppSettings>(File.ReadAllText(appsettingsPath));
        }
    }
}

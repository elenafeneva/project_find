using ProjectFindApi.HelpModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectFindApi.BL
{
    public class BL_Dashboard
    {
       public async static Task<string> GetCompaniesNumber()
        {
            var ret = await DAL.ExecuteStoreProcedure("CompaniesNumber");
            return ret;
        }
        public async static Task<string> GetStudentsNumber()
        {
            var ret = await DAL.ExecuteStoreProcedure("StudentsNumber");
            return ret;
        }
        public async static Task<string> GetProjectsNumber()
        {
            var ret = await DAL.ExecuteStoreProcedure("ProjectsNumber");
            return ret;
        }
        public async static Task<string> GetProjectsClosedNumber()
        {
            var ret = await DAL.ExecuteStoreProcedure("ProjectsClosed");
            return ret;
        }
        public async static Task<string> GetCompaniesProjectsNumber()
        {
            var ret = await DAL.ExecuteStoreProcedure("CompaniesProjects");
            return ret;
        }
        public async static Task<string> GetTopSkills()
        {
            var ret = await DAL.ExecuteStoreProcedure("TopSkills");
            return ret;
        }
    }
}

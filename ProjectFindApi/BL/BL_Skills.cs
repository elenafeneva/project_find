using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectFindApi.BL
{
    public class BL_Skills
    {
        public async static Task<List<Skills>> GetSkills()
        {
            string sql = $"SELECT * FROM [dbo].[Skills] FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(resp);
                return skills;
            }
            else
            {
                return null;
            }
        }
        public async static Task<bool> SaveSkill(Skills skill)
        {
            string sql = $"INSERT INTO [dbo].[Skills] (Name,Description) VALUES ('" + skill.Name + "' , '" + skill.Description + "')";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public async static Task<bool> SaveStudentSkills(List<Skills> skills,string studentID)
        {
            foreach (Skills skill in skills)
            {
                string sql = $"INSERT INTO [dbo].[StudentsSkills] ([ID_Student],[ID_Skill]) VALUES({studentID},{skill.Id})";
                string resp = await DAL.ExecuteDataReader(sql);
            }
            return true;
        }
        public async static Task<List<Skills>> GetStudentProjectSkills(int studentId)
        {
            string sql = $"select S.*  from [dbo].[StudentsSkills] SS inner join [dbo].[Skills] S on SS.ID_Skill=S.Id where SS.ID_Student={studentId} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(resp);
                return skills;
            }
            else
            {
                return new List<Skills>();
            }
        }
        public async static Task<List<Skills>> GetSelectedProjectSkills(int projectId)
        {
            string sql = $"select S.* from [dbo].[ProjectsSkills] PS inner join [dbo].[Skills] S on PS.ID_Skill=S.Id where PS.ID_Project={projectId} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(resp);
                return skills;
            }
            else
            {
                return new List<Skills>();
            }
        }
    }
}

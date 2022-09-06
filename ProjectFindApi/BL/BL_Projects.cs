using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase.Models;

namespace ProjectFindApi.BL
{
    public class BL_Projects
    {
        public async static Task<bool> SaveOneProject(Users user, Projects project, List<Skills> projectSkills)
        {
            try
            {
                //INSERT PROJECT 
                string sql = $"INSERT INTO [dbo].[Projects] ([Name],[Description],[User_Id],[Company_Id]) VALUES (N'{project.Name}',N'{project.Description}', {user.Id}, {user.Company_Id})";
                string resp = await DAL.ExecuteDataReader(sql);

                sql = $"SELECT * FROM [dbo].[Projects] WHERE [Name]=N'{project.Name}' FOR JSON PATH";
                resp = await DAL.ExecuteDataReader(sql);

                if (resp != "ERROR" && resp != "")
                {
                    List<Projects> saveProjects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                    foreach (Skills skill in projectSkills)
                    {
                        string sqlSkills = $"INSERT INTO [dbo].[ProjectsSkills] ([ID_Project],[ID_Skill]) VALUES({saveProjects.FirstOrDefault().Id},{skill.Id})";
                        string respSkills = await DAL.ExecuteDataReader(sqlSkills);
                    }
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        public async static Task<List<Projects>> GetProjects(Users user)
        {
            if(user.Company_Id!=0)
            {
                //GET PROJECTS FROM THAT COMPANY
                string sql = $"select P.Id,P.[Name],P.[Description],P.[Company_Id],U.Id AS [User_Id],U.Username AS [User_Name],U.Email AS [User_Email] from [dbo].[Projects] AS P inner join [dbo].[Users] AS U on P.[User_Id]=U.Id where P.[Company_Id]={user.Company_Id} and P.[Closed]={0} FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                return projects;
            }
            //IMPLEMENT FOR STUDENTS
            else
            {
                string sql = $"select P.Id,P.[Name],P.[Description],P.[Company_Id],U.Id AS [User_Id],U.Username AS [User_Name],U.Email AS [User_Email] from [dbo].[Projects] AS P inner join [dbo].[Users] AS U on P.[User_Id]=U.Id left outer join [dbo].[ProjectsStudents] PST on P.Id=PST.ID_Project  where (PST.ID_Student is null or PST.ID_Student !={user.Student_Id}) FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                return projects;
            }
        }
        public async static Task<Projects>  GetProject(string projectId)
        {
            string sql = $"select * from [dbo].[Projects] where Id={projectId} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
            return projects.FirstOrDefault();
        }
        public async static Task<bool> CloseProject(int projectId)
        {
            int closedNum = 1;
            string sql = $"UPDATE [dbo].[Projects] SET [Closed]={closedNum} WHERE [Id]='{projectId}'";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public async static Task<List<Projects>> GetParticipatedProjects(Users user)
        {
                string sql = $"select P.Id,P.[Name],P.[Description],P.[Company_Id],U.Id AS [User_Id],U.Username AS [User_Name],U.Email AS [User_Email] from [dbo].[Projects] AS P inner join [dbo].[Users] AS U on P.[User_Id]=U.Id left outer join [dbo].[ProjectsStudents] PST on P.Id=PST.ID_Project  where PST.ID_Student={user.Student_Id} FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                return projects;
        }
        public async static Task<List<Projects>> GetProjectsBySkills(List<Skills> skills,Users user)
        {
            string skillsList="(";
            foreach(Skills skill in skills)
            {

                skillsList += skill.Id.ToString();
                skillsList += ",";
            }
            skillsList = skillsList.Remove(skillsList.Length - 1);
            skillsList += ")";
            if (user.Company_Id > 0)
            {
                string sql = $"select distinct P.* from [dbo].[Projects] as P inner join[dbo].[ProjectsSkills] as PS on P.Id = PS.ID_Project where PS.ID_Skill in {skillsList} and P.Company_Id={user.Company_Id} FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                return projects;
            }
            //IMPLEMENT FOR STUDENTS
            else
            {
                string sql = $"select distinct P.* from [dbo].[Projects] as P inner join[dbo].[ProjectsSkills] as PS on P.Id = PS.ID_Project left outer join [dbo].[ProjectsStudents] as PST on P.Id=PST.ID_Project where PS.ID_Skill in {skillsList} and (PST.ID_Student is null or PST.ID_Student !={user.Student_Id}) FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
                return projects;
            }
        }
        public async static Task<List<Projects>> GetParticipatedProjectsBySkills(List<Skills> skills, Users user)
        {
            string skillsList = "(";
            foreach (Skills skill in skills)
            {

                skillsList += skill.Id.ToString();
                skillsList += ",";
            }
            skillsList = skillsList.Remove(skillsList.Length - 1);
            skillsList += ")";

            string sql = $"select distinct P.* from [dbo].[Projects] as P inner join[dbo].[ProjectsSkills] as PS on P.Id = PS.ID_Project left outer join [dbo].[ProjectsStudents] as PST on P.Id=PST.ID_Project where PS.ID_Skill in {skillsList} and PST.ID_Student ={user.Student_Id} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            List<Projects> projects = JsonConvert.DeserializeObject<List<Projects>>(resp);
            return projects;

        }
        public async static Task<Tuple<Users, List<Skills>>> GetProjectUserSkills(string Id)
        {
            try {
            int projectId = Int32.Parse(Id);
            //TAKE USER
            string sql = $"select distinct u.* from [dbo].[Projects] p inner join [dbo].Users u on p.User_Id=u.Id where p.Id={projectId} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            List<Users> users = JsonConvert.DeserializeObject<List<Users>>(resp);
            Users user = users[0];

            //TAKE SKILLS 
            string sqlskills = $"select s.* from [dbo].[Projects] p inner join [dbo].ProjectsSkills ps on p.Id= ps.ID_Project inner join [dbo].[Skills] s on ps.ID_Skill=s.Id where p.Id={projectId} FOR JSON PATH";
            string respskills = await DAL.ExecuteDataReader(sqlskills);
            List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(respskills);
                
            return new Tuple<Users, List<Skills>>(user, skills);
            }
            catch(Exception ex)
            {
                return null;
            }
        }
        public async static Task<List<Students>> GetProjectParticipatedStudents(int projectId)
        {
            try
            {
                string sql = $"select U.Username,S.*,PS.ApplyDescription from [dbo].[ProjectsStudents] PS inner join [dbo].[Students] S on PS.ID_Student=S.Id inner join [dbo].[Users] U on S.Id=U.Student_Id where PS.ID_Project={projectId} FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                if (resp != "ERROR" && resp != "") { 
                    List<Students> students = JsonConvert.DeserializeObject<List<Students>>(resp);
                    return students;
                }
                else
                {
                    List<Students> students = new List<Students>();
                    return students;
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

    }
}

using MimeKit;
using ProjectFindDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;

namespace ProjectFindApi.HelpModels
{
    public class SendEmail
    {
        public async static Task SendMailAsync(List<Users> users, bool PasswordReminder = false)
        {
            Global.ReadAppSetting();
            Users u = users.FirstOrDefault();
            string link = $"{Global.appSettings.WEBaddress}";

            string Poraka = "<!DOCTYPE html><html><head><meta charset = \"utf-8\" /><title></title></head><body><p>Почитувани! На следниот линк #LINK# внесете лозинка за вашиот ProjectFind профил.</p></body></html>";

            Poraka = Poraka.Replace("#LINK#", link).Replace("#NAME#", $"{u.Username}");

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(Global.appSettings.SMTPfrom, Global.appSettings.SMTPfrom));
            mailMessage.To.Add(new MailboxAddress($"{u.Email}", u.Email));
            mailMessage.Subject = "Project Find Forgot Password";
            mailMessage.Body = new TextPart("html")
            {
                Text = Poraka
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect(Global.appSettings.SMTPserver, Global.appSettings.SMTPport);
                smtpClient.Authenticate(Global.appSettings.SMTPuser, Global.appSettings.SMTPpassword);
                smtpClient.Send(mailMessage);
                smtpClient.Disconnect(true);
            }

        }

        public async static Task SendMailStudents(List<Students> students, Projects project, Companies company)
        {
            foreach (Students s in students)
            {
                string Poraka = "<!DOCTYPE html><html><head><meta charset = \"utf-8\" /><title></title></head><body><p>Почитувани! Вие сте одбрани да бидете дел од проектот #PROJECTNAME# од компанијата #COMPANYNAME#.Честитки!</p></body></html>";

                Poraka = Poraka.Replace("#PROJECTNAME#", project.Name).Replace("#COMPANYNAME#", $"{company.Name}");

                var mailMessage = new MimeMessage();
                mailMessage.From.Add(new MailboxAddress(Global.appSettings.SMTPfrom, Global.appSettings.SMTPfrom));
                mailMessage.To.Add(new MailboxAddress($"{s.StudentEmail}", s.StudentEmail));
                mailMessage.Subject = "Project Find Forgot Password";
                mailMessage.Body = new TextPart("html")
                {
                    Text = Poraka
                };

                using (var smtpClient = new SmtpClient())
                {
                    try
                    {
                        smtpClient.Connect(Global.appSettings.SMTPserver, Global.appSettings.SMTPport);
                        smtpClient.Authenticate(Global.appSettings.SMTPuser, Global.appSettings.SMTPpassword);
                        smtpClient.Send(mailMessage);
                        smtpClient.Disconnect(true);
                    }
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }

                }
            }
        }
    }
}

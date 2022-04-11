using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;
using System.IO;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class UploadController : ControllerBase
{

    private readonly ILogger<UploadController> _logger;

    public UploadController(ILogger<UploadController> logger)
    {
        
        _logger = logger;
    }
    [HttpPost]
    public async Task<string> Upload(){
    
        string filename=string.Empty;
        foreach (var formFile in Request.Form.Files){
           string  random = string.Join("", Guid.NewGuid().ToString("n").Take(10).Select(o => o));
           filename=random+"."+formFile.FileName.ToString().Split(".")[1];
        var filePath = "./Uploads/"+filename;
           if (formFile.Length > 0)
           {
              using (var inputStream = new FileStream(filePath, FileMode.Create))
              {
                 await formFile.CopyToAsync(inputStream);
                 byte[] array = new byte[inputStream.Length];
                 inputStream.Seek(0, SeekOrigin.Begin);
                 inputStream.Read(array, 0, array.Length);
              }
           }
        }
            
           return filename; 
        }
        
   
}


using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class AdminController : ControllerBase
{

    private readonly ILogger<AdminController> _logger;

    public AdminController(ILogger<AdminController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        if(
            string.IsNullOrEmpty(Request.Query["user"])
            &&
            string.IsNullOrEmpty(Request.Query["pass"])
        ){
            
            Admin htl=new Admin();
            object ko=htl.read("admins");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Admin htl=new Admin();
            object ko=htl.read("admins","username='"+Request.Query["user"]+"' and pass='"+Request.Query["pass"]+"'");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Admin htl=new Admin();
        
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(0,"id");
        int adder=htl.add("admins",Request.Form,nulls,2);
        if(adder==0){
            object ok=htl.read("admins");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("admins");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Admin htl=new Admin();
        
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("admins","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("admins","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("admins","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("admins","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Admin htl=new Admin();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("admins","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("admins","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("admins","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("admins","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

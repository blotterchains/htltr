using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(
            string.IsNullOrEmpty(Request.Query["email"])
            &&
            string.IsNullOrEmpty(Request.Query["pass"])
        ){
            User htl=new User();
            object ko=htl.read("user");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            User htl=new User();
            object ko=htl.read(
                "user",
                "email='"+Request.Query["email"]+
                "' and pass='"+Request.Query["pass"]+"'"
                );
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        User htl=new User();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(4,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("user",Request.Form,nulls,4);
        if(adder==-1){
            object ok=htl.read("user","email='"+Request.Form["email"]+"'");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("user","email='"+Request.Form["email"]+"'");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        User htl=new User();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("user","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("user","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("user","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("user","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        User htl=new User();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("user","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("user","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("user","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("user","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

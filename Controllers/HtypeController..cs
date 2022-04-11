using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class HtypeController : ControllerBase
{

    private readonly ILogger<HtypeController> _logger;

    public HtypeController(ILogger<HtypeController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["hid"]) && string.IsNullOrEmpty(Request.Query["id"])){
            Htype htl=new Htype();
            object ko=htl.read("htypes");
             System.Diagnostics.Process.Start("echo","123333");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }
        else if(!string.IsNullOrEmpty(Request.Query["id"])){
            Htype htl=new Htype();
            object ko=htl.read("htypes","id="+Request.Query["id"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }
        else if(!string.IsNullOrEmpty(Request.Query["hid"])){
            Htype htl=new Htype();
            object ko=htl.read("htypes","hid="+Request.Query["hid"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
           
        }else{
            Htype htl=new Htype();
            object ko=htl.read("htypes","hid=0");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Htype htl=new Htype();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(5,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("htypes",Request.Form,nulls,5);
        System.Diagnostics.Process.Start("echo","123333");
        if(adder==-1){
            object ok=htl.read("htypes");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("htypes");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Htype htl=new Htype();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("htypes","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("htypes","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("htypes","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("htypes","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Htype htl=new Htype();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("htypes","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("htypes","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("htypes","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("htypes","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

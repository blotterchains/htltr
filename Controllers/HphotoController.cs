using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class HphotoController : ControllerBase
{

    private readonly ILogger<HphotoController> _logger;

    public HphotoController(ILogger<HphotoController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["hid"])){
            Hphoto htl=new Hphoto();
            object ko=htl.read("hphoto");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Hphoto htl=new Hphoto();
            object ko=htl.read("hphoto","hid="+Request.Query["hid"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Hphoto htl=new Hphoto();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(3,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("hphoto",Request.Form,nulls,3);
        if(adder==-1){
            object ok=htl.read("hphoto","hid="+Request.Form["hid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hphoto","hid="+Request.Form["hid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Hphoto htl=new Hphoto();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hphoto","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("hphoto","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("hphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Hphoto htl=new Hphoto();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hphoto","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("hphoto","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("hphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class TphotoController : ControllerBase
{

    private readonly ILogger<TphotoController> _logger;

    public TphotoController(ILogger<TphotoController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["tid"])){
            Tphoto htl=new Tphoto();
            object ko=htl.read("tphoto");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Tphoto htl=new Tphoto();
            object ko=htl.read("tphoto","tid="+Request.Query["tid"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Tphoto htl=new Tphoto();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(3,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("tphoto",Request.Form,nulls,3);
        if(adder==-1){
            object ok=htl.read("tphoto","tid="+Request.Form["tid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("tphoto","tid="+Request.Form["tid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Tphoto htl=new Tphoto();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("tphoto","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("tphoto","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        object ok=htl.read("tphoto");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Tphoto htl=new Tphoto();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("tphoto","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("tphoto","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("tphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("tphoto","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

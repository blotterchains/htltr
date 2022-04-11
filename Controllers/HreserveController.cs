using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class HreserveController : ControllerBase
{

    private readonly ILogger<HreserveController> _logger;

    public HreserveController(ILogger<HreserveController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["uid"])){
            Hreserve htl=new Hreserve();
            object ko=htl.read("hreserve");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Hreserve htl=new Hreserve();
            object ko=htl.read("hreserve","uid="+Request.Query["uid"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["uid"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Hreserve htl=new Hreserve();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(5,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("hreserve",Request.Form,nulls,5);
        if(adder==-1){
            object ok=htl.read("hreserve","uid="+Request.Form["uid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hreserve","uid="+Request.Form["uid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Hreserve htl=new Hreserve();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hreserve","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("hreserve","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("hreserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hreserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Hreserve htl=new Hreserve();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hreserve","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("hreserve","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("hreserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hreserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

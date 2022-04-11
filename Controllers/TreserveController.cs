using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class TreserveController : ControllerBase
{

    private readonly ILogger<TreserveController> _logger;

    public TreserveController(ILogger<TreserveController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["uid"])){
            Treserve htl=new Treserve();
            object ko=htl.read("treserve");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Treserve htl=new Treserve();
            object ko=htl.read("treserve","uid="+Request.Query["uid"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Treserve htl=new Treserve();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(4,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("treserve",Request.Form,nulls,4);
        if(adder==-1){
            object ok=htl.read("treserve","uid="+Request.Form["uid"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("treserve");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Treserve htl=new Treserve();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("treserve","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("treserve","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("treserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("treserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Treserve htl=new Treserve();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("treserve","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("treserve","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("treserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("treserve","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

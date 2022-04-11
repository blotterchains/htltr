using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class HotelController : ControllerBase
{

    private readonly ILogger<HotelController> _logger;

    public HotelController(ILogger<HotelController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["id"])){
            Hotel htl=new Hotel();
            object ko=htl.read("hotel");
            
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Hotel htl=new Hotel();
            object ko=htl.read("hotel","id="+Request.Query["id"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Hotel htl=new Hotel();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(5,"submitdate");
        nulls.Add(0,"id");
        int adder=htl.add("hotel",Request.Form,nulls,5);
        if(adder==-1){
            object ok=htl.read("hotel");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hotel");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Hotel htl=new Hotel();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hotel","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("hotel","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("hotel","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hotel","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Hotel htl=new Hotel();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("hotel","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("hotel","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("hotel","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("hotel","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

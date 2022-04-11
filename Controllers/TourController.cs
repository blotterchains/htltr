using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;

namespace hotel_tour_project.Controllers;
[ApiController]
[Route("[controller]")]
public class TourController : ControllerBase
{

    private readonly ILogger<TourController> _logger;

    public TourController(ILogger<TourController> logger)
    {
        
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ResponseObj> Get()
    {
        
        
        if(string.IsNullOrEmpty(Request.Query["id"])){
            Tour htl=new Tour();
            object ko=htl.read("tour");
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
        }else{
            Tour htl=new Tour();
            object ko=htl.read("tour","id="+Request.Query["id"]);
            Response rtn=new Response(1,ko);        
            return rtn.MakeRespError();
            System.Diagnostics.Process.Start("echo","123333"+Request.Query["id"]);
        }
            
        
        
        
        
    }
    [HttpPost]
    public IEnumerable<ResponseObj> Post(){
        Tour htl=new Tour();
        IDictionary<int, string> nulls =new Dictionary<int, string>();
        nulls.Add(7,"submitdate");
        nulls.Add(0,"id");
        
        int adder=htl.add("tour",Request.Form,nulls,7);
        if(adder==-1){
            object ok=htl.read("tour");
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{            
            foreach (var key in Request.Form)
            {
                if(key.Key=="description"){
                    object ok=htl.read("tour"
                                ,"description='"+key.Value+"'"
                    );
                    Response rtn=new Response(adder,ok);
                    return rtn.MakeRespError();
                }
                System.Diagnostics.Process.Start("echo",key.Key);
            }
            
        }
        object _ok=htl.read("tour"
                    ,"description=''"
                    );
        Response _rtn=new Response(adder,_ok);
        return _rtn.MakeRespError();
    }
    [HttpPut]
    public IEnumerable<ResponseObj> Put(){
        Tour htl=new Tour();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("tour","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.update("tour","id="+Convert.ToInt32(Request.Query["id"]),Request.Form);
        if(adder==1){
            object ok=htl.read("tour","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("tour","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
        
    }
    [HttpDelete]
    public IEnumerable<ResponseObj> Delete(){
        Tour htl=new Tour();
        if(string.IsNullOrEmpty(Request.Query["id"])){
            object ok=htl.read("tour","id=0");
            Response rtn=new Response(0,ok);
            return rtn.MakeRespError();
        }else{
            
            int adder=htl.delete("tour","id="+Convert.ToInt32(Request.Query["id"]));
        if(adder==1){
            object ok=htl.read("tour","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }else{
            object ok=htl.read("tour","id="+Request.Query["id"]);
            Response rtn=new Response(adder,ok);
            return rtn.MakeRespError();
        }
        }
    }
}

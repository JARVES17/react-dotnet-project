using CrudApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController:ControllerBase
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;


        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Emploee>>> GetEmplyee()
        {
            if (_employeeContext.Emploees==null) {
                return NotFound();
            }
            return await _employeeContext.Emploees.ToListAsync();
        }
        [HttpGet("all")]
        public async Task<ActionResult<Emploee>> GetById(int reqId)
        {
            if (_employeeContext.Emploees == null)
            {
                return NotFound();
            }
           var result= await _employeeContext.Emploees.FindAsync(reqId);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }
        [HttpPost]
        public async Task<ActionResult<Emploee>> CreateEmployee(Emploee obj)
        {
             _employeeContext.Emploees.Add(obj);
            await _employeeContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById),new {id=obj.Id},obj);
        }

        [HttpPut("id")]
        public async Task<ActionResult> PutEmpoyee(int id,Emploee obj)
        {
            if(id != obj.Id)
            {
                return BadRequest();
            }
            _employeeContext.Entry(obj).State = EntityState.Modified;
            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("id")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if (_employeeContext.Emploees == null)
            {
                return NotFound();
            }
            var rsult = await _employeeContext.Emploees.FindAsync(id);
            if (rsult == null)
            {
                return NotFound();
            }
             _employeeContext.Emploees.Remove(rsult);
            await _employeeContext.SaveChangesAsync();
            return Ok();
        }
    }
}

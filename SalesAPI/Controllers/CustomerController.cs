using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesAPI.Controllers;
using SalesAPI.Data;
using SalesAPI.DTOs;
using SalesAPI.Models;

namespace SalesAPI.Controllers
{
    public class CustomerController(DataContext _context) : BaseApiController
    {
        [HttpGet("customers")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();

            return customers;
        }

        [HttpGet("customerById")]
        public async Task<ActionResult<Customer>> GetCustomerById([FromQuery] Guid guid)
        {           
            var customer = await _context.Customers.Where(c=>c.Id == guid).Include(c => c.AppUser).FirstOrDefaultAsync();

            return customer;
        }

        [HttpGet("customersByAppUserId")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers([FromQuery] string appUserId)
        {
            if(appUserId == null) return BadRequest("Not valid user");

            var customers = await _context.Customers.Where(c=>c.AppUser.Id.ToString()==appUserId.ToUpper()).ToListAsync();

            return customers;
        }


        [HttpPost("createcustomer")]
        public async Task<ActionResult<CustomerDto>> CreateCustomer(CustomerDto customerDto)
        {
            
            if(customerDto.AppUser == null) return Unauthorized("Invalid AppUser"); 
            
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==customerDto.AppUser.UserName);

            if(user == null) return Unauthorized("User not found");

            var customer = new Customer
            {
                Id = Guid.NewGuid(),
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName,
                Title = customerDto.Title,
                VatNumber = customerDto.VatNumber,
                PhoneNumber = customerDto.PhoneNumber,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                AppUser = user
            };

            _context.Add(customer);
            
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("updatecustomer")]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer(CustomerDto customerDto,[FromQuery] Guid guid)
        {
            
            if(customerDto.AppUser == null) return Unauthorized("Invalid AppUser"); 
            
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==customerDto.AppUser.UserName);

            if(user == null) return Unauthorized("User not found");

            var customer = await _context.Customers.Where(c=>c.Id.ToString().ToUpper()==guid.ToString().ToUpper()).FirstOrDefaultAsync();

            if(customer == null) return BadRequest("Not valid customer");

            var updatedCustomer = customerDto.GetCustomerFromDto(customer,customerDto);

            _context.Update(updatedCustomer);
            
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
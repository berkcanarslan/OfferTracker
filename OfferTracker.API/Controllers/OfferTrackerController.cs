using Microsoft.AspNetCore.Mvc;
using OfferTracker.Business.DTOs;
using OfferTracker.Business.Services;
using OfferTracker.Shared;

namespace OfferTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferTrackerController : CustomBaseController
{
    private readonly IOfferTrackerService _orderTrackerService;
    
    public OfferTrackerController(IOfferTrackerService orderTrackerService)
    {
        _orderTrackerService = orderTrackerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOffersAsync()
    {   
        return Ok(await _orderTrackerService.GetAllAsync());
    }
    
    [HttpGet("{offerId}")]
    public async Task<IActionResult> GetOfferByIdAsync(int offerId)
    {
        return Ok(await _orderTrackerService.GetByIdAsync(offerId));
    }

    [HttpPost]
    public async Task<IActionResult> CreateOfferAsync(OfferCreateDto offer)
    {
        var response = await _orderTrackerService.AddAsync(offer);
        return CreateActionResultInstance(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(OfferUpdateDto offer)
    {
        var response = await _orderTrackerService.UpdateAsync(offer);
        return CreateActionResultInstance(response);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int offerId)
    {
        var response = await _orderTrackerService.DeleteAsync(offerId);
        return CreateActionResultInstance(response);
    }
}
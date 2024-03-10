using OfferTracker.Business.DTOs;
using OfferTracker.Shared;

namespace OfferTracker.Business.Services;

public interface IOfferTrackerService
{
    Task<Response<IEnumerable<OfferDto>>> GetAllAsync();
    Task<Response<OfferDto>> GetByIdAsync(int id);
    Task<Response<NoContent>> AddAsync(OfferCreateDto offer);
    Task<Response<NoContent>> UpdateAsync(OfferUpdateDto offer);
    Task<Response<NoContent>> DeleteAsync(int offerId);
}
using OfferTracker.Models;

namespace OfferTracker.Data.Repository;

public interface IOfferTrackerRepository
{
    Task<IEnumerable<Offer>> GetAllAsync();
    Task<Offer> GetByIdAsync(int id);
    Task AddAsync(Offer offer);
    Task UpdateAsync(Offer offer);
    Task DeleteAsync(int offerId);
    Task<int> SaveChangesAsync();
}
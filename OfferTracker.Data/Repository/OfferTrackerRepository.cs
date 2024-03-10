using OfferTracker.Models;
using Microsoft.EntityFrameworkCore;
namespace OfferTracker.Data.Repository;

public class OfferTrackerRepository(AppDbContext context) : IOfferTrackerRepository
{
    public async Task<IEnumerable<Offer>> GetAllAsync()
    {
        return await context.Offers.AsNoTracking().ToListAsync();
    }

    public async Task<Offer> GetByIdAsync(int id)
    {
           return await context.Offers.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddAsync(Offer offer)
    {
        await context.Offers.AddAsync(offer);
    }

    public async Task UpdateAsync(Offer offer)
    {
        context.Offers.Update(offer);
    }

    public async Task DeleteAsync(int offerId)
    {
        var offer = await context.Offers.FirstOrDefaultAsync(o => o.Id == offerId);
        if (offer != null) context.Offers.Remove(offer);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
}
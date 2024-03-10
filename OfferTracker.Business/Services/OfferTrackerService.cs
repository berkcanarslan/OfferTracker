
using System.Net;
using AutoMapper;
using OfferTracker.Business.DTOs;
using OfferTracker.Data.Repository;
using OfferTracker.Models;
using OfferTracker.Shared;

namespace OfferTracker.Business.Services
{
    public class OfferTrackerService : IOfferTrackerService
    {
        private readonly IOfferTrackerRepository _offerTrackerRepository;
        private readonly IMapper _mapper;
        
        public OfferTrackerService(IOfferTrackerRepository offerTrackerRepository, IMapper mapper)
        {
            _offerTrackerRepository = offerTrackerRepository;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<OfferDto>>> GetAllAsync()
        {
            var offers = await _offerTrackerRepository.GetAllAsync();
            return Response<IEnumerable<OfferDto>>.Success(_mapper.Map<IEnumerable<OfferDto>>(offers),200);
        }

        public async Task<Response<OfferDto>> GetByIdAsync(int offerId)
        {
            var offer = await _offerTrackerRepository.GetByIdAsync(offerId);
            if (offer == null)
            {
                return Response<OfferDto>.Fail(errors: new List<string> { "Offer not found" }, statusCode: (int)HttpStatusCode.NotFound);
            }
            return Response<OfferDto>.Success(_mapper.Map<OfferDto>(offer),200);
        }

        public async Task<Response<NoContent>> AddAsync(OfferCreateDto offer)
        {
            var offerEntity = _mapper.Map<Offer>(offer);
            await _offerTrackerRepository.AddAsync(offerEntity);
            var result = await _offerTrackerRepository.SaveChangesAsync();
    
            if (result > 0)
            {
                return Response<NoContent>.Success(201);
            }

            return Response<NoContent>.Fail(errors: new List<string> { "Failed to add the offer" }, statusCode: (int)HttpStatusCode.NotFound);
        }

        public async Task<Response<NoContent>> UpdateAsync(OfferUpdateDto offer)
        {
            // Check first if the desired update offer exists then update if its exists
            var offerEntity = await _offerTrackerRepository.GetByIdAsync(offer.Id);
            if (offerEntity == null)
            {
                return Response<NoContent>.Fail(errors: new List<string> { "Offer not found" }, statusCode: (int)HttpStatusCode.NotFound);
            }
            _mapper.Map(offer, offerEntity);
            _offerTrackerRepository.UpdateAsync(offerEntity);
            var result = await _offerTrackerRepository.SaveChangesAsync();
            return result > 0 ? Response<NoContent>.Success(204) : Response<NoContent>.Fail(errors: new List<string> { "Failed to update the offer" }, statusCode: (int)HttpStatusCode.NotFound);
            
        }

        public async Task<Response<NoContent>> DeleteAsync(int offerId)
        {
            await _offerTrackerRepository.DeleteAsync(offerId);
            var result = await _offerTrackerRepository.SaveChangesAsync();
    
            if (result > 0)
            {
                return Response<NoContent>.Success(200);
            }

            return Response<NoContent>.Fail(errors: new List<string> { "Failed to delete the offer" }, statusCode: (int)HttpStatusCode.NotFound);
        }

    }
}
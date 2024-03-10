using AutoMapper;
using OfferTracker.Business.DTOs;
using OfferTracker.Models;

namespace OfferTracker.Business.Mapping;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Offer, OfferDto>().ReverseMap();
        CreateMap<OfferCreateDto, Offer>().ReverseMap();
        CreateMap<OfferUpdateDto, Offer>().ReverseMap();
    }
}
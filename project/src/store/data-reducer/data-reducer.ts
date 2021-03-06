import { createReducer } from '@reduxjs/toolkit';
import { Data } from '../../types/state';
import { loadFavoriteOffers, loadNearbyOffers, loadOffers, loadReviews, toggleOfferIsFavorite } from '../action';

const initialState: Data = {
  offers: [],
  reviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
  nearbyOffersForId: null,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload.offers;
      state.nearbyOffersForId = action.payload.id;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(toggleOfferIsFavorite, (state, action) => {
      const offerById = state.offers.find((offer) => offer.id === action.payload.id);
      const nearbyOfferById = state.nearbyOffers.find((offer) => offer.id === action.payload.id);
      const favoriteOfferById = state.favoriteOffers.find((offer) => offer.id === action.payload.id);
      if (offerById) {
        offerById.isFavorite = action.payload.isFavorite;
      }

      if (nearbyOfferById) {
        nearbyOfferById.isFavorite = action.payload.isFavorite;
      }

      if (favoriteOfferById) {
        favoriteOfferById.isFavorite = action.payload.isFavorite;
      }
    });
});

export { dataReducer };

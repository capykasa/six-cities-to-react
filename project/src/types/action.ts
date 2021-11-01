import { Offer } from './offers';

export enum ActionType {
  SelectCity = 'main/selectCity',
  SelectSort = 'main/selectSort',
  SelectOffersByCity = 'main/SelectOffersByCity',
  SortOffers = 'main/SortOffers',
}

export type SelectCity = {
  type: ActionType.SelectCity;
  payload: string;
};

export type SelectSort = {
  type: ActionType.SelectSort;
  payload: string;
};

export type SelectOffersByCity = {
  type: ActionType.SelectOffersByCity;
  payload: Offer[];
};

export type SortOffers = {
  type: ActionType.SortOffers;
  payload: Offer[];
};

export type Actions =
  | SelectCity
  | SelectSort
  | SelectOffersByCity
  | SortOffers;

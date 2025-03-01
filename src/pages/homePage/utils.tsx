import {
    READ_ALL_MOVIES,
    READ_MOVIES_BY_NAME,
    READ_MOVIES_BY_RELEASED_YEAR,
    READ_MOVIES_WITH_FILTERS,
  } from '../../api';
  
  export const getFilteredURL = (
    searchValue: string | undefined,
    releasedYearValue: number | undefined,
  ): string => {
    if (!searchValue && !releasedYearValue) {
      return READ_ALL_MOVIES;
    } else if (!searchValue) {
      return READ_MOVIES_BY_RELEASED_YEAR;
    } else if (!releasedYearValue) {
      return READ_MOVIES_BY_NAME;
    } else {
      return READ_MOVIES_WITH_FILTERS;
    }
  };
  
  export const getParams = (
    searchValue: string | undefined,
    releasedYearValue: number | undefined,
  ): unknown => {
    if (!searchValue && !releasedYearValue) {
      return {};
    } else if (!searchValue) {
      return { releasedYear: releasedYearValue };
    } else if (!releasedYearValue) {
      return { name: searchValue };
    } else {
      return { name: searchValue, releasedYear: releasedYearValue };
    }
  };
  
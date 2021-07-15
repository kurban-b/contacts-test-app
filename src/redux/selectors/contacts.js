import { createSelector } from "reselect";

const contacts = (state) => state.contactsReducer.contacts;
const loading = (state) => state.contactsReducer.loading;
const updateLoading = (state) => state.contactsReducer.updateLoading;
const filter = (state) => state.contactsReducer.filter;

export const contactsSelector = createSelector(
  contacts,
  (contacts) => contacts
);

export const loadingSelector = createSelector(loading, (loading) => loading);

export const updateLoadingSelector = createSelector(
  updateLoading,
  (updateLoading) => updateLoading
);

export const filterSelector = createSelector(filter, (filter) => filter);

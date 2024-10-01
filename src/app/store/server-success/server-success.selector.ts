import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";

export const selectServerMessageFeature = (state:AppState) => state.serverMessage;

export const selectServerMessage = createSelector(
    selectServerMessageFeature,
    (serverMessage) => serverMessage.message
);


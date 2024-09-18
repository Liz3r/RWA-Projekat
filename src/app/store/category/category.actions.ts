import { createAction } from "@ngrx/store";

export const login = createAction(
    '[Categories] Fetch Categories'
);

export const loginSuccess = createAction(
    '[Categories] Fetch Succeeded'
);

export const loginFailure = createAction(
    '[Categories] Fetch Failed'
);

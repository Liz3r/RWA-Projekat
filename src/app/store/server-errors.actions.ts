import { createAction, props } from "@ngrx/store";

export const setError = createAction(
    '[Interceptor] Server Error',
    props<{status: number, message: string}>()
);

export const clearError = createAction(
    '[Interceptor] Clear Error'
)
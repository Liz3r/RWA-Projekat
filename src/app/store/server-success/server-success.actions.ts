import { createAction, props } from "@ngrx/store";


export const setMessage = createAction(
    '[Response Message] Set Message',
    props<{message: string}>()
);

export const clearMessage= createAction(
    '[Response Message] Clear Message'
);
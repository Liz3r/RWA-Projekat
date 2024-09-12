import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/user";
import { CreateUserDto } from "../../dtos/create-user.dto";



export const login = createAction(
    '[Auth] Login',
    props<{username: string, password: string}>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{user: User}>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure'
);

export const register = createAction(
    '[Auth] Register',
    props<{createUserDto: CreateUserDto}>()
)

export const registerSuccess = createAction(
    '[Auth] Register Success'
)

export const registerFailure = createAction(
    '[Auth] Register Failure'
)
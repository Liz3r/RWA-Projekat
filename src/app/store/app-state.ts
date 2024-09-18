import { AuthState } from "./auth/auth.reducer";
import { CategoryState } from "./category/category.reducer";
import { ErrorState } from "./server-errors/server-errors.reducer";


export interface AppState{
    serverErrors: ErrorState
    auth: AuthState
    categories: CategoryState
}

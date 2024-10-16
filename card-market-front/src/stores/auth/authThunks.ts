import AuthCredentials from "../../models/AuthCredentials";
import { AuthService } from "../../services/authService";
import { AppDispatch } from "../../store";
import { authActions } from "./authReducer";

export const login = (credentials: AuthCredentials) => {
    return async (dispatch: AppDispatch) => {
        try {
            const userId = await AuthService.login(credentials);
            dispatch(authActions.login(userId));
        } catch (error) {
            console.error('Authentication failed:', error);
            dispatch(authActions.logout());
        }
    };
};
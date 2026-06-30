import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"

// GET TOKEN FROM LOCALSTORAGE
const token = localStorage.getItem('token')

const initialState = {

    // if token exists -> user logged in
    isLoggedIn: !!token,

    // token
    token: token || '',

    // role
    role: localStorage.getItem('role') || '',

    // user data
    data: JSON.parse(
        localStorage.getItem('data')
    ) || {},

    // loading
    loading: false,

    // error
    error: null
}


// ================= CREATE ACCOUNT =================

export const createAccount = createAsyncThunk(

    'auth/createaccount',

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.post(
                '/api/auth/register',
                data
            )

            console.log(
                "register response:",
                response.data
            )

            return response.data

        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||
                "Something went wrong"
            )
        }
    }
)


// ================= LOGIN USER =================

export const loginUser = createAsyncThunk(

    'auth/login',

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.post(
                '/api/auth/login',
                data
            )

            console.log(
                "login response:",
                response.data
            )

            return response.data
        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||
                "Login failed"
            )
        }
    }
)

export const getProfile = createAsyncThunk(

    "auth/getprofile",

    async (_, thunkAPI) => {

        try {

            const response =
                await axiosInstance.get(
                    "/api/auth/me"
                );

            console.log(
                "profile response:",
                response.data
            );

            return response.data;
        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                "Failed to fetch profile"
            );
        }
    }
);


// ================= SLICE =================

const AuthSlice = createSlice({

    name: 'auth',

    initialState,

    reducers: {

        // LOGOUT
        logout: (state) => {

            state.isLoggedIn = false

            state.token = ''

            state.role = ''

            state.data = {}

            state.loading = false

            state.error = null

            // remove only auth data
            localStorage.removeItem('token')

            localStorage.removeItem('role')

            localStorage.removeItem('data')
        }
    },

    extraReducers: (builder) => {

        builder


        // ================= REGISTER =================

        // REGISTER PENDING
        .addCase(createAccount.pending, (state) => {

            state.loading = true

            state.error = null
        })

        // REGISTER SUCCESS
        .addCase(createAccount.fulfilled, (state) => {

            state.loading = false

            state.error = null
        })

        // REGISTER FAILED
        .addCase(createAccount.rejected, (state, action) => {

            state.loading = false

            state.error = action.payload
        })



        // ================= LOGIN =================

        // LOGIN PENDING
        .addCase(loginUser.pending, (state) => {

            state.loading = true

            state.error = null
        })


        // LOGIN SUCCESS
        .addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false

            state.isLoggedIn = true

            // token
            state.token = action.payload.data.token

            // user data
            state.data = action.payload.data.user

            // role
            state.role = action.payload.data.user.role


            // SAVE TO LOCALSTORAGE

            localStorage.setItem(
                'token',
                action.payload.data.token
            )

            localStorage.setItem(
                'role',
                action.payload.data.user.role
            )

            localStorage.setItem(
                'data',
                JSON.stringify(
                    action.payload.data.user
                )
            )
        })


        // LOGIN FAILED
        .addCase(loginUser.rejected, (state, action) => {

            state.loading = false

            state.error = action.payload
        })

        .addCase(

                getProfile.pending,

                (state) => {

                    state.loading = true;
                }
        )



        .addCase(

            getProfile.fulfilled,

            (state, action) => {

                state.loading = false;

                state.data =
                    action.payload.data;

                state.role =
                    action.payload.data.role;

                localStorage.setItem(

                    "data",

                    JSON.stringify(
                        action.payload.data
                    )
                );

                localStorage.setItem(

                    "role",

                    action.payload.data.role
                );
            }
        )



        .addCase(

            getProfile.rejected,

            (state, action) => {

                state.loading = false;

                state.error =
                    action.payload;
            }
        )
    }
})

export const { logout } = AuthSlice.actions

export default AuthSlice.reducer
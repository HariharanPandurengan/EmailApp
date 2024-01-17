import {configureStore,createSlice} from '@reduxjs/toolkit'

const initialState = {
    username:'',
    email:'',
    login:false,
    fullname:'',
    country:'',
    address:'',
    phone:'',
    aside:false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateUserDetails:(state,action)=>{
            const { username, email } = action.payload;
            state.username = username;
            state.email = email;
            state.login = true;
        },
        logout:(state)=>{
            state.login = false;
        },
        userFullDetails:(state,action)=>{
            const { fullname, country, address , phone } = action.payload;
            state.fullname = fullname;
            state.country = country;
            state.address = address;
            state.phone = phone;
        },
        aside:(state)=>{
            state.aside === true ? state.aside = false : state.aside = true;
        }
    }
});

export const {updateUserDetails,userFullDetails,logout,aside} = userSlice.actions;

export const store =  configureStore({
    reducer: {
        user:userSlice.reducer
    }
});
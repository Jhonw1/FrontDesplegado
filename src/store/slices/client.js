import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: "client",
    initialState: {
        client: null,
    },
    reducers: {
        login: (state, action) => {
            state.client = action.payload;
        },
    },
});

export default clientSlice.reducer;
export const { login } = clientSlice.actions;

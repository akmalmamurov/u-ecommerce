import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clientLocal",
  initialState: {
    clients: [],
  },
  reducers: {
    updateClient: (state, action) => {
      const clientIndex = state.clients.findIndex(
        (client) => client.id === action.payload.id
      );
      if (clientIndex >= 0) {
        state.clients[clientIndex] = action.payload;
      } else {
        state.clients.push(action.payload);
      }
    },
  },
});

export const { updateClient } = clientSlice.actions;
export default clientSlice.reducer;

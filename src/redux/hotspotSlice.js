import { createSlice } from "@reduxjs/toolkit";

export const hotspotSlice = createSlice({
	name: "hotspot",
	initialState: {
		ssid: "DefaultName",
		password: "DefaultPassword",
		status: false,
	},
	reducers: {
		setHotspotValues: (state, action) => {
			state.ssid = action.payload.ssid;
			state.password = action.payload.password;
		},
	},
});

export const { setHotspotValues } = hotspotSlice.actions;
export default hotspotSlice.reducer;

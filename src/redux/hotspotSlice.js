import { createSlice } from "@reduxjs/toolkit";

export const hotspotSlice = createSlice({
	name: "hotspot",
	initialState: {
		ssid: "DefaultName",
		password: "DefaultPassword",
		status: false,
	},
	reducers: {},
});

//export const {} = hotspotSlice.actions;
export default hotspotSlice.reducer;

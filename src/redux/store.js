import { configureStore } from '@reduxjs/toolkit';
import hospotReducer from './hotspotSlice';

export default configureStore({
	reducer: {
		hotspot: hospotReducer,
	},
});

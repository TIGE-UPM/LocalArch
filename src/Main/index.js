import React from 'react';
import { Outlet } from 'react-router-dom';

import Topnav from '../Topnav';

import './Main.css';

function Main() {

	return (
		<div className='w-100 h-100 flex column'>
			<Topnav />
			<Outlet />
		</div>
	);
}

export default Main;

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.module.scss';

function Loader({ className = '', show = false }) {
	if (!show) {
		return null;
	}
	return (
		<div className={`${styles['loader-container']} ${className}`}>
		</div>
	);
}

Loader.propTypes = {
	className: PropTypes.string,
	show: PropTypes.bool,
};

export default Loader;

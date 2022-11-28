import React from 'react';
import PropTypes from 'prop-types';

import styles from './Spinner.module.scss';

function Spinner({ show = false }) {
	if (!show) {
		return null;
	}
	return (
		<div className={`${styles['lds-ring']}`}><div></div><div></div><div></div><div></div></div>
	);
}

Spinner.propTypes = {
	className: PropTypes.string,
	show: PropTypes.bool,
};

export default Spinner;

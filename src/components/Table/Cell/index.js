import React from 'react';
import PropTypes from 'prop-types';

import styles from './Cell.module.scss';

function Cell({ className = '', children }) {
	return (
		<td className={`${styles['cell-container']} font-center ${className}`}>
			{children}
		</td>
	);
}

Cell.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	maxHeight: PropTypes.string,
	children: PropTypes.any,
};

export default Cell;

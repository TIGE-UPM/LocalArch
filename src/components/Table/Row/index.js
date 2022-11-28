import React from 'react';
import PropTypes from 'prop-types';

import styles from './Row.module.scss';

function Row({ className = '', children }) {
	return (
		<tr className={`${styles['row-container']} br-1 ${className}`}>
			{children?.cells}
		</tr>
	);
}

Row.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	maxHeight: PropTypes.string,
	children: PropTypes.any,
};

export default Row;

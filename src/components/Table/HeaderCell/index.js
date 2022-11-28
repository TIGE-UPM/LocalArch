import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderCell.module.scss';

function HeaderCell({ className = '', children }) {
	return (
		<td className={`${styles['header-cell-container']} font-600 font-marengo font-center ${className}`}>
			{children}
		</td>
	);
}

HeaderCell.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	maxHeight: PropTypes.string,
	children: PropTypes.any,
};

export default HeaderCell;

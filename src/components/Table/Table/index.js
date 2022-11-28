import React from 'react';
import PropTypes from 'prop-types';

import styles from './Table.module.scss';

function Table({ className = '', children }) {
	return (
		<table className={`${styles['table-container']} ${className}`}>
			<thead className={`${styles['table-header-container']}`}>{children?.headers}</thead>
			<tbody className={`${styles['table-body-container']}`}>{children?.rows}</tbody>
			<tfoot className={`${styles['table-footer-container']}`}>{children?.footers}</tfoot>
		</table>
	);
}

Table.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	maxHeight: PropTypes.string,
	children: PropTypes.any,
};

export default Table;

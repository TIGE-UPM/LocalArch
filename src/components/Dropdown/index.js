import React from 'react';
import PropTypes from 'prop-types';

import styles from './Dropdown.module.scss';

function Dropdown({ className = '', isOpen = false, maxHeight = '200px', children }) {
	return (
		<div className={`${styles['dropdown-container']} ${className}`}>
			<children.type
				{...children.props}
				className={`${styles['dropdown-content-container']} flex column ${children.props.className}`}
				style={{ '--max-height': isOpen ? maxHeight : '0px' }}>
			</children.type>
		</div>
	);
}

Dropdown.propTypes = {
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	maxHeight: PropTypes.string,
	children: PropTypes.any,
};

export default Dropdown;

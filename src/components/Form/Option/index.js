import React from 'react';
import PropTypes from 'prop-types';

import styles from './Option.module.scss';

function Option({ className = '', label, isDisabled = false, isSelected = false, children, onClick }) {
	return (
		<div
			className={`${styles['option-container']} p-1 ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''} ${className}`}
			onClick={isDisabled ? null : onClick}>
			{children || label}
		</div>
	);
}

Option.propTypes = {
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
	isDisabled: PropTypes.bool,
	isSelected: PropTypes.bool,
	children: PropTypes.any,
	onClick: PropTypes.func,
};

export default Option;

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './ButtonLink.module.scss';

function ButtonLink({ className = '', style = 'link', href = null, to = null, isDisabled = false, children, onClick }) {
	if (to) {
		return (
			<NavLink
				className={`${styles['button-link-container']} ${styles[style]} ${isDisabled ? styles.disabled : ''} ${className}`}
				to={to}
				onClick={isDisabled ? null : onClick}>
				{children}
			</NavLink>
		);
	}
	return (
		<a
			className={`${styles['button-link-container']} ${styles[style]} ${isDisabled ? styles.disabled : ''} ${className}`}
			href={href}
			onClick={isDisabled ? null : onClick}>
			{children}
		</a>
	);
}

ButtonLink.propTypes = {
	className: PropTypes.string,
	style: PropTypes.oneOf(['none', 'link', 'button']),
	href: PropTypes.string,
	to: PropTypes.string,
	isDisabled: PropTypes.bool,
	children: PropTypes.any,
	onClick: PropTypes.func,
};

export default ButtonLink;

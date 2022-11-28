import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@Components/Icon';

import styles from './Error.module.scss';

function Error({ className = '', error }) {
	if (!error) {
		return <div className={`${styles['error-container']} ${className}`}></div>;
	}

	const { message } = error;
	return (
		<div className={`${styles['error-container']} inline-flex align-items-center gap-1 ${className}`}>
			<div className={`${styles['icon-container']} flex center`}>
				<Icon className={`${styles.icon} filter-white`} name="exclamation-thick" />
			</div>
			{message ? `${message}` : null}
		</div>
	);
}

Error.displayName = 'Error';
Error.propTypes = {
	className: PropTypes.string,
	error: PropTypes.object,
};

export default Error;

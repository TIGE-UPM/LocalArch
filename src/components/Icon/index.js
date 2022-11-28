import React from 'react';
import PropTypes from 'prop-types';

import styles from './Icon.module.scss';

function Icon({ className = '', name }) {
	return <img className={`${styles.image} ${className}`} src={`/icons/mdi/${name}.svg`} />;
}

Icon.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
};

export default Icon;

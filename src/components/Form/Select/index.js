import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';

import Icon from '@Components/Icon';
import Dropdown from '@Components/Dropdown';

import styles from './Select.module.scss';

const Select = React.forwardRef(({ className = '', multiple = false, value: extValue, placeholder = 'Selecciona una opción...', name, onChange, children }, ref) => {
	const [value, setValue] = useState(extValue);
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef(null);
	useClickAway(selectRef, () => {
		setIsOpen(false);
	});

	useEffect(() => {
		setValue(extValue);
	}, [extValue]);

	useImperativeHandle(ref, () => ({
		name,
		set value(_value) {
			setValue(_value);
		},
		focus: () => {
			console.log('focus');
		},
	}));

	const values = children.options.map((optionComp) => ({
		value: optionComp.props.value,
		label: optionComp.props.label,
	}));

	function onOptionSelected(_value) {
		let newValue = _value;
		if (multiple) {
			const valueCopy = value ? [...value] : [];
			if (valueCopy.includes(_value)) {
				newValue = valueCopy.filter((v) => v !== _value);
			} else {
				newValue = [...valueCopy, _value];
			}
		} else {
			setIsOpen(false);
		}
		setValue(newValue);
		onChange?.({ target: { name, value: newValue }, type: 'change' });
	}

	function valueIsSelected(_value) {
		if (multiple) {
			return !!value?.includes(_value);
		}
		return value === _value;
	}

	function getSelectedLabel() {
		if (!value) {
			return placeholder;
		}

		if (multiple) {
			if (!Array.isArray(value) || !value.length) {
				return placeholder;
			}

			return value.map((v) => values.find((val) => val.value === v)?.label).join(', ');
		}

		return values.find((val) => val.value === value)?.label;
	}

	return (
		<div className={`${styles['select-container']} ${isOpen ? styles.open : ''} ${className}`} ref={selectRef}>
			<div className={`${styles['label-container']} flex row justify-space-between align-items-center p-1 br-1 font-marengo bg-white`} onClick={() => setIsOpen(!isOpen)}>
				<span>{getSelectedLabel()}</span>
				<div className={`${styles['chevron-container']} flex center`}>
					<Icon name="chevron-down" />
				</div>
			</div>
			<Dropdown isOpen={isOpen}>
				<div className={`${styles['options-container']} shadow-1 bg-white`}>
					{children?.options.map((option) => (
						<option.type {...option.props} isSelected={valueIsSelected(option.props.value)} multiple={multiple} onClick={() => onOptionSelected(option.props.value)} key={option.props.value}/>
					))}
				</div>
			</Dropdown>
		</div>
	);
});

Select.displayName = 'Select';
Select.propTypes = {
	className: PropTypes.string,
	multiple: PropTypes.bool,
	value: PropTypes.any,
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	name: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	children: PropTypes.any,
};

export default Select;

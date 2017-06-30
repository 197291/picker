import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Clear from 'material-ui/svg-icons/content/clear';

import styles from './styles';
import './NumPicker.css';

class NumPicker extends PureComponent {
	state = {
	     customOption: '',
	     allowCustomInput: false,
  };
  
	onOptionClick = (option) => {
		this.props.onChange(option);
	}
	
	onCustomOptionClick = () => {
		if (Number.isInteger(this.state.customOption)) {
			return this.onOptionClick(this.state.customOption);
		}
		this.setState({ allowCustomInput: true });
	}

  onCustomOptionChange = (e, value) => {
    const customOption = Number(value);
    if (!isNaN(customOption)) {
      this.setState({ customOption });
    }
  }
	onCustomOptionClose = () => {
		this.setState({ allowCustomInput: false });
		if (Number.isInteger(this.state.customOption)) {
			this.onOptionClick(this.state.customOption);
		}
	}
	
	onResetNumPickerClick = () => {
		this.setState({ customOption: '', allowCustomInput: false });
		this.onOptionClick(null);
	}
  
  renderCustomOptionInput = () => {
    return (
      <div className="picker-wrapper">
        <div className="custom-input-wrapper">
          <TextField
            ref={(input) => { this.customInput = input; }}
            hintText="Enter your value"
            style={styles.customInput}
            onChange={this.onCustomOptionChange}
            value={this.state.customOption}
          />
          <IconButton
            className="custom-input-close-btn"
            tooltipPosition="top-right"
            tooltip="Save and close"
            onTouchTap={this.onCustomOptionClose}
          >
            <Clear color="#16b1b5" />
          </IconButton>
        </div>
      </div>
    );
  }

  renderOptions = () => {
    const customOption = this.state.customOption;
    const { options, value } = {...this.props};

    return (
      <div className="picker-wrapper">
        {options.map( (option, key) => (
          <FlatButton
            key={key}
            style={option === value ? styles.selectedOption : styles.option}
            onTouchTap={() => this.onOptionClick(option)}
          >
            {option}
          </FlatButton>
        ))}
        <FlatButton
          style={value === customOption ? styles.selectedOption : styles.option}
          onTouchTap={this.onCustomOptionClick}
        >
          {Number.isInteger(customOption) ? `${customOption}` : '...'}
        </FlatButton>
      </div>
    );
  }
	
	componentDidUpdate = () => {
		if (this.customInput) {
			this.customInput.focus();
		}
	}

  render() {
    const allowCustomOptionInput = this.state.allowCustomInput;
    return (
      <Paper style={styles.paper} zDepth={5}>
        <IconButton
          className="reset-btn"
          tooltip="Reset Values"
          tooltipPosition="top-right"
          onTouchTap={this.onResetNumPickerClick}
        >
        <Clear color="#16b1b5" />
        </IconButton>
        <h4 className="picker-header">How many players?</h4>
        {allowCustomOptionInput ? this.renderCustomOptionInput() : this.renderOptions()}
      </Paper>
    );
  }
}

NumPicker.propTypes = {
  value: PropTypes.number,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumPicker;

// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../SurveyField/SurveyField';
import validateEmails from '../../../utils/validateEmails';
import formFields from '../formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }, index) => {
      return <Field key={index} component={SurveyField} type="text" label={label} name={name} />
    });
  }

  // the prop handleSubmit is provided by the reduxForm helper function to our component, 
  // that gets called with the values in the form
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next!
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// Function called if passed to the validate key in reduxForm function, with the form values as argument
// it has to return an object
function validate(values) {
  // if the errors object is returned empty, redux form considers the form to be OK
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({name}) => {
    if(!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

// This function lets the component know that it will be handled with reduxForm, similar to the connect function
// that also adds props and some functionality to the component
export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
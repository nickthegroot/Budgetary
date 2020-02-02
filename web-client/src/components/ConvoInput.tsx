import React, { FC } from 'react'
import { Formik } from 'formik';

interface Props {
    type: 'string' | 'number';
    initialValue: string | number;
    onComplete: (value: string | number) => void;
}

const ConvoInput: FC<Props> = ({ type, initialValue,  onComplete }) => (
  <Formik
      initialValues={{ value: initialValue }}
      onSubmit={values => onComplete(values.value)}
    >
      {props => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <input
              id="value"
              type={type}
              min={0}
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
);

export default ConvoInput

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
          <form onSubmit={handleSubmit} style={{ float: 'right' }}>
            <input
              id="value"
              type={type}
              min={0}
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                  padding: 5,
                  margin: 5,
                  border: '2px solid #409af8',
                  borderRadius: 5,
              }}
            />

            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#409af8',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                }}
            >
              ↑
            </button>
          </form>
        );
      }}
    </Formik>
);

export default ConvoInput

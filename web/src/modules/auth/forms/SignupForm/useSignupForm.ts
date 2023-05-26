import { useCallback, useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';

import { strengthColor, strengthIndicator } from '../../utils';

type SignupFormFields = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  submit: null | Error;
};

const INITIAL_FORM_VALUES: SignupFormFields = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
});

export const useSignupForm = () => {
  const [passwordLevel, setPasswordLevel] = useState<{ label: string, color: string } | undefined>(undefined);
  const handleSubmit = useCallback(async (values: SignupFormFields, { setErrors, setStatus, setSubmitting }: FormikHelpers<SignupFormFields>) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
    } catch (err) {
      const _err = err as Error;
      setStatus({ success: false });
      setErrors({ submit: _err.message });
      setSubmitting(false);
    }
  }, []);

  const handleChangePassword = useCallback((value: any) => {
    const temp = strengthIndicator(value);
    setPasswordLevel(strengthColor(temp));
  }, [setPasswordLevel]);

  
  const form = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    form,
    handleChangePassword,
    passwordLevel,
  }
};
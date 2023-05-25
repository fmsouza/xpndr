import { FormikHelpers, useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

type LoginFormFields = {
  email: string;
  password: string;
  submit: null | Error;
  keepMeSignedIn: boolean;
};

const INITIAL_FORM_VALUES: LoginFormFields = {
  email: '',
  password: '',
  submit: null,
  keepMeSignedIn: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
});

export const useLoginForm = () => {
  const handleSubmit = useCallback(async (values: LoginFormFields, { setErrors, setStatus, setSubmitting }: FormikHelpers<LoginFormFields>) => {
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
  
  const form = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    form,
  }
};
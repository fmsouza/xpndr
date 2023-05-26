import { useCallback, useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { strengthColor, strengthIndicator } from '../../utils';
import { useSignup } from '../../hooks';

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
  const {signup} = useSignup();
  const navigate = useNavigate();
  const [passwordLevel, setPasswordLevel] = useState<{ label: string, color: string } | undefined>(undefined);
  const handleSubmit = useCallback(async (values: SignupFormFields, { setErrors, setStatus, setSubmitting }: FormikHelpers<SignupFormFields>) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      await signup({
        email: values.email,
        password: values.password,
        name: `${values.firstname} ${values.lastname}`,
      });
      navigate('/');
    } catch (err) {
      const _err = err as Error;
      setStatus({ success: false });
      setErrors({ submit: _err.message });
      setSubmitting(false);
    }
  }, [signup, navigate]);

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
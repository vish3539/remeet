import React from 'react'
import * as Yup from 'yup';
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { Formik, Form } from 'formik'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInUser } from './authAction'
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

function LoginForm() {
    const dispatch = useDispatch();
    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await signInWithEmail(values)
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({ auth: error.message })
                        setSubmitting(false);
                        // console.log(error)
                    }

                }}
            >
                {({ isSubmitting, isValid, dirty, errors }) => (
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} />}
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                        <Divider horizontal> Or </Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}

export default LoginForm

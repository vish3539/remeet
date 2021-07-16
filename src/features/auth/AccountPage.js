import React from 'react'
import { Segment, Header, Button, Label } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../app/firestore/firebaseService';

function AccountPage() {
    const { currentUser } = useSelector(state => state.auth);
    return (
        <Segment>
            <Header dividing size='large' content='Account' />
            {currentUser.providerId === 'password' &&
                <div>
                    <Header color='teal' sub content='Change Password' />
                    <p>Use this form to change password</p>
                    <Formik
                        initialValues={{ newPassword1: '', newPassword2: '' }}
                        validationSchema={
                            Yup.object({
                                newPassword1: Yup.string().required('Password is required'),
                                newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], "Passwords do not Match")
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            console.log(values);
                            try {
                                await updateUserPassword(values);
                            } catch (error) {
                                setErrors({ auth: error.message });
                            } finally {
                                setSubmitting(false);
                            }
                        }}>
                        {({ errors, isSubmitting, isValid, dirty }) => (
                            <Form className='ui form'>
                                <MyTextInput name='newPassword1'
                                    type='password'
                                    placeholder='password' />
                                <MyTextInput name='newPassword2'
                                    type='password'
                                    placeholder='Confirm password' />
                                {errors.auth && <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} />}

                                <Button type='submit'
                                    style={{ display: 'block' }}
                                    loading={isSubmitting} disabled={!isValid || isSubmitting || !dirty}
                                    size='large'
                                    content='update password' />
                            </Form>
                        )}
                    </Formik>
                </div>}
            {currentUser.providerId === 'facebook.com' &&
                <div>
                    <Header color='teal' sub content='Facebook Account' />
                    <p>Please vist facebook to update your account</p>
                    <Button icon='facebook' color='facebook' as={Link} to='https://www.facebook.com/' content='Go to FB' />
                </div>}
            {currentUser.providerId === 'google.com' &&
                <div>
                    <Header color='teal' sub content='Google Account' />
                    <p>Please vist Google to update your account</p>
                    <Button icon='google' color='google plus' as={Link} to='https://www.google.com/' content='Go to Google' />
                </div>}
        </Segment>
    )
}

export default AccountPage

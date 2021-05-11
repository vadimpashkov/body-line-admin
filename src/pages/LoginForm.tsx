/* eslint-disable */

import * as React from 'react';
import { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslate, useLogin, useNotify, useSafeSetState, LoginComponent } from 'ra-core';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../config';

interface FormData {
    username: string;
    password: string;
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginForm' }
);

const Input = ({
    meta: { touched, error },
    input: inputProps,
    ...props
}: {meta: any, input: any}) => (
        <TextField
            error={!!(touched && error)}
            helperText={touched && error}
            {...inputProps}
            {...props}
            fullWidth
        />
    );

const recaptchaRef: any = React.createRef();

const Captcha = (onSubmit: any) => (props: any) => (
    <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={config.captchaKey}
        onChange={(val: any) => {
            props.input.onChange(val);
            onSubmit();
        }}
    />
);

const LoginForm: LoginComponent = props => {
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const validate = (values: FormData) => {
        const errors: { username?: string, password?: string } = { username: undefined, password: undefined };

        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    const submit = (values: any) => {
        setLoading(true);
        login(values)
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                            ? 'ra.auth.sign_in_error'
                            : error.message,
                    'warning'
                );
            });
    };

    return (
        <div>
            <Form
                onSubmit={submit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={(e: any) => {
                        e.preventDefault();
                        recaptchaRef.current.execute();
                    }} noValidate>
                        <div className={classes.form}>
                            <div className={classes.input}>
                                <Field
                                    autoFocus
                                    id="username"
                                    name="username"
                                    component={Input}
                                    label={translate('ra.auth.username')}
                                    disabled={loading}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    id="password"
                                    name="password"
                                    component={Input}
                                    label={translate('ra.auth.password')}
                                    type="password"
                                    disabled={loading}
                                    autoComplete="current-password"
                                />
                            </div>
                            <Field name='captchaResult' component={Captcha(() => {
                                handleSubmit();
                                recaptchaRef.current.reset();
                            })}/>
                        </div>
                        <CardActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={loading}
                                className={classes.button}
                            >
                                {loading && (
                                    <CircularProgress
                                        className={classes.icon}
                                        size={18}
                                        thickness={2}
                                    />
                                )}
                                {translate('ra.auth.sign_in')}
                            </Button>
                        </CardActions>
                    </form>
                )}
            />
        </div>
    );
};

export default LoginForm;

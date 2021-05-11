/* eslint-disable */

import * as React from "react";
import { useState } from "react";
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button } from '@material-ui/core';
import { DefaultBackground } from "./ResetPassword";
import ReCAPTCHA from "react-google-recaptcha";
import config from '../config';

const recaptchaRef: any = React.createRef();

const ForgotPassword = (props: any) => {
    const [email, setEmail] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');

    const emailChanged = (value: any) => {
        setEmail(value);
        setError('');
    }

    const canSubmit = () => email != '';
    const submit = async () => {
        const captchaResult = await recaptchaRef.current.executeAsync();        
        const result = { succeeded: true, errorMessage: '' }; // todo: await api.forgotPassword(email, captchaResult);

        if (result.succeeded) 
            setCompleted(true);
        else if (result.errorMessage)
            setError(result.errorMessage);
        else
            setError('Неизвестная ошибка');
    }

    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '70vh' }}
    >
        <Grid item xs={3}>
            <Card>
                <CardHeader title="Восстановление пароля" />
                <CardContent>
                    {completed ? <div>Ссылка для сброса пароля отправлена на email.</div> :
                        <TextField fullWidth onChange={(e) => emailChanged(e.target.value)} value={email}
                            error={error != ''} helperText={error != '' ? error : null}
                            label="Email" type="email" />}
                </CardContent>
                <CardActions>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={config.captchaKey}
                    />
                    {!completed ? <Button disabled={!canSubmit()} onClick={submit} fullWidth variant="contained" color="primary">Сбросить пароль</Button> : null}
                </CardActions>
            </Card>
        </Grid>
    </Grid>
}

export default (props: any) => (
    <DefaultBackground>
        <ForgotPassword {...props} />
    </DefaultBackground>
);


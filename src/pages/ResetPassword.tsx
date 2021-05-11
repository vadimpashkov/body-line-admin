/* eslint-disable */

import * as React from "react";
import { useState } from "react";
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import qs from "qs";

const ResetPassword = (props: any) => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordConfirmationVisited, setPasswordConfirmationVisited] = useState(false);
    const [isPasswordsNotMatch, setIsPasswordsNotMatch] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [completed, setCompleted] = useState(false);
    const [isUrlInvalid, setIsUrlInvalid] = useState(false);
    const [isUrlChecked, setIsUrlChecked] = useState(false);

    const { userId: id, token } = qs.parse(props?.location?.search, { ignoreQueryPrefix: true });

    if (id == null || id == '' || token == null || token == '')
        return <div>Неверная ссылка</div>;

    const userId: number = Number(id);

    const checkToken = async () => {
        setIsUrlChecked(true);

        try {
            const valid = true; // todo: await api.checkResetPasswordToken(token, userId);
            setIsUrlInvalid(!valid);
        } catch (e) {
            setIsUrlInvalid(true);
        }
    }

    if (!isUrlChecked)
        checkToken();

    if (isUrlInvalid)
        return <div>Неверная ссылка</div>;

    const onPasswordChange = (value: any) => {
        setPassword(value);
        setIsError(false);
        setError("");

        if (passwordConfirmationVisited)
            setIsPasswordsNotMatch(value !== passwordConfirmation);
    }

    const onPasswordConfirmationChange = (value: any) => {
        setPasswordConfirmation(value);
        setIsError(false);
        setError("");

        if (passwordConfirmationVisited)
            setIsPasswordsNotMatch(value !== password);
    }

    const onConfirmationBlur = () => {
        setPasswordConfirmationVisited(true);
        setIsPasswordsNotMatch(password !== passwordConfirmation);
    }

    const canSubmit = () => password != '' && passwordConfirmation != '' && password === passwordConfirmation;
    const submit = async () => {
        const result = { succeeded: true, errorMessage: '' }; // todo: await api.resetPassword(token, userId, password);
        if (result.succeeded)
            setCompleted(true);
        else {
            setIsError(true);
            if (result.errorMessage)
                setError(result.errorMessage);
        }
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
                    {completed ? <div>Пароль успешно изменён <a href="/#/login">Войти</a></div> :
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField fullWidth onChange={(e) => onPasswordChange(e.target.value)} value={password}
                                    label="Новый пароль" type="password" />
                            </Grid>
                            <Grid item>
                                <TextField fullWidth onChange={(e) => onPasswordConfirmationChange(e.target.value)}
                                    onBlur={onConfirmationBlur} value={passwordConfirmation}
                                    label="Повторите пароль" type="password" error={isPasswordsNotMatch || isError}
                                    helperText={isPasswordsNotMatch ? "Пароли не совпадают" : (isError ? error : null)} />
                            </Grid>
                        </Grid>}
                </CardContent>
                <CardActions>
                    {!completed && <Button disabled={!canSubmit()} onClick={submit} fullWidth variant="contained" color="primary">Сменить пароль</Button>}
                </CardActions>
            </Card>
        </Grid>
    </Grid>
}

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
            'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)'
    }
});

export const DefaultBackground = (props: any) => {
    const classes = useStyles();
    const { children } = props;

    return <div className={classes.main}>{children}</div>
};

export default (props: any) => (
    <DefaultBackground>
        <ResetPassword {...props} />
    </DefaultBackground>
);

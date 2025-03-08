import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { IoTime } from "react-icons/io5";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const SecondsCounter = () => {

    const [counter, setCounter] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [isCountingDown, setIsCountingDown] = useState(false)
    const [status, setStatus] = useState(false)
    const [inputAlert, setInputAlert] = useState("")
    const [isAlert, setIsAlert] = useState(false)

    // contador incial

    useEffect(() => {
        if (!isCountingDown && !status) {
            const secondsIncrement = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1)
            }, 1000);
            return () => {
                clearInterval(secondsIncrement); // Limpiar el intervalo cuando el componente se desmonte.
                // Sino cada vez que haga algo con los otros elementos se ejcutará
            };
        }
    }, [isCountingDown, counter, status])

    // formato del contador incial 

    const secondsPath = counter.toString().padStart(6, "0")
    const secondsDigit = secondsPath.split('').map((digit, i) => (
        <span key={i}>{digit}</span>
    ));

    // Función de decremento

    const startCountingDown = () => {
        setCounter(Number(inputValue));
        setIsCountingDown(true);
    }

    useEffect(() => {
        if (isCountingDown && counter > 0 && !status) {
            const secondsDecrement = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1)
            }, 1000);
            return () => {
                clearInterval(secondsDecrement); // Limpiar el intervalo cuando el componente se desmonte.
                // Sino cada vez que haga algo con los otros elementos se ejcutará
            };
        }
    }, [isCountingDown, counter, status])

    // Valor del contador por el cual va iniciar la cuenta regresiva

    const countDownValue = (e) => {
        setInputValue(e.target.value)
    }

    // Start, stop, reset

    const stop = () => {
        setStatus(true)
    }

    const start = () => {
        setStatus(false)
    }

    const reset = () => {
        setCounter(0)
        setIsCountingDown(false)
    }

    // Indico que cuando el usuario indique un valo en el input este active el state de alerta y a su vez genere el valor para comparar
    // posteriormente con el counter 

    const inputAlertValue = (e) => {
        const value = e.target.value;
        setInputAlert(Number(value));

        if (value !== "") {
            setIsAlert(true);
        } else {
            setIsAlert(false);
        }
    }

    // Aquí se hace la comparativa para que salga la alerta 

    useEffect(() => {
        if (isAlert && counter === inputAlert) {
            alert("You reach the number");
        }
    }, [counter, isAlert, inputAlert]);


    // En resumen. Creamos un state que defina valor y otro que defina booleanos para detener o activar a antojo las funciones
    // dentro del useEffect, tratamos de limpiar cada useEffect para que no interfiera con otras funciones y no almacene memoria
    // y cada useEffect tendra indicado los valores del useState que debe tomar en considerar en cada renderizado para su funcionamiento

    return (
        <Box>
            <Grid container spacing={2} style={{ backgroundColor: "#e3f2fd", width: "100%" }}>
                <Grid container
                    size={{ xs: 4, md: 8 }}
                    direction="column"
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1 style={{ color: "white", backgroundColor: "#1976d2", width: "100%", textAlign: "center", border: "0 2rem", fontSize: "6rem" }}>Counter</h1>
                    </Grid>
                </Grid>
                <Grid container
                    size={{ xs: 4, md: 8 }}
                    direction="column"
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Item style={{ backgroundColor: "#2196f3", color: "white", fontSize: "4rem" }}><IoTime style={{ paddingBottom: "10px" }} />
                            {secondsDigit}</Item>
                    </Grid>
                </Grid>
                <Grid container
                    size={{ xs: 4, md: 8 }}
                    direction="column"
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            value={inputValue} onChange={countDownValue} placeholder="Countdown number"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <Button variant="contained" color="warning" onClick={startCountingDown}>Initialize countdown</Button>
                    </Grid>
                </Grid>
                <Grid container
                    size={{ xs: 4, md: 8 }}
                    direction="column"
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="contained" color="error" onClick={stop}>Stop</Button>
                        <Button variant="contained" onClick={start}>Start</Button>
                        <Button variant="contained" color="success" onClick={reset}>Reset</Button>
                    </Grid>
                </Grid>
                <Grid container
                    size={{ xs: 4, md: 8 }}
                    direction="column"
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            value={inputAlert} onChange={inputAlertValue} placeholder="Reach value"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}
export default SecondsCounter;


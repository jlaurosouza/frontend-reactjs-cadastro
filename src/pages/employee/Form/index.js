import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Title from '../../../components/Title';

import api from '../../../services/api';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),        
        overflow: 'auto',
        flexDirection: 'column',
    },
    divButtonSave: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function FormEmployee() {
    const styles = useStyles();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [salary, setSalary] = useState('');
    const [office, setOffice] = useState('');

    const { id } = useParams(); 

    useEffect(() => {
        async function getEmployee(){
            if(id){
                await api.get(`/employees/${id}`).then(response => {
                   setName(response.data.data.name);
                   setSurname(response.data.data.surname);                
                   setDateOfBirth(moment(response.data.data.date_of_birth).add(1, "days").format("YYYY-MM-DD"));            
                   setSalary(response.data.data.salary);
                   setOffice(response.data.data.offices[0].description);                                        
                });
            }
        }

        getEmployee();
    }, [dateOfBirth]);    

    async function handleSubmit(){
        const data = {
            name: name,
            surname: surname,
            date_of_birth: dateOfBirth,
            salary: `${salary}`,
            office: office
        }           

        if(name !== '' && surname !== '' && dateOfBirth !== '' && salary !== '' && office !== ''){
            if(id){
                const response = await api.put(`/employees/${id}`, data);    
                if(response.status == 200){
                    window.location.href = '/';
                    alert("Funcionário atualizado com sucesso!");
                }else{
                    alert("Não foi possível atualizar o funcionário observe as informações enviadas e tente novamente.")
                }
            }else{
                await api.post('/employees', data).then(response => {            
                    window.location.href = '/';
                }).catch(e => {                    
                    alert("Não foi possível cadastrar o funcionário observe as informações enviadas e tente novamente.")
                });
            }
        }else{
            alert('Todos os Campos são obrigatórios, por favor preencha');
        }
    }

    return (
        <>
            <Container maxWidth="lg" className={styles.container}>
                <Paper className={styles.paper}>
                    <Title title={id ? "Atualizar dados do funcionário" : "Cadastrar novo funcionário"} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Nome"
                                fullWidth
                                autoComplete="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="surname"
                                name="surname"
                                label="Sobrenome"
                                fullWidth
                                autoComplete="surname"
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                type='date'
                                id="date_of_birth"
                                name="date_of_birth"
                                label="Data de nascimento"
                                fullWidth
                                autoComplete="date_of_birth"
                                value={dateOfBirth}
                                onChange={e => setDateOfBirth(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                type='number'
                                id="salary"
                                name="salary"
                                label="Salário"
                                fullWidth
                                autoComplete="salary"
                                value={salary}
                                onChange={e => setSalary(e.target.value)}                               
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="office"
                                name="office"
                                label="Cargo"
                                fullWidth
                                autoComplete="office"
                                value={office}
                                onChange={e => setOffice(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <div className={styles.divButtonSave}>
                        <Button
                            variant="contained"                            
                            component='a'
                            href='/'
                            className={styles.button}
                            >
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            className={styles.button}
                            >
                            Salvar
                        </Button>
                    </div>
                </Paper>                
            </Container>            
        </>
    );
}

export default FormEmployee;
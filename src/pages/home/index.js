import React, { useState, useEffect, useCallback } from 'react';
import 'moment-timezone';

import api from '../../services/api';

import Title from '../../components/Title';

import moment from 'moment';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    divButtonAdd: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15
    }
}));

function ListEmployees() {
    const styles = useStyles();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get('/employees').then(response => {
            setEmployees(response.data.data);
        })
    }, []);

    async function handleDeleteEmployees(id){
        if(window.confirm("Deseja realmente excluir este funcionário")){
            await api.delete(`employees/${id}`).then(response => {
                api.get('/employees').then(response => {
                    setEmployees(response.data.data);
                })
                alert('Funcionário excluído com sucesso!');
            });
        }        		
    };

    return (
        <>
            <Container maxWidth="lg" className={styles.container}>
                <Paper className={styles.paper}>
                    <div className={styles.divButtonAdd}>
                    <Title title="Lista de Funcionário" />
                        <Button variant="contained" color="primary" component="a" href="/employees">
                            Adicionar Novo Funcionário
                        </Button>
                    </div>                     
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Subrenome</TableCell>
                                <TableCell>Date de Aniversário</TableCell>
                                <TableCell align="right">Salário</TableCell>
                                <TableCell>Cargo</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.surname}</TableCell>
                                    <TableCell>{moment(employee.date_of_birth).add(1, "days").format("DD/MM/YYYY")}</TableCell>
                                    <TableCell align="right">{employee.salary.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                    <TableCell>{employee.offices[0].description}</TableCell>
                                    <TableCell>
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button component="a" href={`/employees/${employee.id}`}>
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            <Button aria-label="delete" onClick={() => handleDeleteEmployees(employee.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>          
        </>
    );
}

export default ListEmployees;
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row,Col,Navbar, NavbarBrand, FormGroup, Input, Table, Button} from 'reactstrap'

const App = props => {
  const [nome,setNome] = React.useState("");
  const [idade, setIdade] = React.useState(0);
  const [email, setEmail] = React.useState("");
const[alunos, setAlunos] = React.useState([]);
  const submit = async e => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type","application/json");

    const response = await fetch("http://localhost:3001/alunos",{
      method: "POST",
      body: JSON.stringify({nome,idade,email}),
      headers

    })

    if(response.ok){
      alert("Enviado com sucesso!")
      return;
    }

    alert("Erro ao enviar: "+response.status)
  }

  const buscarAlunos = async () =>{
    const response = await fetch ("http://localhost:3001/alunos");

    if (!response.ok){
      alert("Deu erro!"+response.status)
    }

    const alunos = await response.json();

    setAlunos (alunos);
  }
  return(
    <React.Fragment>
    <Navbar color = "primary" dark>
      <NavbarBrand>
        OFICINA IFRO ADS
        </NavbarBrand>
    </Navbar>

    <Container>
      <Row>
        <form onSubmit = {submit}>
          <Col>
        <FormGroup>
          <label>Nome</label>
          <Input name = "nome" value={nome} onChange = {e => setNome(e.target.value)}/>
          <label>Idade</label>
          <Input name = "idade"  value={idade}  type="number" onChange = {e => setIdade(e.target.value)}/>
          <label>E-mail</label>
          <Input name = "email"  value={email} onChange = {e => setEmail(e.target.value)}/>
          <Input type = "submit" value = "Enviar"/>
        </FormGroup>
        </Col></form>
        <Row>
          <Col>
          <Button className = "my-2" type = "button" onClick = {e => buscarAlunos()}>Buscar</Button>
          </Col>
        <Col>
<Table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Idade</th>
      <th>E-mail</th>
    </tr>
  </thead>
  <tbody>
    {alunos.map(aluno => 
      <tr>
        <td>{aluno.nome}</td>
        <td>{aluno.idade}</td>
        <td>{aluno.email}</td>
      </tr>
      )}
  </tbody>
</Table>
</Col>
        </Row>
       
      </Row>
      </Container>>
  </React.Fragment>
  )
}
export default App;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, pelicula: "Naruto", genero: "Accion", calificacion: "13", duracion: "1:30:00" , fechaEstreno: "18-09-07"},
  { id: 2, pelicula: "Dragon Ball", genero: "Accion", calificacion: "13", duracion: "2:35:00", fechaEstreno: "23-04-11" },
  { id: 3, pelicula: "Kenshin", genero: "Drama", calificacion: "16", duracion: "2:18:00", fechaEstreno: "01-12-18"},
  { id: 4, pelicula: "Monkey", genero: "Comedia", calificacion: "A", duracion: "1:30:50", fechaEstreno: "29-11-20" },
  { id: 5, pelicula: "Anabelle", genero: "Terror", calificacion: "16", duracion: "1:55:50", fechaEstreno: "25-03-14"},
  { id: 6, pelicula: "Yu-Gi-Oh!", genero: "Suspenso", calificacion: "A", duracion: "2:50:00", fechaEstreno: "12-07-17" },
];

class crearPelicula extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      pelicula: "",
      genero: "",
      calificacion: "",
      duracion: "",
      fechaEstreno: "18-09-07",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].pelicula = dato.pelicula;
        arreglo[contador].genero = dato.genero;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />

          <Button href="/"> INICIO </Button>

          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pelicula</th>
                <th>Genero</th>
                <th>Calificacion</th>
                <th>Duracion</th>
                <th>Fecha de Estreno</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.pelicula}</td>
                  <td>{dato.genero}</td>
                  <td>{dato.calificacion}</td>
                  <td>{dato.duracion}</td>
                  <td>{dato.fechaEstreno}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Pelicula: 
              </label>
              <input
                className="form-control"
                name="pelicula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.pelicula}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Genero: 
              </label>
              <input
                className="form-control"
                name="genero"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.genero}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Calificacion: 
              </label>
              <input
                className="form-control"
                name="calificacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.calificacion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Duracion: 
              </label>
              <input
                className="form-control"
                name="duracion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.duracion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha de Estreno: 
              </label>
              <input
                className="form-control"
                name="fechaEstreno"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fechaEstreno}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Crear Pelicula</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Pelicula: 
              </label>
              <input
                className="form-control"
                name="pelicula"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Genero: 
              </label>
              <input
                className="form-control"
                name="genero"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Calificacion: 
              </label>
              <input
                className="form-control"
                name="calificacion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Duracion: 
              </label>
              <input
                className="form-control"
                name="duracion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha De Estreno: 
              </label>
              <input
                className="form-control"
                name="fechaEstreno"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Guardar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default crearPelicula;
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
  { id: 1, sala: "principal-A", cantidadPersonas: "Naruto", nombreDePelicula: "Naruto"},
  { id: 2, sala: "principal-B", cantidadPersonas: "Dragon Ball", nombreDePelicula: "Dragon Ball"},
  { id: 3, sala: "principal-C", cantidadPersonas: "Rurouni Kenshin", nombreDePelicula: "Rurouni Kenshin"},
  { id: 4, sala: "principal-D", cantidadPersonas: "One Piece", nombreDePelicula: "One Piece"},
  { id: 5, sala: "principal-E", cantidadPersonas: "Fullmetal Alchemist: Brotherhood", nombreDePelicula: "Fullmetal Alchemist: Brotherhood"},
  { id: 6, sala: "principal-F", cantidadPersonas: "Yu-Gi-Oh!", nombreDePelicula: "Yu-Gi-Oh!"},
];

class crearSala extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      sala: "",
      cantidadPersonas: "",
      nombreDePelicula: "",
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
        arreglo[contador].sala = dato.sala;
        arreglo[contador].cantidadPersonas = dato.cantidadPersonas;
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

          <Button href="/pelicula"> Crear Pelicula </Button>

          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sala</th>
                <th>Cantidad de personas</th>
                <th>Nombre de Pelicula</th>
                <th>Accion</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.sala}</td>
                  <td>{dato.cantidadPersonas}</td>
                  <td>{dato.nombreDePelicula}</td>
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
                Sala: 
              </label>
              <input
                className="form-control"
                name="sala"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sala}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Cantida de Personas: 
              </label>
              <input
                className="form-control"
                name="cantidadPersonas"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cantidadPersonas}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Nombre de Pelicula: 
              </label>
              <input
                className="form-control"
                name="nombreDePelicula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombreDePelicula}
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
           <div><h3>Crear Sala</h3></div>
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
                Sala: 
              </label>
              <input
                className="form-control"
                name="sala"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Cantidad de Personas: 
              </label>
              <input
                className="form-control"
                name="cantidadPersonas"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre de Pelicula: 
              </label>
              <input
                className="form-control"
                name="nombreDePelicula"
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
export default crearSala;
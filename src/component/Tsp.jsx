import React, { Component } from "react";
import { Button } from "react-bootstrap";
class NewComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div {...this.props}>
        <div>Eje x</div>
     

        <ul className="row">
          {this.props.data.map(x => (
            <div>{Math.round(x)},</div>
          ))}
        </ul>

        <div>Eje y</div>
        <ul className="row">
          {this.props.datay.map(x => (
            <div>{Math.round(x)},</div>
          ))}
        </ul>
      </div>
    );
  }
}

class RutaComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div {...this.props}>
        <h3>La mejor ruta es...</h3>
        <div>Eje x</div>
     

        <ul className="row">
          {this.props.data.map(x => (
            <div>{Math.round(x)},</div>
          ))}
        </ul>

        <div>Eje y</div>
        <ul className="row">
          {this.props.datay.map(x => (
            <div>{Math.round(x)},</div>
          ))}
        </ul>
        <div>Distancia entre los nodos </div>
        <ul className="row">
          {this.props.distancia.map(x => (
            <div>{Math.round(x)},</div>
          ))}
        </ul>
      </div>
    );
  }
}

export default class Tsp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      ruta: false
    };
    this.print = this.print.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.limpiar = this.limpiar.bind(this);
    this.graficar = this.graficar.bind(this);
    this.X = [9]; // componente x
    this.Y = [9]; // componente y
    this.Px = [9]; // ultimo x
    this.Py = [9]; // ultimo y
    this.D = [9]; // coste
  }

  print() {
    if (this.X != null) {
      this.limpiar();
    }

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    for (var i = 0; i < 100; i++) {
      var x = Math.random() * (400 - 10) + 10;
      var y = Math.random() * (400 - 10) + 10;
      this.X[i] = x;
      this.Y[i] = y;
      ctx.fillRect(x, y, 3, 3);
    }
    this.setState({
      clicked: true
    });
    this.Px[0] = this.X[0];
    this.Py[0] = this.Y[0];

    //ctx.fillRect(1,1,6,6)
    //ctx.fillRect(600,400,6,6)
  }

  mostrar() {
    var dx,
      dy,
      d,
      del,
      menor = 400;
    for (var n = 1; n < 100; n++) {
      console.log("El menor es " + menor);
      menor = 400;
      for (var i = 1; i < 100; i++) {
        dx = this.X[i] - this.X[0];
        dy = this.Y[i] - this.Y[0];
        d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (d < menor) {
          menor = d;
          this.Px[n] = this.X[i];
          this.Py[n] = this.Y[i];
          del = i;
        }
      }

      console.log("Este es el nodo numero" + n + " " + this.Px[n]);
      console.log("Este es la posicion" + del);
      console.log(this.X);
      this.D[n - 1] = menor;
      this.X.splice(0, 1);
      this.Y.splice(0, 1);
      this.X.splice(del - 1, 1, this.X[0]);
      this.Y.splice(del - 1, 1, this.Y[0]);
      console.log(this.X);
      this.X.splice(0, 1, this.Px[n]);
      this.Y.splice(0, 1, this.Py[n]);
      console.log(this.X);
    }
    console.log(this.Px);
    console.log(this.Py);

    this.setState({
      ruta: true,
      clicked: false
    });
  }

  limpiar() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    this.setState({
      clicked: false,
      ruta: false
    });
  }

  graficar() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    for (var n = 1; n < 100; n++) {
      ctx.beginPath();
      ctx.moveTo(this.Px[n - 1], this.Py[n - 1]);
      ctx.lineTo(this.Px[n], this.Py[n]);
      ctx.strokeStyle = "#FF0000";
      ctx.stroke();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="m-5">
          <h1>Problema del Agente Viajero</h1>
          <h2>Caminos de coste mínimo: algoritmo de Dijkstra</h2>

          <Button onClick={this.print} variant="outline-secondary">
            Agregar 100 puntos aleatorios{" "}
          </Button>
          <Button onClick={this.mostrar} variant="outline-secondary">
            Hallar la mejor Ruta
          </Button>
          <Button onClick={this.graficar} variant="outline-secondary">
            Graficar
          </Button>
          <Button onClick={this.limpiar} variant="outline-secondary">
            Borrar
          </Button>

          {this.state.clicked ? <NewComponent data={this.X} datay={this.Y} /> : null}
          <br />
          {this.state.ruta ? <RutaComponent data={this.Px} datay={this.Py} distancia={this.D}/> : null}

          <div className="bordercanvas mt-3">
            <canvas
              className="m-5"
              ref="canvas"
              id="canvas"
              width={640}
              height={425}
            />
          </div>
        </div>
      </div>
    );
  }
}

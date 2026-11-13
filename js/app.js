(function () {
  'use strict';

  var CLAVE = 'incidencias';
  var incidencias = cargar();

  var form = document.getElementById('form-incidencia');
  var lista = document.getElementById('lista');
  var vacio = document.getElementById('vacio');
  var mensaje = document.getElementById('mensaje');

  function cargar() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch (e) {
      return [];
    }
  }

  function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(incidencias));
  }

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo || '';
  }

  function pintarIncidencia(inc) {
    var li = document.createElement('li');
    li.className = 'incidencia';
    li.setAttribute('data-estado', inc.estado);

    var h3 = document.createElement('h3');
    h3.textContent = inc.titulo;

    var estado = document.createElement('span');
    estado.className = 'estado';
    estado.textContent = inc.estado;

    var desc = document.createElement('p');
    desc.textContent = inc.descripcion;

    var meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = 'Reportado por ' + inc.reportadoPor + ' · ' +
      new Date(inc.fecha).toLocaleString('es-EC');

    li.appendChild(h3);
    li.appendChild(estado);
    li.appendChild(desc);
    li.appendChild(meta);
    return li;
  }

  function renderizar() {
    lista.innerHTML = '';
    incidencias.forEach(function (inc) {
      lista.appendChild(pintarIncidencia(inc));
    });
    vacio.hidden = incidencias.length > 0;
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    var inc = window.Incidencias.crearIncidencia({
      titulo: document.getElementById('titulo').value,
      descripcion: document.getElementById('descripcion').value,
      reportadoPor: document.getElementById('reportado-por').value
    });
    incidencias.unshift(inc);
    guardar();
    renderizar();
    form.reset();
    mostrarMensaje('Incidencia registrada correctamente.', 'ok');
  });

  renderizar();
}());

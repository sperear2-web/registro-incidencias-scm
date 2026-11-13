(function () {
  'use strict';

  var CLAVE = 'incidencias';
  var Inc = window.Incidencias;
  var incidencias = cargar();

  var form = document.getElementById('form-incidencia');
  var lista = document.getElementById('lista');
  var vacio = document.getElementById('vacio');
  var mensaje = document.getElementById('mensaje');
  var filtro = document.getElementById('filtro-estado');
  var contador = document.getElementById('contador');

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

    var selector = document.createElement('select');
    selector.className = 'cambiar-estado';
    selector.setAttribute('aria-label', 'Cambiar estado de ' + inc.titulo);
    Inc.ESTADOS.forEach(function (e) {
      var opcion = document.createElement('option');
      opcion.value = e;
      opcion.textContent = e;
      opcion.selected = e === inc.estado;
      selector.appendChild(opcion);
    });
    selector.addEventListener('change', function () {
      incidencias = Inc.cambiarEstado(incidencias, inc.id, selector.value);
      guardar();
      renderizar();
    });

    li.appendChild(h3);
    li.appendChild(estado);
    li.appendChild(desc);
    li.appendChild(meta);
    li.appendChild(selector);
    return li;
  }

  function renderizar() {
    var visibles = Inc.filtrarPorEstado(incidencias, filtro.value);
    lista.innerHTML = '';
    visibles.forEach(function (inc) {
      lista.appendChild(pintarIncidencia(inc));
    });
    vacio.hidden = visibles.length > 0;
    vacio.textContent = incidencias.length === 0
      ? 'Aún no hay incidencias registradas.'
      : 'No hay incidencias con el estado seleccionado.';
    contador.textContent = visibles.length + ' de ' + incidencias.length + ' incidencias';
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    var inc = Inc.crearIncidencia({
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

  filtro.addEventListener('change', renderizar);

  renderizar();
}());

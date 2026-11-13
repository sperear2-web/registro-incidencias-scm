/**
 * Lógica de negocio del sistema de registro de incidencias.
 * Se escribe como módulo UMD para poder usarse en el navegador
 * (window.Incidencias) y en Node.js (pruebas automáticas).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Incidencias = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var ESTADOS = ['Abierta', 'En proceso', 'Resuelta'];
  var ESTADO_INICIAL = ESTADOS[0];

  function crearIncidencia(datos, ahora) {
    var fecha = ahora instanceof Date ? ahora : new Date();
    return {
      id: fecha.getTime() + '-' + Math.floor(Math.random() * 1000),
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      reportadoPor: datos.reportadoPor,
      estado: ESTADO_INICIAL,
      fecha: fecha.toISOString()
    };
  }

  /** Devuelve las incidencias del estado indicado ('Todas' = sin filtro). */
  function filtrarPorEstado(lista, estado) {
    if (!estado || estado === 'Todas') {
      return lista.slice();
    }
    return lista.filter(function (inc) {
      return inc.estado === estado;
    });
  }

  /** Devuelve una nueva lista con el estado de la incidencia `id` actualizado. */
  function cambiarEstado(lista, id, nuevoEstado) {
    if (ESTADOS.indexOf(nuevoEstado) === -1) {
      throw new Error('Estado no válido: ' + nuevoEstado);
    }
    return lista.map(function (inc) {
      if (inc.id !== id) {
        return inc;
      }
      return Object.assign({}, inc, { estado: nuevoEstado });
    });
  }

  return {
    ESTADOS: ESTADOS,
    ESTADO_INICIAL: ESTADO_INICIAL,
    crearIncidencia: crearIncidencia,
    filtrarPorEstado: filtrarPorEstado,
    cambiarEstado: cambiarEstado
  };
}));

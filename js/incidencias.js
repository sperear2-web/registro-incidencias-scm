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

  var ESTADO_INICIAL = 'Abierta';

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

  return {
    ESTADO_INICIAL: ESTADO_INICIAL,
    crearIncidencia: crearIncidencia
  };
}));

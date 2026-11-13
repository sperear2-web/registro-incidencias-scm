'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Incidencias = require('../js/incidencias.js');

test('crearIncidencia asigna estado inicial "Abierta"', () => {
  const inc = Incidencias.crearIncidencia({
    titulo: 'No carga el login',
    descripcion: 'La página queda en blanco',
    reportadoPor: 'Ana'
  });
  assert.strictEqual(inc.estado, 'Abierta');
  assert.strictEqual(inc.titulo, 'No carga el login');
  assert.ok(inc.id);
  assert.ok(inc.fecha);
});

test('index.html contiene los elementos que usa la aplicación', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  ['form-incidencia', 'titulo', 'descripcion', 'reportado-por', 'lista'].forEach((id) => {
    assert.ok(html.includes('id="' + id + '"'), 'Falta el elemento #' + id);
  });
});

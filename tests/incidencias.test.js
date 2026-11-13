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

const muestra = () => [
  { id: '1', titulo: 'A', estado: 'Abierta' },
  { id: '2', titulo: 'B', estado: 'En proceso' },
  { id: '3', titulo: 'C', estado: 'Resuelta' },
  { id: '4', titulo: 'D', estado: 'Abierta' }
];

test('filtrarPorEstado devuelve solo las incidencias del estado pedido', () => {
  const abiertas = Incidencias.filtrarPorEstado(muestra(), 'Abierta');

test('validarIncidencia rechaza campos vacíos o con solo espacios (fix v1.1.1)', () => {
  const r = Incidencias.validarIncidencia({ titulo: '   ', descripcion: 'ok', reportadoPor: '' });
  assert.strictEqual(r.valido, false);
  assert.strictEqual(r.errores.length, 2);
});

test('validarIncidencia acepta datos completos', () => {
  const r = Incidencias.validarIncidencia({ titulo: 'a', descripcion: 'b', reportadoPor: 'c' });
  assert.strictEqual(r.valido, true);
});

test('crearIncidencia lanza error con título de solo espacios y recorta valores', () => {
  assert.throws(() => Incidencias.crearIncidencia({ titulo: '   ', descripcion: 'x', reportadoPor: 'y' }));
  const inc = Incidencias.crearIncidencia({ titulo: ' Falla ', descripcion: ' x ', reportadoPor: ' y ' });
  assert.strictEqual(inc.titulo, 'Falla');
});
  assert.deepStrictEqual(abiertas.map((i) => i.id), ['1', '4']);
  assert.strictEqual(Incidencias.filtrarPorEstado(muestra(), 'En proceso').length, 1);
});

test('filtrarPorEstado con "Todas" devuelve todas las incidencias', () => {
  assert.strictEqual(Incidencias.filtrarPorEstado(muestra(), 'Todas').length, 4);
});

test('cambiarEstado actualiza solo la incidencia indicada sin mutar la lista', () => {
  const original = muestra();
  const nueva = Incidencias.cambiarEstado(original, '1', 'Resuelta');
  assert.strictEqual(nueva.find((i) => i.id === '1').estado, 'Resuelta');
  assert.strictEqual(original.find((i) => i.id === '1').estado, 'Abierta');
  assert.strictEqual(nueva.find((i) => i.id === '2').estado, 'En proceso');
});

test('cambiarEstado rechaza estados inexistentes', () => {
  assert.throws(() => Incidencias.cambiarEstado(muestra(), '1', 'Cerrada'));
});

test('index.html contiene el filtro por estado', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(html.includes('id="filtro-estado"'));
});

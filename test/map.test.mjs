import test from 'node:test';
import assert from 'node:assert/strict';
import { CLUSTERS, SYMPTOMS, diagnose, LIST_SIZE } from '../app/docs.mjs';

test('17 docs across 4 clusters', () => {
  assert.equal(LIST_SIZE, 17);
  assert.equal(CLUSTERS.length, 4);
});

test('every symptom maps to a cluster', () => {
  for (const s of SYMPTOMS) {
    const d = diagnose(s.id);
    assert.ok(d, `diagnosis missing for ${s.id}`);
    assert.ok(d.cluster, `cluster missing for ${s.id}`);
    assert.ok(d.wrongPath, `wrong path missing for ${s.id}`);
  }
});

test('model-upgrade symptom highlights prompting cluster', () => {
  const d = diagnose('model-upgrade');
  assert.equal(d.cluster.id, 'prompts');
  assert.equal(d.wrongPath.doc, 'Prompting best practices');
});

test('second-agent symptom highlights building-agents', () => {
  const d = diagnose('second-agent');
  assert.equal(d.cluster.id, 'agent');
  assert.equal(d.wrongPath.doc, 'Building Effective Agents');
});

test('vaguer symptom highlights context engineering', () => {
  const d = diagnose('vaguer');
  assert.equal(d.cluster.id, 'context');
  assert.equal(d.wrongPath.doc, 'Context engineering');
});

test('buy-course symptom highlights interactive tutorial', () => {
  const d = diagnose('buy-course');
  assert.equal(d.cluster.id, 'course');
  assert.equal(d.wrongPath.doc, 'Interactive Prompt Engineering Tutorial');
});

test('unknown symptom returns null', () => {
  assert.equal(diagnose('does-not-exist'), null);
});
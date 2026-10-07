import { CLUSTERS, SYMPTOMS, diagnose } from '/app/docs.mjs';

const symptomHost = document.getElementById('symptoms');
const mapHost = document.getElementById('map');
const diagnosisHost = document.getElementById('diagnosis');

let activeSymptom = null;

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

function renderSymptoms() {
  symptomHost.innerHTML = SYMPTOMS.map(s => `
    <button type="button" class="symptom-btn" data-symptom="${s.id}" aria-pressed="false">
      ${s.label}
    </button>`).join('');
  symptomHost.querySelectorAll('.symptom-btn').forEach(btn => {
    btn.addEventListener('click', () => selectSymptom(btn.dataset.symptom));
  });
}

function updateSymptomStates() {
  symptomHost.querySelectorAll('.symptom-btn').forEach(btn => {
    const active = btn.dataset.symptom === activeSymptom;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function renderMap() {
  const highlighted = activeSymptom ? diagnose(activeSymptom) : null;
  mapHost.innerHTML = CLUSTERS.map(c => `
    <article class="cluster ${highlighted && highlighted.cluster.id === c.id ? 'highlight' : ''}">
      <span class="cluster-number">${c.number}</span>
      <h2>${c.title}</h2>
      <p class="tagline">${c.tagline}</p>
      <p class="advice">${c.advice}</p>
      <ul class="doc-list">
        ${c.docs.map(d => `<li><span class="doc-name">${d.name}</span><span class="doc-note">${d.note}</span></li>`).join('')}
      </ul>
    </article>`).join('');
}

function renderDiagnosis() {
  if (!activeSymptom) {
    diagnosisHost.hidden = true;
    return;
  }
  const { symptom, cluster, wrongPath } = diagnose(activeSymptom);
  diagnosisHost.hidden = false;
  diagnosisHost.innerHTML = `
    <h2>${symptom.label}</h2>
    <div class="wrong-path">
      <strong>Wrong path:</strong> ${wrongPath.label}<br>
      <strong>Doc that answers it:</strong> ${wrongPath.doc}
    </div>
    <p class="advice">${cluster.advice}</p>`;
}

function selectSymptom(id) {
  activeSymptom = id;
  updateSymptomStates();
  renderMap();
  renderDiagnosis();
  diagnosisHost.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
}

renderSymptoms();
renderMap();
renderDiagnosis();
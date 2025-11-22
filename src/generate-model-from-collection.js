// generate-model-from-collection.js
const fs = require('fs');
const mongoose = require('mongoose');

const MONGO = process.env.MONGO_URI || 'mongodb+srv://ue_amontefusco:AQUILOTTO@clusterm2.5cykqpk.mongodb.net/Percipio?retryWrites=true&w=majority';
const COLLECTION = 'contatti';
const SAMPLE_SIZE = 200; // quanti documenti usare per inferire lo schema

function detectType(val) {
  if (val === null || val === undefined) return 'Mixed';
  if (Array.isArray(val)) {
    if (val.length === 0) return 'Array';
    // inferisci tipo degli elementi (prendi il primo non-null)
    const t = detectType(val.find(v => v !== null && v !== undefined));
    return `[{ type: ${t === 'Mixed' ? 'mongoose.Schema.Types.Mixed' : t} }]`;
  }
  if (val instanceof Date) return 'Date';
  if (typeof val === 'boolean') return 'Boolean';
  if (typeof val === 'number') return Number.isInteger(val) ? 'Number' : 'Number';
  if (typeof val === 'string') {
    // possibile ObjectId? controllo semplice: 24 hex chars
    if (/^[0-9a-fA-F]{24}$/.test(val)) return 'mongoose.Schema.Types.ObjectId';
    // controllo ISO date string
    if (!isNaN(Date.parse(val))) return 'Date';
    return 'String';
  }
  if (typeof val === 'object') return 'Mixed';
  return 'Mixed';
}

function mergeTypes(a, b) {
  if (!a) return b;
  if (!b) return a;
  if (a === b) return a;
  // se diversi, ricadi su Mixed
  return 'Mixed';
}

async function inferSchemaFromDocs(docs) {
  const schema = {};

  for (const doc of docs) {
    for (const key of Object.keys(doc)) {
      if (key === '_id') continue; // gestito implicitamente
      const val = doc[key];

      let inferred = detectType(val);
      // normalizza tipo di stringa a token usabili
      // keep as string tokens like 'String', 'Number', 'Date', 'Boolean', 'mongoose.Schema.Types.ObjectId', 'Mixed', 'Array' or array notation
      // merge con tipo precedente
      const prev = schema[key];
      schema[key] = mergeTypes(prev, inferred);
    }
  }
  return schema;
}

function schemaObjectToCode(schemaObj) {
  const lines = [];
  lines.push("const mongoose = require('mongoose');");
  lines.push('');
  lines.push('const schemaDefinition = {');
  for (const [k, t] of Object.entries(schemaObj)) {
    // se è array notation già restituita come stringa con [{ ... }]
    if (t.startsWith('[{')) {
      lines.push(`  ${k}: ${t},`);
      continue;
    }
    if (t === 'mongoose.Schema.Types.ObjectId') {
      lines.push(`  ${k}: { type: mongoose.Schema.Types.ObjectId },`);
      continue;
    }
    if (t === 'Mixed') {
      lines.push(`  ${k}: { type: mongoose.Schema.Types.Mixed },`);
      continue;
    }
    if (t === 'Array') {
      lines.push(`  ${k}: [mongoose.Schema.Types.Mixed],`);
      continue;
    }
    lines.push(`  ${k}: { type: ${t} },`);
  }
  lines.push('};');
  lines.push('');
  lines.push('const contattiSchema = new mongoose.Schema(schemaDefinition, { timestamps: true });');
  lines.push('');
  lines.push("module.exports = mongoose.model('Contatto', contattiSchema, 'contatti');");
  return lines.join('\n');
}

async function main() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connesso a MongoDB:', MONGO);

  const col = mongoose.connection.db.collection(COLLECTION);
  const docs = await col.find({}).limit(SAMPLE_SIZE).toArray();
  if (!docs || docs.length === 0) {
    console.error('Nessun documento trovato in', COLLECTION);
    process.exit(1);
  }
  const schemaObj = await inferSchemaFromDocs(docs);
  const code = schemaObjectToCode(schemaObj);

  // crea cartella models se non esiste
  if (!fs.existsSync('./models')) fs.mkdirSync('./models');
  const outPath = './models/contatti.model.js';
  fs.writeFileSync(outPath, code, 'utf8');
  console.log('Modello generato in', outPath);
  console.log('Contenuto:\n', code);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

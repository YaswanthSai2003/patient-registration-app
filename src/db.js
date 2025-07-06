import { PGlite } from "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js";
const db = new PGlite("idb://patients.db");

async function ensure() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      pid TEXT PRIMARY KEY,
      name TEXT,
      age INTEGER,
      gender TEXT,
      contact TEXT,
      aadhar TEXT,
      pan TEXT,
      address TEXT,
      insuranceType TEXT,
      insuranceNo TEXT,
      history TEXT,
      department TEXT,
      doctor TEXT,
      appointmentDate TEXT,
      status TEXT,
      createdAt TEXT
    );
  `);
}

// Add new patient
export async function addPatient(p) {
  await ensure();
  await db.query(
    `INSERT INTO patients (
      pid, name, age, gender, contact, aadhar, pan, address,
      insuranceType, insuranceNo, history, department, doctor,
      appointmentDate, status, createdAt
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
    );`,
    [
      p.pid,
      p.name,
      p.age,
      p.gender,
      p.contact,
      p.aadhar,
      p.pan,
      p.address,
      p.insuranceType,
      p.insuranceNo || "",
      p.history,
      p.department,
      p.doctor,
      p.appointmentDate,
      p.status,
      p.createdAt,
    ]
  );
}

// Get all patients
export async function getPatients() {
  await ensure();
  const { rows } = await db.query("SELECT * FROM patients ORDER BY createdAt DESC;");
  return rows;
}

export async function runSQL(sql) {
  await ensure();
  return await db.query(sql);
}

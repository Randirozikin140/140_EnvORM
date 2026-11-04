const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./models");

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// --- 1. DEFINISIKAN SEMUA ROUTES DI SINI ---

// CREATE (POST) - Tambah Komik
app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.status(201).send(komik);
  } catch (err) {
    res.status(500).send(err);
  }
});

// READ (GET) - Lihat Semua Komik
app.get("/komik", async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.status(200).send(komik);
  } catch (err) {
    res.status(500).send(err);
  }
});

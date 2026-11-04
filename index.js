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

// UPDATE (PUT) - Ubah Komik Berdasarkan ID
app.put("/komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send({ message: "Komik tidak ditemukan" });
    }

    await komik.update(data);
    res.send({ message: "Komik berhasil diupdate", komik });
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE (DELETE) - Hapus Komik Berdasarkan ID
app.delete("/komik/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send({ message: "Komik tidak ditemukan" });
    }

    await komik.destroy();
    res.send({ message: "Komik berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err);
  }
});

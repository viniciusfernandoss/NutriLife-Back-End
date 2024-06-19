const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); // Importa a configuração do Cloudinary

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Nome da pasta no Cloudinary
    format: async (req, file) => 'png', // Formato da imagem
    public_id: (req, file) => file.originalname.split('.')[0] // Nome do arquivo sem extensão
  }
});

const upload = multer({ storage: storage });

// Rota para upload de imagem
router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file && req.file.path) {
    const imageUrl = req.file.path; // URL da imagem no Cloudinary
    // Salvar a URL no banco de dados MongoDB, se necessário
    res.json({ imageUrl: imageUrl });
  } else {
    res.status(400).json({ error: 'Falha no upload da imagem' });
  }
});

module.exports = router;

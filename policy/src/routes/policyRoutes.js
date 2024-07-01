const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Worker } = require('worker_threads');
const path = require('path');
const policyController = require('../controllers/policyController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
    const worker = new Worker(path.resolve(__dirname, '../workers/fileWorker.js'));
    worker.postMessage(req.file.path);

    worker.on('message', (message) => {
        res.send({ message });
    });

    worker.on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
});

router.get('/search', policyController.searchPolicyByUsername);
router.get('/aggregate', policyController.aggregatePolicyByUser);
module.exports = router;

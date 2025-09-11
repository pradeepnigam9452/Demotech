const express = require('express');
const router = express.Router();
const {
    createQuotation,
    getAllQuotations,
    getQuotationById,
    deleteQuotation,
    updateQuotation
} = require('../controller/quotationController');

 router.post('/createQuotation', createQuotation);

 router.get('/getAllQuotations', getAllQuotations);

 router.get('/getQuotationById/:id', getQuotationById);

 router.delete('/deleteQuotation/:id', deleteQuotation);

 router.put('/updateQuotation/:id', updateQuotation);

module.exports = router;

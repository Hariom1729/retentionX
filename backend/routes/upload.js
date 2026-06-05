const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const customers = [];
    for (let row of data) {
      if (row['Customer ID'] && row['Name'] && row['Email'] && row['Join Date'] && row['Last Purchase Date']) {
        customers.push({
          customerId: String(row['Customer ID']),
          name: String(row['Name']),
          email: String(row['Email']),
          joinDate: new Date(row['Join Date']),
          lastPurchaseDate: new Date(row['Last Purchase Date']),
          purchaseCount: Number(row['Purchase Count']) || 0,
          revenue: Number(row['Revenue']) || 0
        });
      }
    }

    // Insert ignoring duplicates based on customerId
    for (let cust of customers) {
      await Customer.findOneAndUpdate({ customerId: cust.customerId }, cust, { upsert: true });
    }
    
    // clean up file
    fs.unlinkSync(req.file.path);

    res.json({ msg: `${customers.length} records processed` });
  } catch (err) {
    console.error(err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

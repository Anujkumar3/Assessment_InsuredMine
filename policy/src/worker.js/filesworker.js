const { parentPort } = require('worker_threads');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const Account = require('../models/Account');
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');
const PolicyInfo = require('../models/PolicyInfo');
const connectDB = require('../db');

// Function to process Excel/CSV data
const processFile = async (filePath) => {
    await connectDB();
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
        // Example processing logic
        const agent = new Agent({ name: row['Agent Name'] });
        await agent.save();

        const user = new User({
            firstName: row['First Name'],
            dob: row['DOB'],
            address: row['Address'],
            phoneNumber: row['Phone Number'],
            state: row['State'],
            zipCode: row['Zip Code'],
            email: row['Email'],
            gender: row['Gender'],
            userType: row['User Type']
        });
        await user.save();

        const account = new Account({
            accountName: row['Account Name'],
            userId: user._id
        });
        await account.save();

        const policyCategory = new PolicyCategory({ categoryName: row['Policy Category'] });
        await policyCategory.save();

        const policyCarrier = new PolicyCarrier({ companyName: row['Policy Carrier'] });
        await policyCarrier.save();

        const policyInfo = new PolicyInfo({
            policyNumber: row['Policy Number'],
            policyStartDate: row['Policy Start Date'],
            policyEndDate: row['Policy End Date'],
            policyCategoryId: policyCategory._id,
            policyCarrierId: policyCarrier._id,
            userId: user._id
        });
        await policyInfo.save();
    }

    mongoose.connection.close();
};

parentPort.on('message', async (filePath) => {
    await processFile(filePath);
    parentPort.postMessage('File processing completed');
});

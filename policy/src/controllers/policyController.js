const PolicyInfo = require('../models/PolicyInfo');

exports.searchPolicyByUsername = async (req, res) => {
    const username = req.query.username;
    try {
        const user = await User.findOne({ firstName: username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const policies = await PolicyInfo.find({ userId: user._id });
        res.send({ user, policies });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.aggregatePolicyByUser = async (req, res) => {
    try {
        const aggregation = await PolicyInfo.aggregate([
            { $group: { _id: '$userId', policies: { $push: '$$ROOT' } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
        ]);

        res.send(aggregation);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
// exports.aggregatePolicyByUser = async (req, res) => {
//     try {
//         const aggregation = await PolicyInfo.aggregate([
//             {
//                 $group: {
//                     _id: '$userId',
//                     policies: { $push: '$$ROOT' } // Store all policy documents in an array
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'users', 
//                     localField: '_id', 
//                     foreignField: '_id', 
//                     as: 'user' 
//                 }
//             },
//             {
//                 $unwind: '$user' 
//             }
//         ]);

//         res.json(aggregation);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
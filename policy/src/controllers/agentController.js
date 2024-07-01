const Agent = require('../models/Agent');

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAgent = async (req, res) => {
    const { name } = req.body;

    try {
        const newAgent = new Agent({ name });
        const savedAgent = await newAgent.save();
        res.status(201).json(savedAgent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAgent = async (req, res) => {
    const { name } = req.body;

    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        agent.name = name;
        const updatedAgent = await agent.save();
        res.json(updatedAgent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        await agent.remove();
        res.json({ message: 'Agent deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

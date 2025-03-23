import PsoEntry from '../model/pso.model.js';

// Add or Update PSOs for a Staff Member
export const addOrUpdatePso = async (req, res) => {
    try {
        const { pso1, pso2, pso3 } = req.body;
        const staffId = req.user.id; // Extract staff ID from authenticated user

        // Check if record already exists
        let record = await PsoEntry.findOne({ staffId });

        if (record) {
            // Update existing PSO entry
            record.pso1 = pso1;
            record.pso2 = pso2;
            record.pso3 = pso3;
            await record.save();
            return res.status(200).json({ message: "PSO updated successfully", record });
        } else {
            // Create new PSO entry
            record = new PsoEntry({ staffId, pso1, pso2, pso3 });
            await record.save();
            return res.status(201).json({ message: "PSO added successfully", record });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get PSOs for a Staff Member
export const getPso = async (req, res) => {
    try {
        const staffId = req.user.id;
        const record = await PsoEntry.findOne({ staffId });

        if (!record) return res.status(404).json({ message: "No PSO found for this staff." });

        return res.status(200).json(record);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

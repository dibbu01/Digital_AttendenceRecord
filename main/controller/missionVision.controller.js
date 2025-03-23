import MissionVision from '../model/missionVision.model.js';

export const addMissionVision = async (req, res) => {
    try {
        const { mission, vision } = req.body;
        const staffId = req.user.id; // Assuming authentication middleware provides user ID

        let record = await MissionVision.findOne({ staffId });
        if (record) {
            record.mission = mission;
            record.vision = vision;
            record.updatedAt = new Date();
            await record.save();
        } else {
            record = new MissionVision({ staffId, mission, vision });
            await record.save();
        }

        res.status(200).json({ message: "Mission and Vision updated successfully", record });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMissionVision = async (req, res) => {
    try {
        const staffId = req.user.id;
        const record = await MissionVision.findOne({ staffId });

        if (!record) return res.status(404).json({ message: "No mission-vision found" });

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

import mongoose from 'mongoose';

const missionVisionSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

const MissionVision = mongoose.model('MissionVision', missionVisionSchema);

export default MissionVision;
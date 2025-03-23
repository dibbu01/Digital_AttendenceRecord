import PoEntry from '../model/po.model.js';

// ✅ Add or Update POs for a Staff Member based on Subject
export const addOrUpdatePo = async (req, res) => {
    try {
        const { po1, po2, po3, po4, po5, po6, po7, po8, po9, po10, po11, po12 } = req.body;
        const staffId = req.user.id; // Extract staff ID from authenticated user

        // Check if a PO entry already exists for this subject and staff
        let record = await PoEntry.findOne({ staffId });

        if (record) {
            // Update existing PO entry
            record.po1 = po1;
            record.po2 = po2;
            record.po3 = po3;
            record.po4 = po4;
            record.po5 = po5;
            record.po6 = po6;
            record.po7 = po7;
            record.po8 = po8;
            record.po9 = po9;
            record.po10 = po10;
            record.po11 = po11;
            record.po12 = po12;
            await record.save();
            return res.status(200).json({ message: "PO updated successfully", record });
        } else {
            // Create new PO entry
            record = new PoEntry({
                staffId,
                po1,
                po2,
                po3,
                po4,
                po5,
                po6,
                po7,
                po8,
                po9,
                po10,
                po11,
                po12
            });
            await record.save();
            return res.status(201).json({ message: "PO added successfully", record });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ✅ Get POs for a Staff Member based on Subject
export const getPo = async (req, res) => {
    try {
        const staffId = req.user.id;

        const record = await PoEntry.findOne({ staffId });

        if (!record) return res.status(404).json({ message: "No PO found for this subject." });

        return res.status(200).json(record);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

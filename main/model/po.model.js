import mongoose from 'mongoose';

// Define the schema for PO entries
const poSchema = new mongoose.Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Links to the User model
            required: true,
        },
        po1: { type: String, required: true },
        po2: { type: String, required: true },
        po3: { type: String, required: true },
        po4: { type: String, required: true },
        po5: { type: String, required: true },
        po6: { type: String, required: true },
        po7: { type: String, required: true },
        po8: { type: String, required: true },
        po9: { type: String, required: true },
        po10: { type: String, required: true },
        po11: { type: String, required: true },
        po12: { type: String, required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the model
const PoEntry = mongoose.model('PoEntry', poSchema);
export default PoEntry;

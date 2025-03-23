import mongoose from 'mongoose';

// Define the schema for PSO entries
const psoSchema = new mongoose.Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Links to the User model
            required: true,
            unique: true, // Ensures one record per staff
        },
        pso1: { type: String, required: true },
        pso2: { type: String, required: true },
        pso3: { type: String, required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the model
const PsoEntry = mongoose.model('PsoEntry', psoSchema);
export default PsoEntry;

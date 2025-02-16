import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
    {
        firstName: {
            type: mongoose.Schema.Types.String,
            required: true,
            maxLength: 40,
        },
        lastName: {
            type: mongoose.Schema.Types.String,
            required: true,
            maxLength: 40,
        },
        phone: {
            type: mongoose.Schema.Types.String,
            required: true,
            validate: [/^\d{10}$/, "Phone must be 10 numbers."],
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            validate: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid e-mail address",
            ],
        },
        image: {
            type: mongoose.Schema.Types.Buffer,
        },
        department: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;

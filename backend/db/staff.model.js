import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
    {
        firstName: {
            type: mongoose.Schema.Types.String,
            required: [true, "First name is required."],
            maxLength: 40,
        },
        lastName: {
            type: mongoose.Schema.Types.String,
            required: [true, "Last name is required"],
            maxLength: 40,
        },
        phone: {
            type: mongoose.Schema.Types.String,
            required: [true, "Phone is required"],
            validate: [/^\d{10}$/, "Phone must be 10 numbers."],
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: [true, "E-mail is required"],
            validate: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid e-mail address",
            ],
        },
        image: {
            publicId: mongoose.Schema.Types.String,
            url: mongoose.Schema.Types.String,
        },
        department: {
            type: mongoose.Schema.Types.String,
            required: [true, "Department is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;

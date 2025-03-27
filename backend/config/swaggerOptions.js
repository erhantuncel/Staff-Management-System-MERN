import "dotenv/config";

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Staff Management API",
            description: "Staff Management API",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}/api`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const fs = require("node:fs");
const readline = require("node:readline");

const variables = [
    { prompt: "MongoDB user:", name: "MONGODB_USER" },
    { prompt: "MongoDB password:", name: "MONGODB_PASSWORD" },
    { prompt: "MongoDB database name:", name: "MONGODB_DATABASE" },
    { prompt: "MongoDB port:", name: "MONGODB_DOCKER_PORT" },
    { prompt: "JWT Secret key:", name: "JWT_SECRET" },
];

const cloudinaryVariables = [
    { prompt: "Cloudinary cloud name:", name: "CLOUD_NAME" },
    { prompt: "Cloudinary api key:", name: "API_KEY" },
    { prompt: "Cloudinary api secret:", name: "API_SECRET" },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const createEnvMap = async (
    variablesInfoArray,
    cloudinaryVariablesInfoArray
) => {
    const envMap = new Map();

    for (const variableInfo of variablesInfoArray) {
        const value = await askQuestion(variableInfo.prompt);
        envMap.set(variableInfo.name, value);
    }

    const haveCloudinaryInfo = await askQuestion(
        "Do you have Cloudinary api keys [yes/no]"
    );

    for (const variableInfo of cloudinaryVariablesInfoArray) {
        let value = "";
        if (haveCloudinaryInfo.trim() === "yes") {
            value = await askQuestion(variableInfo.prompt);
        }
        envMap.set(variableInfo.name, value);
    }

    rl.close();

    return envMap;
};

createEnvMap(variables, cloudinaryVariables).then((environmentMap) => {
    const writer = fs.createWriteStream("./.env", { flags: "w" });

    for (const [key, value] of environmentMap.entries()) {
        writer.write(`${key}=\"${value}\"\n`);
    }
});

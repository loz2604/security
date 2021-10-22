require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const bcrypt = require("bcrypt");

const main = async () => {
    const argv = yargs(hideBin(process.argv)).argv;
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const password = argv.password;
    const username = argv.username;
    const otherPassword = argv.otherPassword;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const matched = await bcrypt.compare(otherPassword, hash);
    if (matched) {
        console.log("Hashed passwords match!");
    } else {
        console.log("Hashed passwords do not match!");
    } console.log(`${username}: ${salt} ${password} ${hash}`);
};

main();


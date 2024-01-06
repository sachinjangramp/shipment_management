const fs = require('fs').promises;
const path = require('path');

const logFilePath = path.join(__dirname, './../../app.log');

const getLogs = async (req, res) => {
    try {
        const data = await fs.readFile(logFilePath, 'utf8');
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading log file');
    };
}

module.exports = getLogs
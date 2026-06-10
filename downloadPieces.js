const fs = require('fs');
const https = require('https');
const path = require('path');

const pieces = ['p', 'n', 'b', 'r', 'q', 'k'];
const colors = ['w', 'b'];
const stylesMapping = {
    '3d': 'neo',
    'crystal': 'icy_sea',
    'glass': 'glass'
};

const baseDir = path.join(__dirname, 'assets', 'pieces');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

Object.keys(stylesMapping).forEach(localStyle => {
    const remoteStyle = stylesMapping[localStyle];
    const styleDir = path.join(baseDir, localStyle);
    if (!fs.existsSync(styleDir)) {
        fs.mkdirSync(styleDir, { recursive: true });
    }

    colors.forEach(color => {
        pieces.forEach(piece => {
            const fileName = `${color}${piece}.png`;
            const url = `https://images.chesscomfiles.com/chess-themes/pieces/${remoteStyle}/150/${fileName}`;
            const filePath = path.join(styleDir, fileName);

            https.get(url, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(filePath);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`Downloaded ${localStyle}/${fileName}`);
                    });
                } else {
                    console.error(`Failed to download ${url} - Status: ${res.statusCode}`);
                }
            }).on('error', (err) => {
                console.error(`Error downloading ${url}:`, err.message);
            });
        });
    });
});

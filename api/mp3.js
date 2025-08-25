const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { link } = req.body;
        try {
            const mp3Link = await getMp3Link(link);
            res.status(200).json({ mp3Link: mp3Link });
        } catch (error) {
            res.status(500).json({ message: 'Error downloading MP3.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

// Function to get MP3 link
async function getMp3Link(link) {
    const API_URL = `https://ytdownloader.anshppt19.workers.dev/?url=${link}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status === 'success') {
        return data.download_url;
    }
    throw new Error('Failed to fetch MP3');
}

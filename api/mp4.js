const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { link } = req.body;
        try {
            const mp4Link = await getMp4Link(link);
            res.status(200).json({ mp4Link: mp4Link });
        } catch (error) {
            res.status(500).json({ message: 'Error downloading MP4.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

// Function to get MP4 link
async function getMp4Link(link) {
    const API_URL = `https://youtube.anshppt19.workers.dev/anshapi?url=${link}&format=mp4hd`;
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.success) {
        return data.data.url_mp4_youtube;
    }
    throw new Error('Failed to fetch MP4');
}

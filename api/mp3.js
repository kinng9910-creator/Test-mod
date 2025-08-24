export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        const response = await fetch(`https://ytdownloader.anshppt19.workers.dev/?url=${url}`);

        // چیک کریں کہ آیا ریسپانس میں JSON آ رہا ہے یا نہیں
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            if (data.status === "success") {
                res.status(200).json({ success: true, download_url: data.download_url, title: data.title });
            } else {
                res.status(400).json({ success: false, message: "Failed to fetch MP3." });
            }
        } catch (e) {
            // اگر JSON پارس نہیں ہو رہا تو HTML ریسپانس ہے
            res.status(500).json({ success: false, message: "Invalid response from the API." });
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        // MP4 API سے ویڈیو کی معلومات حاصل کریں
        const response = await fetch(`https://youtube.anshppt19.workers.dev/anshapi?url=${url}&format=mp4hd`);
        const data = await response.json();

        if (data.success) {
            // ویڈیو کا لنک اور نام واپس کریں
            res.status(200).json({
                success: true,
                video_url: data.data.url_mp4_youtube,
                video_name: data.data.name_mp4
            });
        } else {
            res.status(400).json({ success: false, message: "Failed to fetch MP4." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

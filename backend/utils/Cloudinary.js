const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});


const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "your_folder_name"
        });
        console.log("Image URL:", result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = cloudinary;

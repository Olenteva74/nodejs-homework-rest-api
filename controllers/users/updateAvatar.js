const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const {User} = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async(req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id: id} = req.user;
    try {
        const img = await Jimp.read(tempUpload);
        await img.autocrop()
        .cover(250, 250 || Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(tempUpload);
        const avatarName = `${id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', avatarName);
        await User.findByIdAndUpdate(id, {avatarURL}, {new: true});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }

};

module.exports = updateAvatar;
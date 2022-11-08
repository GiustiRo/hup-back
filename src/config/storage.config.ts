import { registerAs } from '@nestjs/config';

export default registerAs('gcs', () => ({
    projectId: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    gcsBucket_AVATARS: process.env.STORAGE_MEDIA_BUCKET_AVATARS,
}));


// const StorageConfig = {
// };

// export default StorageConfig;
import { registerAs } from '@nestjs/config';

export default registerAs('gcs', () => ({
    projectId: process.env.GCS_PROJECT_ID,
    private_key: process.env.GCS_PRIVATE_KEY,
    client_email: process.env.GCS_CLIENT_EMAIL,
    gcsBucket_AVATARS: process.env.GCS_STORAGE_MEDIA_BUCKET_AVATARS,
}));


// const StorageConfig = {
// };

// export default StorageConfig;
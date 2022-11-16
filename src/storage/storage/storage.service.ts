import { DownloadResponse, Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { getTimeInMs } from "src/utils/date-utils";


@Injectable()
export class StorageService {
    private storage: Storage;

    constructor(
        private configService: ConfigService
    ) {
        this.storage = new Storage({
            projectId: this.configService.get<string>('gcs.projectId'),
            credentials: {
                client_email: this.configService.get<string>('gcs.client_email'),
                private_key: this.configService.get<string>('gcs.private_key'),
            },
        });
    }

    async save(
        path: string,
        contentType: string, /* also as mimetype.*/
        media: Buffer,
        customMetadata: { [key: string]: string }[],
        metadata: { [key: string]: string }[],
        bucket: StorageBuckets
    ) {
        console.warn(contentType);
        const customMetadataObject = customMetadata?.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storage
            .bucket(this.configService.get<string>(`gcs.gcsBucket_${bucket}`))
            .file(`${path}.${(StorageMymeTypeDicc[contentType])}`);

        const stream = file.createWriteStream();
        await stream.on('error', (error) => {
            console.error('stream error', error)
            return error
        });
        await stream.on("finish", async () => {
            console.warn('setting metadata: ', metadata, customMetadataObject);
            return await file.setMetadata({
                ...metadata,
                metadata: { ...customMetadataObject }
            });
        });
        await stream.end(media);
    }

    async delete(path: string, bucket) {
        await this.storage
            .bucket(this.configService.get<string>(`gcs.gcsBucket__${bucket}`))
            .file(path)
            .delete({ ignoreNotFound: true });
    }

    async get(path: string, bucket): Promise<StorageFile> {
        const fileResponse: DownloadResponse = await this.storage
            .bucket(this.configService.get<string>(`gcs.gcsBucket__${bucket}`))
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>();
        return storageFile;
    }

    async getWithMetaData(path: string, bucket): Promise<StorageFile> {
        const [metadata] = await this.storage
            .bucket(this.configService.get<string>(`gcs.gcsBucket__${bucket}`))
            .file(path)
            .getMetadata();
        const fileResponse: DownloadResponse = await this.storage
            .bucket(this.configService.get<string>(`gcs.gcsBucket__${bucket}`))
            .file(path)
            .download();
        const [buffer] = fileResponse;

        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>(
            Object.entries(metadata || {})
        );
        storageFile.contentType = storageFile.metadata.get("contentType");
        return storageFile;
    }
}





export class StorageFile {
    buffer: Buffer;
    metadata: Map<string, string>;
    contentType: string;
}

export enum StorageBuckets {
    AVATARS = 'AVATARS',
    PLANTS = 'PLANTS'
}

export const StorageMymeTypeDicc = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',

}

export function fileNameUniqueGenerator(key: string): string {
    /* Will add ms timestamp to the key/name */
    return `${key}_${getTimeInMs()}`
}
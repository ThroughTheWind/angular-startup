import { Image } from 'src/app/shared/models/Image';
export interface Post {
    id: string;
    name: string;
    description: string;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
}

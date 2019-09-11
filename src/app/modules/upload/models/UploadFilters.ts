import { UploadSortType } from '../enums/upload-sort-type';

export interface UploadFilters {
    name: string;
    extensions: string[];
    createdAt: {
        start: Date;
        end: Date;
    }
    sortType: UploadSortType;
}
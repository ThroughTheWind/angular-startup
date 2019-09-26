import { PostSortType } from '../enum/post-sort-type';

export interface PostFilters {
    name: string;
    createdAt: {
        start: Date;
        end: Date;
    }
    sortType: PostSortType;
}
import { responseType } from "./auth";

export type generalCRUDActionType = {
    getAllFeeds: (path: string) => Promise<responseType<any>>;
    getFeed: (path: string, id: number) => Promise<responseType<any>>;
    addFeed: (path: string, data: any) => Promise<responseType<any>>;
    editFeed: (path: string, id: number | string, data: any) => Promise<responseType<any>>;
    deleteFeed: (path: string, id: number | string) => Promise<responseType<any>>;
};

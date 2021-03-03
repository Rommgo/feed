export type generalCRUDApiType = {
    getAllFeeds: (path: string, token: string | null) => Promise<any>;
    getFeed: (path: string, token: string | null, id: number) => Promise<any>;
    addFeed: (path: string, token: string | null, data: any) => Promise<any>;
    editFeed: (path: string, token: string | null, id: number | string, data: any) => Promise<any>;
    deleteFeed: (path: string, token: string | null, id: number | string) => Promise<any>;
};

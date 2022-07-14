import { Moment } from "moment";

interface PublishedTimestamp {
    $numberLong: string;
}
interface ScrapedTimestamp {
    $numberLong: string;
}
interface PostTimestamp {
    $numberLong: string;
}

interface RequestTimestamp {
    $numberLong: string;
}

export interface Tweet {
    _id: string;
    url: string;
    text: string;
    author: string;
    publishedDate: Date;
    publishedTimestamp: PublishedTimestamp;
    scrapedTimestamp: ScrapedTimestamp;
    retweets: any;
    likes: any;
    postTimestamp: PostTimestamp;
    requestTimestamp: RequestTimestamp;
    sentiment: string;
    hashtags: string;
    isRetweet: boolean;
    rankurDataImport: boolean;
    alertSent?: boolean;
    rating?: number;
    replies: string;
    imageUrl: string;
    extra?: TwitterSingleTweetResponse;
}


export interface TwitterAPIError {
    resource_id: string
    parameter: string
    resource_type: string
    section: string
    title: string
    value: string
    detail: string
    type: string
}

export interface TwitterSingleTweetResponse {
    data?: Data
    includes?: Includes
    errors?: TwitterAPIError[]
}

export interface Data {
    author_id: string
    id: string
    text: string
}

export interface Includes {
    users: User[]
    media?: Media[]
}

export interface Media {
    media_key: string
    type: string
    url: string
}

export interface User {
    id: string
    name: string
    username: string
    profile_image_url: string
}

export interface ILayoutState {
    search: string;
    setSearch: Function;
    filter: IFilter;
}

export interface IFilter {
    startDate: Moment | null;
    endDate: Moment | null;
}
// This file is auto-generated by @hey-api/openapi-ts

export type Blog = {
    id: number;
    title: string;
};

export type Comment = {
    id: number;
    content: string;
    user_id: number;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type MyBlog2 = {
    id: number;
    title: string;
    comments?: Array<Comment>;
};

export type MyBlog3 = {
    id: number;
    title: string;
    comments?: Array<MyComment3>;
};

export type MyBlogSite1 = {
    name: string;
    blogs?: Array<Blog>;
};

export type MyBlogSite2 = {
    name: string;
    blogs?: Array<MyBlog2>;
};

export type MyBlogSite3 = {
    name: string;
    blogs?: Array<MyBlog3>;
};

export type MyComment3 = {
    id: number;
    content: string;
    user_id: number;
    user?: User | null;
};

export type User = {
    id: number;
    name: string;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type ReadMySite1Data = {
    name: string;
};

export type ReadMySite1Response = MyBlogSite1;

export type ReadMySite2Data = {
    name: string;
};

export type ReadMySite2Response = MyBlogSite2;

export type ReadMySite3Data = {
    name: string;
};

export type ReadMySite3Response = MyBlogSite3;

export type $OpenApiTs = {
    '/my-site-1/{name}': {
        get: {
            req: ReadMySite1Data;
            res: {
                /**
                 * Successful Response
                 */
                200: MyBlogSite1;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/my-site-2/{name}': {
        get: {
            req: ReadMySite2Data;
            res: {
                /**
                 * Successful Response
                 */
                200: MyBlogSite2;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/my-site-3/{name}': {
        get: {
            req: ReadMySite3Data;
            res: {
                /**
                 * Successful Response
                 */
                200: MyBlogSite3;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
};
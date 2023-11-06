export interface HttpOptions {
    url: string;
    body?: any;
    headers?: { [key: string]: string };
    urlBase?: string;
    skipValidation?: boolean;
}
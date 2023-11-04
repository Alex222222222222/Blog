export default function concatenateUrls(baseUrls: string, path: string) : string {
    let new_url = baseUrls;
    while (new_url.endsWith('/')) {
        new_url = new_url.slice(0, -1);
    }
    let new_path = path;
    while (new_path.startsWith('/')) {
        new_path = new_path.slice(1);
    }
    return `${new_url}/${new_path}`;
}
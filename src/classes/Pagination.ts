import IPagination from "@/models/Pagination";

class Pagination<T> {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: T[];
    constructor() {
        this.count = 0;
        this.limit = 0;
        this.total = 0;
        this.offset = 0;
        this.results = [];
    }
    static fromJson<U>(pagination: IPagination, results: U[]): Pagination<U> {
        const object = new Pagination<U>();
        object.results = results;
        object.count = pagination.count;
        object.limit = pagination.limit;
        object.offset = pagination.offset;
        object.total = pagination.total;
        return object;
    }
}

export default Pagination;

export abstract class ApiClient<I extends object, Data extends object> {
    abstract request(input?: I): Promise<Data>;
}
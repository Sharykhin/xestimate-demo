export interface DispatcherInterface {

    on(event: string, callback: (data: any) => void): () => void;

    dispatch(event: string, data?: any): void;
}

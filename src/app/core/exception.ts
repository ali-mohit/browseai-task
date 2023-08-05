export class AppException extends Error{
    public code: number;
    public error_message: string;
    private data: any;

    constructor(code: number,msg: string, data: any){
        super(msg)

        this.code = code
        this.error_message = msg;
        this.message = msg;
        
        if(data){
            
        }
        //this.data = data
    }
}
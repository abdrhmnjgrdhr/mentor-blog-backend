export const Errorhandler=(statusCode,message)=>{
    const error=new Error()
    error.statusCode=statusCode;
    error.message=message
}
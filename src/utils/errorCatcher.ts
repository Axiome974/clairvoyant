const errorCatcher = <Function>function( controller:Function ){

    return async ( req:Request, res:Response, next:any ) => {
        try {
            await controller( req, res, next );
        } catch ( error ) {
            next( error );
        }
    }

}

export default errorCatcher;
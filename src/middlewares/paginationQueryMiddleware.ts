import {Request, RequestHandler, Response} from "express";

export type Pagination = {
    page:number,
    limit:number,
    skip:number,
    baseUrl:string,
    order: [string, string][]
    filter: Record<string, string>
}

export type PaginationQuery = Request & {
    query:{
        page:string,
        limit:string,
    }
    pagination: Pagination
};

const DIRECTIONS = ['ASC', 'DESC'];


const paginationQueryMiddleware = (req: PaginationQuery, res: Response, next: Function) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orderByQuery:string[]|string|null = <string|string[]>req.query.order;
    const filterQuery:string[]|string|null = <string|string[]>req.query.filter;


    req.pagination = {
        page,
        limit,
        skip,
        baseUrl: req.baseUrl,
        order: getOrderByPagination(orderByQuery),
        filter: getFilterByPagination(filterQuery)
    };

    next();

}

function getOrderByPagination(orderBy:any) {

    if( !orderBy ) return [];

    if( typeof orderBy === 'string') {
        orderBy = [orderBy];
    }

    return orderBy.map( (order: string) => {
        const [field, direction] = order.split(':');
        if( field && direction &&  DIRECTIONS.includes(direction.toUpperCase())){
            return [field, direction.toUpperCase()];
        }
    }).filter( (order:any) => order !== undefined);

}

function getFilterByPagination(filterQ:any) {

    if( !filterQ ) return [];

    if( typeof filterQ === 'string') {
        filterQ = [filterQ];
    }


    const filter = {};
    for( let filterS of filterQ){
        const [field, value] = filterS.split(':');
        if( field && filter){
            filter[field] = value;
        }
    }

    return filter;

}

export default paginationQueryMiddleware;
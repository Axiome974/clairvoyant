import {Pagination} from "../middlewares/paginationQueryMiddleware";
import {Attributes, FindOptions, Model, ModelStatic, Sequelize} from "sequelize";

export type PaginatedResults = {
    pagination: {
        page:number,
        lastPage,number,
        limit:number,
        found:number,
        total:number,
        next?:string,
        previous?:string
    },
    data: Model[]
}


const paginatorService = {

    getPaginatedResults: async (model:ModelStatic<Model>, pagination:Pagination,  options: Attributes<any> = {}) => {

        const order = options.order ? [...options.order, ...pagination.order] : pagination.order;
        const filter = options.where ? {...options.where, ...pagination.filter} : pagination.filter;

        console.log(filter)
        const paginatedOptions = {
            ...options,
            limit: pagination.limit,
            offset: pagination.skip,
            order,
            where:filter
        }
        const maxResults = await model.count({
            col: 'id',
            where: filter
        })
        /*
        const maxResults = await model.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'idCount']
            ]
        });

         */
        const results = await model.findAll(paginatedOptions);
        const lastPage = Math.ceil(maxResults / pagination.limit);

        return {
            pagination: {
                page: pagination.page,
                lastPage,
                limit: pagination.limit,
                found: results.length,
                total: maxResults,
                next:  pagination.page < lastPage ? pagination.baseUrl + `?page=${pagination.page + 1}&limit=${pagination.limit}` : null,
                previous:  pagination.page > 1 ? pagination.baseUrl + `?page=${pagination.page - 1}&limit=${pagination.limit}` : null,
            },
            data: results
        }
    }
}

export default paginatorService;
class Service {

    /**
     * Wraps the actual data within pagination helper data.
     * @param {*} dataWithCount [Object total number of data in the database and array of currently present data.]
     * @param {*} limit [Number of data to show in a page.]
     * @param {*} page [Page number of the current data list.]
     */
    appendPaginationData = (dataWithCount, limit, page) => {
        const total = dataWithCount.count
        const lastPage = Math.ceil(total/limit);
        const currentPage = page;
        let from = (currentPage-1) * limit + 1;
        const perPage = limit;
        let to = currentPage * limit;

        if (to > total) to = total;
        if (from > total) from = to = null;

        return { ...dataWithCount, lastPage, currentPage, from, perPage, to };
    }

    /**
     * Extracts the filter values and sets the default value if not set and returns it. 
     * @param {*} filter [Object of filters.]
     */
    refineFilters = (filter) => {
        const limit = parseInt(filter.limit) || 10;
        const page = parseInt(filter.page) || 1;
        const offset = limit * (page - 1);
        const where = filter.where || {};
        const include = filter.include || [];
        const order = filter.order || [['id', 'DESC']]
        const transaction = filter.transaction

        return { limit, page, offset, where, include, order, transaction };
    }
}

module.exports = Service;
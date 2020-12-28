class Service {
    /**
     * Wraps the actual data within pagination helper data.
     * @param {*} dataWithCount 
     * @param {*} limit 
     * @param {*} page 
     */
    appendPaginationData = (dataWithCount, limit, page) => {
        const total = dataWithCount.count
        const lastPage = Math.ceil(total/limit);
        const currentPage = page;
        let from = (currentPage-1) * limit + 1;
        const perPage = limit;
        let to = currentPage * limit;

        if (to > total) {
            to = total;
        }

        if (from > total) {
            from = null
            to = null
        }

        return {
            ...dataWithCount,
            lastPage, currentPage, from, perPage, to
        };
    }

    /**
     * Returns limit, page and offset.
     * @param {*} limit 
     * @param {*} page 
     */
    refineFilters = (filter) => {
        const limit = parseInt(filter.limit) || 10;
        const page = parseInt(filter.page) || 1;
        const offset = limit * (page - 1);
        const where = filter.where || {};
        const include = filter.include || [];

        return { limit, page, offset, where, include };
    }
}

module.exports = Service;
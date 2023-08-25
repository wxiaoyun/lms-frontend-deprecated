/**
 * CollectionQuery
 * @property offset - the offset
 * @property limit - the limit
 * @property sortBy - the sortBy
 * @property order - the order
 * @property filters - the filters, an object of key-value pairs. The key is the field name and the value is the value to filter by.
 */
export class Query implements CollectionQuery {
	offset: number;
	limit: number;
	sortBy: string;
	order: string;
	filters: Filters;

	constructor({
		offset = 0,
		limit = 10,
		sortBy = "id",
		order = "asc",
		filters = {},
	}: CollectionQuery) {
		this.offset = offset;
		this.limit = limit;
		this.sortBy = sortBy;
		this.order = order;
		this.filters = filters;
	}

	// @Override
	toString() {
		let query = `offset=${this.offset}&limit=${this.limit}&sortBy=${this.sortBy}&order=${this.order}`;

		for (const [key, value] of Object.entries(this.filters)) {
			if (!Array.isArray(value)) {
				query += `&filter[${key}]=${value}`;
				continue;
			}

			if (value.length === 0) {
				continue;
			}

			query += `&filter[${key}]=${value.join(",")}`;
		}

		return query;
	}
}

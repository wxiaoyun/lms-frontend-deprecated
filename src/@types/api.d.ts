/**
 * ApiMessage is the message returned by the backend
 * @property message - the message
 * @property code - the code
 */
interface ApiMessage {
	message: string;
	code: BackendCode;
}

/**
 * BackendCode is the code returned by the backend
 * @property 0 - silent
 * @property 1 - success
 * @property 2 - error
 * @property 3 - warning
 * @property 4 - info
 */
type BackendCode = 0 | 1 | 2 | 3 | 4;

/**
 * Meta is the meta object returned by the backend
 * @property total_count - the total count
 * @property filtered_count - the filtered count
 */
interface Meta {
	total_count: number;
	filtered_count: number;
}

/**
 * Payload is the payload object returned by the backend
 * @property data - the data
 * @property meta - the meta
 * @property messages - the messages
 * @property error - the error
 * @template T - The type of Data of the payload. Defaults to object.
 * @template M - The type of Meta of the payload. Defaults to undefined.
 */
interface Payload<T = object, M = undefined> {
	data: T;
	meta: M;
	messages: ApiMessage[];
	error: string | undefined;
}

/**
 * CollectionQuery is the query object used to query collections
 * @property offset - the offset
 * @property limit - the limit
 * @property sortBy - the sortBy
 * @property order - the order
 * @property filters - the filters, an object of key-value pairs. The key is the field name and the value is the value to filter by.
 */
interface CollectionQuery {
	offset: number;
	limit: number;
	sortBy: string;
	order: string;
	filters: Filters;
}

type Filters = Record<string, string | string[] | number | number[] | boolean>;

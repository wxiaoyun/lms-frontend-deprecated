import { expect, test } from "vitest";
import { Query } from "./collectionquery";

test("CollectionQuery To String: Testing array", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {
			foo: "bar",
			baz: ["qux", "quux"],
			corge: [1, 2, 3],
		},
	});

	expect(cq.toString()).toBe(
		"offset=0&limit=10&sortBy=name&order=asc&filter[foo]=bar&filter[baz]=qux,quux&filter[corge]=1,2,3",
	);
});

test("CollectionQuery To String: Testing empty array", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {
			foo: [],
		},
	});

	expect(cq.toString()).toBe("offset=0&limit=10&sortBy=name&order=asc");
});

test("CollectionQuery To String: Testing empty object", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {},
	});

	expect(cq.toString()).toBe("offset=0&limit=10&sortBy=name&order=asc");
});

test("CollectionQuery To String: Testing numbers", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {
			foo: 1,
			bar: 2,
		},
	});

	expect(cq.toString()).toBe(
		"offset=0&limit=10&sortBy=name&order=asc&filter[foo]=1&filter[bar]=2",
	);
});

test("CollectionQuery To String: Testing booleans", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {
			foo: true,
			bar: false,
		},
	});

	expect(cq.toString()).toBe(
		"offset=0&limit=10&sortBy=name&order=asc&filter[foo]=true&filter[bar]=false",
	);
});

test("CollectionQuery To String: Testing everything", () => {
	const cq = new Query({
		offset: 0,
		limit: 10,
		sortBy: "name",
		order: "asc",
		filters: {
			foo: "bar",
			baz: ["qux", "quux"],
			corge: [],
			grault: 1,
			garply: 2,
			waldo: true,
			fred: false,
		},
	});

	expect(cq.toString()).toBe(
		"offset=0&limit=10&sortBy=name&order=asc&filter[foo]=bar&filter[baz]=qux,quux&filter[grault]=1&filter[garply]=2&filter[waldo]=true&filter[fred]=false",
	);
});

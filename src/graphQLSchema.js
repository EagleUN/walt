import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';


import {
	anaMutations,
	anaQueries,
	anaTypeDef,
} from './ana/typeDefs';

import anaResolvers from './ana/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		anaTypeDef
	],
	[
		anaQueries
	],
	[
		anaMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		//coursesResolvers,
		anaResolvers
	)
});

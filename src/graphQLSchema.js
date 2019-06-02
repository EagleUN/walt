import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {	
	feedTypeDef,
	feedQueries
} from './moana/typeDefs';

import {
	anaMutations,
	anaQueries,
	anaTypeDef,
} from './ana/typeDefs';

import anaResolvers from './ana/resolvers';
import feedResolvers from './moana/resolvers';


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		anaTypeDef,
		feedTypeDef
	],
	[
		anaQueries,
		feedQueries
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
		feedResolvers,
		anaResolvers
	)
});

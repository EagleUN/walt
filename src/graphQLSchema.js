import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';


import {
	commonTypeDef
} from './common/typeDefs';

import {
	anaMutations,
	anaQueries,
	anaTypeDef,
} from './ana/typeDefs';

import {
	postsMutations,
	postsQueries,
	postsTypeDef
} from './merida/typeDefs';

import {	
	feedTypeDef,
	feedQueries
} from './moana/typeDefs';

import anaResolvers from './ana/resolvers';
import feedResolvers from './moana/resolvers';
import postsResolvers from './merida/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commonTypeDef,
		anaTypeDef,
		feedTypeDef,
		postsTypeDef
	],
	[
		anaQueries,
		feedQueries,
		postsQueries
	],
	[
		anaMutations,
		postsMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		feedResolvers,
		anaResolvers,
		postsResolvers
	)
});

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
	feedTypeDef,
	feedQueries
} from './moana/typeDefs';

import {
	mulanMutations,
	mulanQueries,
	mulanTypeDef
} from './mulan/typeDefs';

import {
	postsMutations,
	postsQueries,
	postsTypeDef
} from './merida/typeDefs';

import {
	vanellopeMutations,
	vanellopeQueries,
	vanellopeTypeDef
} from './vanellope/typeDefs';


import anaResolvers from './ana/resolvers';
import feedResolvers from './moana/resolvers';
import postsResolvers from './merida/resolvers';
import mulanResolvers from './mulan/resolvers';
import vanellopeResolvers from './vanellope/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commonTypeDef,
		anaTypeDef,
		feedTypeDef,
		mulanTypeDef,
		postsTypeDef,
		vanellopeTypeDef
	],
	[
		anaQueries,
		feedQueries,
		mulanQueries,
		postsQueries,
		vanellopeQueries
	],
	[
		anaMutations,
		mulanMutations,
		postsMutations,
		vanellopeMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		feedResolvers,
		anaResolvers,
		postsResolvers,
		mulanResolvers,
		vanellopeResolvers
	)
});

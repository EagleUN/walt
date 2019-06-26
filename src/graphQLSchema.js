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
	notificationMutations,
	notificationQueries,
	notificationTypeDef
} from './rapunzel/typeDefs';

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

import {
	jazminTypeDef,
	jazminQueries
} from './jazmin/typeDefs';

import anaResolvers from './ana/resolvers';
import feedResolvers from './moana/resolvers';
import postsResolvers from './merida/resolvers';
import mulanResolvers from './mulan/resolvers';
import vanellopeResolvers from './vanellope/resolvers';
import notificationResolvers from './rapunzel/resolvers';
import jazminResolvers from './jazmin/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commonTypeDef,
		anaTypeDef,
		feedTypeDef,
		mulanTypeDef,
		postsTypeDef,
		vanellopeTypeDef,
		notificationTypeDef,
		jazminTypeDef
	],
	[
		anaQueries,
		feedQueries,
		mulanQueries,
		postsQueries,
		vanellopeQueries,
		notificationQueries,
		jazminQueries
	],
	[
		anaMutations,
		mulanMutations,
		postsMutations,
		vanellopeMutations,
		notificationMutations
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
		vanellopeResolvers,
		notificationResolvers,
		jazminResolvers
	)
});

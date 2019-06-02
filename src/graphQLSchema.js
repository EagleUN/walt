import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	vanellopeMutations,
	vanellopeQueries,
	vanellopeTypeDef
} from './vanellope/typeDefs';

import vanellopeResolvers from './vanellope/resolvers';
/*
import {
	meridaMutations,
	meridaQueries,
	meridaTypeDef
} from './merida/typeDefs';

import meridaResolvers from './merida/resolvers';

import {
	moanaMutations,
	moanaQueries,
	moanaTypeDef
} from './moana/typeDefs';

import moanaResolvers from './moana/resolvers';

import {
	anaMutations,
	anaQueries,
	anaTypeDef
} from './ana/typeDefs';

import anaResolvers from './ana/resolvers';

import {
	rapunzelMutations,
	rapunzelQueries,
	rapunzelTypeDef
} from './rapunzel/typeDefs';

import rapunzelResolvers from './rapunzel/resolvers';

import {
	mulanMutations,
	mulanQueries,
	mulanTypeDef
} from './mulan/typeDefs';

import mulanResolvers from './mulan/resolvers';
*/
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		vanellopeTypeDef
		/*meridaTypeDef
		moanaTypeDef
		anaTypeDef
		rapunzelTypeDef
		mulanTypeDef*/
	],
	[
		vanellopeQueries
		/*meridaQueries
		moanaQueries
		anaQueries
		rapunzelQueries
		mulanQueries*/
	],
	[
		vanellopeMutations
		/*meridaMutations
		moanaMutations
		anaMutations
		rapunzelMutations
		mulanMutations*/
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		vanellopeResolvers
		/*meridaResolvers
		moanaResolvers
		anaResolvers
		rapunzelResolvers
		mulanResolvers*/
	)
});

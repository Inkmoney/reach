import { createSlice } from "@reduxjs/toolkit";

export interface CharacterState {
	name: string;
	alias: string;
	abilities: string;
	firstAppearance: string;
	createdBy: string;
	teamAffiliations: string;
	species: string;
	universe: string;
	comicBooks: string;
}

const initialState: CharacterState = {
	name: "",
	alias: "",
	abilities: "",
	firstAppearance: "",
	createdBy: "",
	teamAffiliations: "",
	species: "",
	universe: "",
	comicBooks: "",
};

const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {
		chooseName: (state, action) => {
			state.name = action.payload;
		},
		chooseAlias: (state, action) => {
			state.alias = action.payload;
		},
		chooseAbilities: (state, action) => {
			state.abilities = action.payload;
		},
		chooseFirstAppearance: (state, action) => {
			state.firstAppearance = action.payload;
		},
		chooseCreatedBy: (state, action) => {
			state.createdBy = action.payload;
		},
		chooseTeamAffiliations: (state, action) => {
			state.teamAffiliations = action.payload;
		},
		chooseSpecies: (state, action) => {
			state.species = action.payload;
		},
		chooseUniverse: (state, action) => {
			state.universe = action.payload;
		},
		chooseComicBooks: (state, action) => {
			state.comicBooks = action.payload;
		},
	},
});

//Export Reducer
export const reducer = characterSlice.reducer;
export const {
	chooseName,
	chooseAlias,
	chooseAbilities,
	chooseFirstAppearance,
	chooseCreatedBy,
	chooseTeamAffiliations,
	chooseSpecies,
	chooseUniverse,
	chooseComicBooks,
} = characterSlice.actions;

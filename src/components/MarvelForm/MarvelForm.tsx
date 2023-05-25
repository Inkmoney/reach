import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import {
	chooseName,
	chooseAlias,
	chooseAbilities,
	chooseFirstAppearance,
	chooseCreatedBy,
	chooseTeamAffiliations,
	chooseSpecies,
	chooseUniverse,
	chooseComicBooks,
	CharacterState,
} from "../../redux/slices/rootSlice";
import { Button } from "@mui/material";
import { Input } from "../sharedComponents/Input";
import { serverCalls } from "../../api";

interface CharacterFormProps {
	id?: string;
	closeModal: () => void;
	data?: {};
}

export const CharacterForm = (props: CharacterFormProps) => {
	const dispatch = useDispatch();
	const store = useStore();
	const name = useSelector<CharacterState>((state) => state.name);
	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data: any, event: any) => {
		if (props.id!) {
			await serverCalls.update(props.id!, data);
			event.target.reset();
		} else {
			dispatch(chooseName(data.name));
			dispatch(chooseAlias(data.alias));
			dispatch(chooseAbilities(data.abilities));
			dispatch(chooseFirstAppearance(data.first_appearance));
			dispatch(chooseCreatedBy(data.created_by));
			dispatch(chooseTeamAffiliations(data.team_affiliations));
			dispatch(chooseSpecies(data.species));
			dispatch(chooseUniverse(data.universe));
			dispatch(chooseComicBooks(data.comic_books));
			await serverCalls.create(store.getState());
		}
		props.closeModal();
		window.location.reload();
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Character Name</label>
				<Input {...register("name")} name="name" placeholder="Name"/>
				<div>
					<label htmlFor="alias">Alias</label>
					<Input
						{...register("alias")}
						name="alias"
						placeholder="Alias"
					/>
				</div>
				<div>
					<label htmlFor="abilities">Abilities</label>
					<Input
						{...register("abilities")}
						name="abilities"
						placeholder="Abilities"
					/>
				</div>
				<div>
					<label htmlFor="first_appearance">First Appearance</label>
					<Input
						{...register("first_appearance")}
						name="first_appearance"
						placeholder="First Appearance"
					/>
				</div>
				<div>
					<label htmlFor="created_by">Created By</label>
					<Input
						{...register("created_by")}
						name="created_by"
						placeholder="Created By"
					/>
				</div>
				<div>
					<label htmlFor="team_affiliations">Team Affiliations</label>
					<Input
						{...register("team_affiliations")}
						name="team_affiliations"
						placeholder="Team Affiliations"
					/>
				</div>
				<div>
					<label htmlFor="species">Species</label>
					<Input
						{...register("species")}
						name="species"
						placeholder="Species"
					/>
				</div>
				<div>
					<label htmlFor="universe">Universe</label>
					<Input
						{...register("universe")}
						name="universe"
						placeholder="Universe"
					/>
				</div>
				<div>
					<label htmlFor="comic_books">Comic Books</label>
					<Input
						{...register("comic_books")}
						name="comic_books"
						placeholder="Comic Books"
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

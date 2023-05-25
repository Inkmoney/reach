import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { CharacterForm } from "../MarvelForm";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 90 },
	{
		field: "name",
		headerName: "Name",
		width: 110,
		editable: true,
	},
	{
		field: "alias",
		headerName: "Alias",
		width: 150,
		editable: true,
	},
	{
		field: "abilities",
		headerName: "Abilities",
		width: 210,
		editable: true,
	},
	{
		field: "first_appearance",
		headerName: "First Appearance",
		width: 150,
		editable: true,
	},
	{
		field: "created_by",
		headerName: "Created By",
		width: 150,
		editable: true,
	},
	{
		field: "team_affiliations",
		headerName: "Team Affiliations",
		width: 200,
		editable: true,
	},
	{
		field: "species",
		headerName: "Species",
		width: 130,
		editable: true,
	},
	{
		field: "universe",
		headerName: "Universe",
		width: 130,
		editable: true,
	},
	{
		field: "comic_books",
		headerName: "Comic Books",
		width: 130,
		editable: true,
	},
];

// interface gridData {
// 	data: {
// 		id?: string;
// 	};
// }

export const DataTable = () => {
	let { charactersData , getData } = useGetData();
	let [open, setOpen] = useState(false);
	let [gridData, setData] = useState<GridRowSelectionModel>([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteData = () => {
		serverCalls.delete(`${gridData[0]}`);
		getData();
	};

	console.log(gridData); // list of ids' from checked rows
	//conditionally render data table
	// if we have an authenticated user
	const MyAuth = localStorage.getItem("myAuth");
	console.log(MyAuth);

	if (MyAuth === "true") {
		return (
			<Box sx={{ height: 400, width: "100%" }}>
				<h2>Marvel Characters</h2>
				<DataGrid
					rows={charactersData}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					checkboxSelection
					onRowSelectionModelChange={(newSelectionModel) => {
						setData(newSelectionModel);
					}}
					{...charactersData}
				/>
				<Button onClick={handleOpen}>Update</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={deleteData}
				>
					Delete
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Update a Character
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Character id: {gridData[0]}
						</DialogContentText>
						<CharacterForm
							closeModal={handleClose}
							id={`${gridData[0]}`}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		);
	} else {
		return (
			//does not render datatable if user isnt authenticated
			<div>
				<h3>Please Sign In To View Your Collection</h3>
			</div>
		);
	}
};

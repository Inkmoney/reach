import { db } from "../firebase";
import {
	collection,
	query,
	doc,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

export const serverCalls = {
	get: async () => {
		const q = query(collection(db, "characters"));
		const querySnapshot = await getDocs(q);
		let charactersArray: any = [];
		querySnapshot.forEach((doc) => {
		
			charactersArray.push({ ...doc.data().data, id: doc.id });
		});
        return charactersArray;
	},

	create: async (data: any) => {
		const response = await addDoc(collection(db, "characters"), {
			data,
			completed: false,
		});
		// console.log( response);

		return response;
	},

	update: async (id: string, data: {}) => {

		const response = await updateDoc(doc(db, "characters", id), { data });

		console.log(response);
	},

	delete: async (id: string) => {
		const response = await deleteDoc(doc(db, "characters", id));
		console.log(response);
	},
};

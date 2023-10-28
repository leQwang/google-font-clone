import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
	GetStaticPropsContext,
} from "next";

type FontItem = {
	family: string;
	variants: string[];
	subsets: string[];
	version: string;
	lastModified: string;
	files: Record<string, string>;	
	category: string;
	kind: string;
	menu: string;
};

type FontItemList = {
	fontsList: FontItem[];
};

export const getStaticPaths: GetStaticPaths = async () => {
	console.log("\nGET STATIC PATH");
	const res = await fetch(
		"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4"
	);
	const data = await res.json();

	return {
		// paths: [
		//   { params: { fontFamily: "ABeeZee" } },
		//   { params: { fontFamily: "Abel" } },
		//   { params: { fontFamily: "Abhaya Libre" } },
		//   { params: { fontFamily: "Abril Fatface" } },
		// ],
		paths: data.items.map((fontItem: FontItem) => ({
			params: { fontFamily: fontItem.family },
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<FontItemList> = async (
	context: GetStaticPropsContext
) => {
	// console.log("\nGET STATIC PROPS", context.params?.fontFamily)
	const family = context.params?.fontFamily;

	const res = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4&family=${family}`
	);
	const data = await res.json();
	return {
		props: {
			fontsList: data.items,
		},
	};
};

// async function loadFont(
// 	fontName: string,
// 	setFontName: (name: string) => void
// ): Promise<void> {
// 	const link = document.createElement("link");
// 	link.rel = "stylesheet";
// 	link.href = `https://fonts.googleapis.com/css?family=${fontName}`;
// 	document.head.appendChild(link);

// 	return new Promise<void>((resolve) => {
// 		link.onload = () => {
// 			setFontName(fontName);
// 			resolve();
// 		};
// 	});
// }

// export interface FontProps {}

export default function Font(fontFamily: FontItemList) {
	// const [fontName, setFontName] = useState(''); // Initialize with an empty string

	// useEffect(() => {
	//   const fontToLoad = fontFamily.fontsList[0]?.family;

	//   async function initializeFont() {
	//     await loadFont(fontToLoad, setFontName);
	//   }

	//   initializeFont();
	// }, []);
	return (
		<div>
			<Helmet>
				{/* Helmet adds the following to the head tag of index.html, add the neccesary link tag for each google fonts*/}
				<link
					href={`https://fonts.googleapis.com/css?family=${fontFamily.fontsList[0]?.family}`}
					rel="stylesheet"
				></link>
			</Helmet>
			<div className="text-3xl font-bold">
				The current font is {fontFamily.fontsList[0]?.family}
			</div>
			<div
				className="text-3xl "
				style={{ fontFamily: fontFamily.fontsList[0]?.family }}
			>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
				magni voluptatibus quasi quo temporibus vero laborum dolores.
				Repudiandae non labore delectus asperiores, et voluptate laboriosam modi
				tempore alias commodi recusandae.
			</div>
			{fontFamily.fontsList[0]?.variants.map((variant) => (
				<div key={variant}>{variant}</div>
			))}
		</div>
	);
}

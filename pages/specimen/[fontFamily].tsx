// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";

// import type {
// 	InferGetStaticPropsType,
// 	GetStaticProps,
// 	GetStaticPaths,
// 	GetStaticPropsContext,
// } from "next";

// type FontItem = {
// 	family: string;
// 	variants: string[];
// 	subsets: string[];
// 	version: string;
// 	lastModified: string;
// 	files: Record<string, string>;
// 	category: string;
// 	kind: string;
// 	menu: string;
// };

// type FontItemList = {
// 	fontsList: FontItem[];
// };

// export const getStaticPaths: GetStaticPaths = async () => {
// 	console.log("\nGET STATIC PATH");
// 	const res = await fetch(
// 		"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4"
// 	);
// 	const data = await res.json();

// 	return {
// 		paths: data.items.map((fontItem: FontItem) => ({
// 			params: { fontFamily: fontItem.family },
// 		})),
// 		fallback: false,
// 	};
// };

// export const getStaticProps: GetStaticProps<FontItemList> = async (
// 	context: GetStaticPropsContext
// ) => {
// 	// console.log("\nGET STATIC PROPS", context.params?.fontFamily)
// 	const family = String(context.params?.fontFamily);

// 	const res = await fetch(
// 		`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4&family=${concatAndReplaceSpace(
// 			family
// 		)}`
// 	);
// 	const data = await res.json();
// 	return {
// 		props: {
// 			fontsList: data.items,
// 		},
// 	};
// };

// function concatAndReplaceSpace(inputString: string) {
// 	let modifiedString = inputString.replace(/ /g, "%20");
// 	return modifiedString;
// }

// export default function Font(fontFamily: FontItemList) {
// 	const fontData = fontFamily.fontsList[0];
// 	const sampleText = "Hello New Font";

// 	const fontFiles = fontData.files;

// 	// Create an array of font faces for each variant
// 	const fontFaces = Object.entries(fontFiles).map(([variant, fontUrl]) => {
// 		return (
// 			<style
// 				key={variant}
// 				dangerouslySetInnerHTML={{
// 					__html: `
// 				@font-face {
// 				  font-family: '${fontData.family}';
// 				  src: url('${fontUrl}') format('truetype');
// 				  font-weight: ${variant === "regular" ? "normal" : variant};
// 				  font-style: ${variant.includes("italic") ? "italic" : "normal"};
// 				}
// 			  `,
// 				}}
// 			/>
// 		);
// 	});

// 	//------------------------------- This works somehow but remember "/path-to-your-font.woff2" is not a real path"
// 	useEffect(() => {
// 		const fontUrl = "/path-to-your-font.woff2"; // Replace with the actual font URL
// 		const fontFamily = "YourFontFamily"; // Replace with your font family name

// 		const fontFaces = `
// 		  @font-face {
// 			font-family: '${fontFamily}';
// 			src: url('${fontUrl}') format('woff2');
// 			font-weight: normal;
// 			font-style: normal;
// 		  }
// 		`;

// 		const style = document.createElement("style");
// 		style.innerHTML = fontFaces;
// 		document.head.appendChild(style);

// 		return () => {
// 			document.head.removeChild(style);
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<style>{fontFaces}</style>

// 			<div className="text-3xl font-bold">
// 				The current font is {fontData.family}
// 			</div>
// 			{fontData.variants.map((variant) => (
// 				<div
// 					key={variant}
// 					style={{
// 						fontFamily: fontData.family,
// 						fontWeight: variant,
// 						fontStyle: variant.includes("italic") ? "italic" : "normal",
// 						fontSize: "24px",
// 					}}
// 				>
// 					{sampleText}
// 				</div>
// 			))}
// 		</div>
// 	);
// }

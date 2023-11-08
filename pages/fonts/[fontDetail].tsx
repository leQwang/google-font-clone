import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

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

const FontDetail = () => {
	const router = useRouter();
	const searchParams = useSearchParams()
	
	const { fontDetail, size } = router.query;
	console.log(size)
	

	const sampleText = "Hello New Font";
	const [fontData, setFontData] = useState<FontItem|null>(null);

	useEffect(() => {
		const apiKey = "AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4"; // Replace with your actual API key
		const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&family=${fontDetail}`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setFontData(data.items[0]);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [fontDetail]);



	if (fontData === null) {
		return null; // Handle the case where fontData is null
	}

	const fontFiles = fontData.files;

	// Create an array of font faces for each variant
	const fontFaces = Object.entries(fontFiles).map(([variant, fontUrl]) => {
		return (
			<style
				key={variant}
				dangerouslySetInnerHTML={{
					__html: `
				@font-face {
				  font-family: '${fontData.family}';
				  src: url('${fontUrl}') format('truetype');
				  font-weight: ${variant === "regular" ? "normal" : variant};
				  font-style: ${variant.includes("italic") ? "italic" : "normal"};
				}
			  `,
				}}
			/>
		);
	});

	// useEffect(() => {
	// 	const fontUrl = "/path-to-your-font.woff2"; // Replace with the actual font URL
	// 	const fontFamily = "YourFontFamily"; // Replace with your font family name

	// 	const fontFaces = `
	// 	  @font-face {
	// 		font-family: '${fontFamily}';
	// 		src: url('${fontUrl}') format('woff2');
	// 		font-weight: normal;
	// 		font-style: normal;
	// 	  }
	// 	`;

	// 	const style = document.createElement("style");
	// 	style.innerHTML = fontFaces;
	// 	document.head.appendChild(style);

	// 	return () => {
	// 		document.head.removeChild(style);
	// 	};
	// }, []);

	return (
		<div>
			<style>{fontFaces}</style>

			<div className={`text-[${size}px] font-bold`}>
				The current font is {fontData.family}
			</div>
			{fontData.variants.map((variant:any) => (
				<div
					key={variant}
					style={{
						fontFamily: fontData.family,
						fontWeight: variant,
						fontStyle: variant.includes("italic") ? "italic" : "normal",
						fontSize: "24px",
					}}
				>
					{sampleText}
				</div>
			))}
		</div>
	);
};

export default FontDetail;

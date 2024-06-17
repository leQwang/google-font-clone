import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

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

const FontDetail = (props: any) => {
	const { setSearch, sort, handleSort } = props;
	const router = useRouter();
	const searchParams = useSearchParams();
	const querySize = searchParams.get("size") as string | number;
	const { fontDetail } = router.query;
	const defaultSampleText: string =
		"Whereas disregard and contempt for human rights have resulted";

	const [sampleText, setSampleText] = useState<string>(
		"Whereas disregard and contempt for human rights have resulted"
	);
	const [typingText, setTypingText] = useState<string>("");
	const [fontData, setFontData] = useState<FontItem | null>(null);
	const [sliderValue, setSliderValue] = useState(querySize ? querySize : 40);
	const fontSizeList = [8, 12, 14, 20, 24, 32, 40, 64, 96, 120, 184, 280];

	const handleSliderChange = (event: any) => {
		setSliderValue(event.target.value);
	};

	useEffect(() => {
		const apiKey = "AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4";
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

	// Handle the case where fontData is null
	if (fontData === null) {
		return null;
	}

	// Create an array of font faces for each variant
	const fontFiles = fontData.files;
	const fontFaces = Object.entries(fontFiles).map(([variant, fontUrl]) => {
		return (
			<style
				key={variant}
				dangerouslySetInnerHTML={{
					__html: `
				@font-face {
				  font-family: '${fontData.family}';
				  src: url('${fontUrl}');
				  font-weight: ${variant};
				  font-style: ${""};
				}
			  `,
				}}
			/>
		);
	});

	function justNumbers(variant: string) {
		let numsStr = variant.replace(/[^0-9]/g, "");
		return parseInt(numsStr);
	}

	const displayVariant =
		fontData.variants.length > 2
			? fontData.variants
					.filter((variant) => variant !== "regular" && variant !== "italic")
					.map((variant: any) => (
						<div id={variant} key={variant}>
							<div>{variant}</div>
							<div
								style={{
									fontFamily: fontData.family,
									fontWeight: justNumbers(variant),
									fontStyle: variant.includes("italic") ? "italic" : "",
									fontSize: "24px",
								}}
							>
								{sampleText}
							</div>
						</div>
					))
			: fontData.variants.map((variant: any) => (
					<div id={variant} key={variant}>
						<div>{variant}</div>
						<div
							style={{
								fontFamily: fontData.family,
								fontWeight: justNumbers(variant),
								fontStyle: variant.includes("italic") ? "italic" : "",
								fontSize: "24px",
							}}
						>
							{sampleText}
						</div>
					</div>
			  ));

	const handleSampleText = (e: any) => {
		setSampleText(e.target.value);
	};

	console.log(sampleText, sampleText != "" && sampleText != defaultSampleText)

	return (
		<div className="flex flex-col mx-2">
			{/* <SearchBar setSearch={setSearch} sort={sort} handleSort={handleSort} /> */}
			<style>{fontFaces}</style>

			<div className="flex flex-col mb-5">
				<div className="text-5xl font-semibold mb-4">{fontData.family}</div>
				<div className="text-gray-500">Designed by ...</div>
			</div>

			{/* style={{ fontSize: String(querySize+"px") }} */}
			<div
				className="flex justify-center items-center font-bold h-64 lg:px-40 md:px-20 px-10 sample-text-wrap text-[30px] sm:text-[40px]"
				style={{
					fontFamily: fontData.family,
					textAlign: "center",
				}}
			>
				{defaultSampleText}
			</div>
			<div>
				<div className="mb-5 text-3xl ">Styles</div>
				<div className="flex flex-col sm:flex-row items-center">
					{/* <div className="rounded-full px-2 mx-5 flex flex-grow items-center border border-black">
						type to preview
					</div> */}
					<form className="previewText w-full mx-5">
						<input
							required
							type="text"
							placeholder="Type to preview"
							className={`previewText w-full ${
								sampleText != "" && sampleText != defaultSampleText
									? "previewTextClick"
									: "previewTextNone"
							} `}
							onChange={handleSampleText}
						/>
					</form>
					<div className="flex md:w-[30%]">
						<select
							className="overflow-y-scroll hover:bg-slate-200 rounded-md"
							defaultValue="40"
							value={sliderValue}
							name="fontSizeSelect"
							id="fontSizeSelect"
							onChange={(e) => {
								setSliderValue(e.target.value);
							}}
						>
							<option className="hidden" value={sliderValue}>
								{sliderValue}
							</option>
							{fontSizeList.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
						<div className="ml-2">
							<input
								className="cursor-pointer w-60 md:w-auto"
								type="range"
								min="12"
								max="300"
								value={sliderValue}
								onChange={handleSliderChange} // Use the onChange event handler
							/>
							<p></p>
						</div>
					</div>
				</div>
			</div>
			{fontData.variants.length > 2
				? fontData.variants
						.filter((variant) => variant !== "regular" && variant !== "italic")
						.map((variant: any) => (
							<div id={variant} key={variant}>
								<div>{variant}</div>
								<div
									className="sample-text"
									style={{
										fontFamily: fontData.family,
										fontWeight: justNumbers(variant),
										fontStyle: variant.includes("italic") ? "italic" : "",
										fontSize: sliderValue + "px",
									}}
								>
									{sampleText==""?defaultSampleText:sampleText}
								</div>
							</div>
						))
				: fontData.variants.map((variant: any) => (
						<div id={variant} key={variant}>
							<div>{variant}</div>
							<div
								className="sample-text"
								style={{
									fontFamily: fontData.family,
									fontWeight: justNumbers(variant),
									fontStyle: variant.includes("italic") ? "italic" : "",
									fontSize: sliderValue + "px",
								}}
							>
								{sampleText==""?defaultSampleText:sampleText}
							</div>
						</div>
				  ))}
		</div>
	);
};

export default FontDetail;

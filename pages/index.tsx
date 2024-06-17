import Image from "next/image";
import React, { useState, useEffect, createContext, useRef, use } from "react";
import GoogleFontIcon from "../public/GoogleFontIcon.png";
import { useRouter } from "next/router";
import FontCard from "../components/FontCard";
import Aside from "../components/Aside";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

// Define type -------------------------------------------------------------------
export type FontItem = {
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

export type FontItemList = {
	fontsList: FontItem[];
};

// Define Context --------------------------------------------------------

export const FontContext = createContext<FontItemList | null>(null);

// Get Static Props API ----------------------------------------------

// fetch new data from sort----------------------------------------------------

const sortOptions: Record<string, string> = {
	trending: "",
	popularity: "popularity",
	alpha: "alpha",
	date: "date",
};

const deleteParams = (url: string, router: any): string => {
	const currentURL = router.asPath;
	console.log(currentURL);
	const updateURL = new URL(currentURL, "http://localhost:3000");
	updateURL.searchParams.delete(url);
	return updateURL.toString();
};

const apiKey = "AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4";
const baseUrl = "https://www.googleapis.com/webfonts/v1/webfonts";

const getFontDataUrl = (sortOption: string): string => {
	const sortParam = sortOptions[sortOption];
	const url = new URL(baseUrl);
	url.searchParams.set("key", apiKey);

	if (sortParam) {
		url.searchParams.set("sort", sortParam);
	}

	return url.toString();
};

//   Home function component ----------------------------------------------------

export default function Home() {
	const router = useRouter();
	const routerPath = router.asPath;
	const searchParams = useSearchParams();
	const defaultSampleText: string =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex tempora explicabo facilis dolore incidunt animi odit quis sed, aliquam vero, voluptates impedit illo quia veritatis minus libero. Expedita, dolorum.";

	const [sort, setSort] = useState<string>("");
	const [fontItemList, setFontItemList] = useState<FontItemList | null>(null); // Initialize fontItemList as null
	const [languageFontList, setLanguageFontList] = useState<any>(null); // Initialize fontItemList as null
	const [fixedFontList, setFixedFontList] = useState<any>(null); //can use useRef here

	const [numberOfFonts, setNumberOfFonts] = useState(20); // number of fonts to be displayed, initialise at 20

	//Font Card
	const [addFont, setAddFont] = useState([]);

	// Aside hooks
	const [isFiltered, setIsFiltered] = useState<boolean>(false);
	const [fontSize, setFontSize] = useState<number>(40);
	const [sampleText, setSampleText] = useState<string>(
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex tempora explicabo facilis dolore incidunt animi odit quis sed, aliquam vero, voluptates impedit illo quia veritatis minus libero. Expedita, dolorum."
	);
	const [search, setSearch] = useState<string>("");
	const [language, setLanguage] = useState<string>("");
	const [filterSelection, setFilterSelection] = useState<string[]>([]);

	// ------------------------------------ Load Page ----------------------------------------------------
	function getQueryParamValue(url: string, paramName: string) {
		const queryString = url.split("?")[1];

		if (queryString) {
			const params = new URLSearchParams(queryString);

			if (params.has(paramName)) {
				return params.get(paramName);
			}
		}

		return null;
	}
	useEffect(() => {
		console.log("routerPath", routerPath);

		const previewTextValue = getQueryParamValue(routerPath, "preview.text");
		const previewSizeValue = getQueryParamValue(routerPath, "preview.size");
		const queryValue = getQueryParamValue(routerPath, "query");
		const strokeValue = getQueryParamValue(routerPath, "stroke");
		const subsetValue = getQueryParamValue(routerPath, "subset");
		const sortValue = getQueryParamValue(routerPath, "sort");

		// console.log("preview.text:", previewTextValue);
		// console.log("preview.size:", previewSizeValue);
		// console.log("query:", queryValue);
		// console.log("stroke:", strokeValue);
		// console.log("subset:", subsetValue);
		// console.log("sort:", sortValue);

		if (previewTextValue) {
			setSampleText(previewTextValue);
		}
		if (previewSizeValue) {
			setFontSize(parseInt(previewSizeValue));
		}
		if (queryValue) {
			setSearch(queryValue);
		}
		if (strokeValue) {
			setFilterSelection([strokeValue]);
		}
		if (subsetValue) {
			setLanguage(subsetValue);
		}
		if (sortValue) {
			setSort(sortValue);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ------------------------------------ Fetch data ----------------------------------------------------

	useEffect(() => {
		// Fetch data when the component mounts or when the sorting option changes
		const fontDataUrl = getFontDataUrl(sort);

		fetch(fontDataUrl)
			.then((response) => response.json())
			.then((data) => {
				setFontItemList({ fontsList: data.items });
				setFixedFontList({ fontsList: data.items });
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [sort]);

	// ------------------------------------ Filter Query ----------------------------------------------------
	//https://fonts.google.com/?preview.text=aaaaa&preview.size=79&query=hhhh&stroke=Serif&subset=vietnamese&sort=popularity
	useEffect(() => {
		const queryParameters: any = {};

		// Check for sampleText and add it to the query parameters
		if (sampleText !== defaultSampleText && sampleText !== "") {
			queryParameters["preview.text"] = sampleText;
		}

		// Check for fontSize and add it to the query parameters
		if (fontSize != 40) {
			queryParameters["preview.size"] = fontSize;
		}

		if (search !== "") {
			queryParameters["query"] = search;
		}

		if (
			filterSelection.includes("Serif") ||
			filterSelection.includes("Sans+Serif") ||
			filterSelection.includes("Slab+Serif")
		) {
			if (filterSelection.includes("Serif")) {
				queryParameters["stroke"] = "Serif";
			} else if (filterSelection.includes("Sans+Serif")) {
				queryParameters["stroke"] = "Sans Serif";
			} else {
				queryParameters["stroke"] = "Slab Serif";
			}
		}

		if (language !== "") {
			queryParameters["subset"] = language;
		}

		if (sort !== "") {
			queryParameters["sort"] = sort;
		}

		if (Object.keys(queryParameters).length >= 0) {
			console.log("pushing", queryParameters);
			router.push({
				query: queryParameters,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterSelection, sampleText, fontSize, language, sort, search]);

	// ------------------------------------ Language ----------------------------------------------------
	const languageOptions = (language: string) => {
		if (fontItemList != null) {
			const filteredFonts = fixedFontList?.fontsList.filter(
				(fontItem: FontItem) => {
					return fontItem.subsets.includes(language);
				}
			);
			setFontItemList({ fontsList: filteredFonts });
			setLanguageFontList({ fontsList: filteredFonts });
		}
		if (language === "") {
			setFontItemList(fixedFontList);
		}
	}
	useEffect(() => {
		languageOptions(language)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language, fixedFontList]);

	// ------------------------------------ Categories ----------------------------------------------------
	useEffect(() => {
		let tempStroke = "";
		// if(filterSelection.includes("Serif")||filterSelection.includes("Sans+Serif")||filterSelection.includes("Slab+Serif")){
		if (filterSelection.includes("Serif")) {
			tempStroke = "serif";
		} else if (filterSelection.includes("Sans+Serif")) {
			tempStroke = "sans-serif";
		} else if (filterSelection.includes("Slab+Serif")) {
			tempStroke = "slab-serif"; //for some reason the catery don't have slabs-serif
		}

		// if(filterSelection.includes("Display")){
		// 	tempStroke = "display";
		// }
		// if(filterSelection.includes("Handwriting")){
		// 	tempStroke = "handwriting";
		// }
		// if(filterSelection.includes("Monospace")){
		// 	tempStroke = "monospace";
		// }

		if (tempStroke != "") {
			const filteredFonts = languageFontList?.fontsList.filter(
				(fontItem: FontItem) => {
					return fontItem.category == tempStroke;
				}
			);
			setFontItemList({ fontsList: filteredFonts });
		}else{
			languageOptions(language);
		}
	}, [filterSelection]);

	// ------------------------------------ Search ----------------------------------------------------

	useEffect(() => {
		// redirect("http://localhost:3000/");
		if (fontItemList != null && search != "") {
			const filteredFonts = fontItemList?.fontsList.filter((fontItem) =>
				fontItem.family.toLowerCase().includes(search.toLowerCase())
			);
			setFontItemList({ ...fontItemList, fontsList: filteredFonts });
		} else if(language == "") {
			setFontItemList(fixedFontList);
		}else{
			languageOptions(language);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, fixedFontList]);

	// ------------------------------------ Sample Text ----------------------------------------------------

	//---------------------------------Sort----------------------------------------------

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedSortOption = e.target.value;
		setSort(selectedSortOption);
	};

	// ------------------------------------ Lazy loading scroll----------------------------------------------------

	const [visibleFonts, setVisibleFonts] = useState(numberOfFonts);
	const cardListRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleScroll() {
			const cardList = cardListRef.current;
			if (!cardList) return;

			if (
				cardList.scrollHeight - (cardList.scrollTop + cardList.clientHeight) <=
				100
			) {
				setVisibleFonts((prev) => prev + 20);
			}
		}

		const cardList = cardListRef.current;
		if (cardList) {
			cardList.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (cardList) {
				cardList.removeEventListener("scroll", handleScroll);
			}
		};
	}, [visibleFonts]);

	return (
		<>
			<main className="w-full flex-row flex justify-center">
				{/* --------- Aside ---------- */}
				<Aside
					isFiltered={isFiltered}
					setIsFiltered={setIsFiltered}
					sampleText={sampleText}
					setSampleText={setSampleText}
					language={language}
					setLanguage={setLanguage}
					filterSelection={filterSelection}
					setFilterSelection={setFilterSelection}
					fontSize={fontSize}
					setFontSize={setFontSize}
					fixedFontList={fixedFontList}
					setFixedFontList={setFixedFontList}
				/>

				<div className="w-full flex flex-col h-screen overflow-hidden transition-all duration-200">
					<div className="relative w-full flex flex-col justify-center flex-grow-1 px-2 sm:px-5 md:px-32 pt-5 bg-white">
						{/* --------- Search Bar ---------- */}
						<SearchBar
							sort={sort}
							setSearch={setSearch}
							handleSort={handleSort}
						/>

						{/* --------- Filter ---------- */}
						<div className="pt-5 mb-5">
							<button
								className={`border-2 rounded-full duration-300 ${
									isFiltered ? "button-filter" : "button-filter-close"
								}`}
								onClick={() => setIsFiltered(!isFiltered)}
							>
								<div className={`flex px-4 py-2 ${isFiltered ? "hidden" : ""}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											fill="#1B66C9"
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
										/>
									</svg>
									Filters
								</div>
								<div className={`px-4 py-2 ${isFiltered ? "flex" : "hidden"}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
									Close
								</div>
							</button>
							<div>
								{fontItemList?.fontsList.length} of{" "}
								{fixedFontList?.fontsList.length} families
							</div>
						</div>
					</div>

					{/* --------- Font Cards ---------- */}
					<div className="flex overflow-hidden lg:ml-24 ">
						<div
							className="relative grid grid-cols-1 w-full"
							id="myCardList"
							ref={cardListRef}
							style={{
								overflowY: "scroll",
								overflowX: "hidden",
								maxHeight: "80vh",
							}}
						>
							{fontItemList?.fontsList
								.slice(0, visibleFonts)
								.map((fontItem) => (
									<FontCard
										key={fontItem.family}
										fontItem={fontItem}
										sampleText={sampleText}
										fontSize={fontSize}
									/>
								))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

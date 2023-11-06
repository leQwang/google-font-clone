import Image from "next/image";
import React, { useState, useEffect, createContext } from "react";
import GoogleFontIcon from "../public/GoogleFontIcon.png";
import { useRouter } from "next/router";
import FontCard from "../components/FontCard";
import Aside from "../components/Aside";

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
// export const getStaticProps: GetStaticProps<FontItemList> = async () => {
// 	try {
// 		const res = await fetch(
// 			"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAE4f_rHRd2uqlo09qtr2f6DXVB1vNIvI4"
// 		);

// 		if (!res.ok) {
// 			throw new Error(
// 				`Font data request failed: ${res.status} - ${res.statusText}`
// 			);
// 		}

// 		const data = await res.json();

// 		return {
// 			props: {
// 				fontsList: data.items,
// 			},
// 		};
// 	} catch (error) {
// 		console.error("Error in getStaticProps:", error);

// 		return {
// 			props: {
// 				fontsList: [],
// 			},
// 		};
// 	}
// };

// export const getStaticProps: GetStaticProps<FontItem[]> = async () => {
// 	return {
// 		props: {
// 			"items": [
// 				{
// 					"family": "ABeeZee",
// 					"variants": [
// 						"regular",
// 						"italic"
// 					],
// 					"subsets": [
// 						"latin",
// 						"latin-ext"
// 					],
// 					"version": "v22",
// 					"lastModified": "2022-09-22",
// 					"files": {
// 						"regular": "http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
// 						"italic": "http://fonts.gstatic.com/s/abeezee/v22/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf"
// 					},
// 					"category": "sans-serif",
// 					"kind": "webfonts#webfont",
// 					"menu": "http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN2tOklQ.ttf"
// 				},
// 				{
// 					"family": "ADLaM Display",
// 					"variants": [
// 						"regular"
// 					],
// 					"subsets": [
// 						"adlam",
// 						"latin",
// 						"latin-ext"
// 					],
// 					"version": "v1",
// 					"lastModified": "2023-08-17",
// 					"files": {
// 						"regular": "http://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZECsHYkYBPY3o.ttf"
// 					},
// 					"category": "display",
// 					"kind": "webfonts#webfont",
// 					"menu": "http://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZEOsDSlQ.ttf"
// 				},
// 				{
// 					"family": "AR One Sans",
// 					"variants": [
// 						"regular",
// 						"500",
// 						"600",
// 						"700"
// 					],
// 					"subsets": [
// 						"latin",
// 						"latin-ext",
// 						"vietnamese"
// 					],
// 					"version": "v2",
// 					"lastModified": "2023-09-27",
// 					"files": {
// 						"500": "http://fonts.gstatic.com/s/aronesans/v2/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWk39DW03no5mBF4.ttf",
// 						"600": "http://fonts.gstatic.com/s/aronesans/v2/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWqH6DW03no5mBF4.ttf",
// 						"700": "http://fonts.gstatic.com/s/aronesans/v2/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWpj6DW03no5mBF4.ttf",
// 						"regular": "http://fonts.gstatic.com/s/aronesans/v2/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9DW03no5mBF4.ttf"
// 					},
// 					"category": "sans-serif",
// 					"kind": "webfonts#webfont",
// 					"menu": "http://fonts.gstatic.com/s/aronesans/v2/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9PWw9mg.ttf"
// 				},
// 				{
// 					"family": "Abel",
// 					"variants": [
// 						"regular"
// 					],
// 					"subsets": [
// 						"latin"
// 					],
// 					"version": "v18",
// 					"lastModified": "2022-09-22",
// 					"files": {
// 						"regular": "http://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf"
// 					},
// 					"category": "sans-serif",
// 					"kind": "webfonts#webfont",
// 					"menu": "http://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE2VlBOA.ttf"
// 				}
// 			]
// 		}
// 	}
// };

// fetch new data from sort----------------------------------------------------

const sortOptions: Record<string, string> = {
	trending: "",
	popularity: "popularity",
	alpha: "alpha",
	date: "date",
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

	const [sort, setSort] = useState<string>("");
	const [fontList, setFontList] = useState<FontItemList | null>(null); // Initialize fontList as null
	const [fixedFontList, setFixedFontList] = useState<FontItemList | null>(null);

	const [numberOfFonts, setNumberOfFonts] = useState(20); // number of fonts to be displayed, initialise at 20
	const [atBottom, setAtBottom] = useState(false); // state for if user has scrolled to bottom, used to render more fonts in
	const [atTop, setAtTop] = useState(true);

	// Aside hooks
	const [isFiltered, setIsFiltered] = useState<boolean>(false);
	const [fontSize, setFontSize] = useState<number>(50);
	const [sampleText, setSampleText] = useState<string>(
		"The quick brown fox jumps over the lazy dog"
	);
	const [debouncedSampleText, setDebouncedSampleText] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
	const [language, setLanguage] = useState<string>("");
	const [filterSelection, setFilterSelection] = useState<string[]>([]);

	useEffect(() => {
		// Fetch data when the component mounts or when the sorting option changes
		const fontDataUrl = getFontDataUrl(sort);

		fetch(fontDataUrl)
			.then((response) => response.json())
			.then((data) => {
				setFontList({ fontsList: data.items });
				setFixedFontList({ fontsList: data.items });
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [sort]);

	useEffect(() => {
		const debounceId = setTimeout(() => {
			setDebouncedSearchTerm(search);

			if (fontList && search != "") {
				const filteredFonts = fontList?.fontsList.filter((fontItem) =>
					fontItem.family.includes(search)
				);
				setFontList({ ...fontList, fontsList: filteredFonts });
			} else {
				setFontList(fixedFontList);
			}
		}, 1000);

		return () => {
			clearTimeout(debounceId);
		};
	}, [search, fontList, fixedFontList]);

	useEffect(() => {
		const debounceId = setTimeout(() => {
			setDebouncedSampleText(sampleText);
		}, 1000);

		return () => {
			clearTimeout(debounceId);
		};
	}, [sampleText]);

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedSortOption = e.target.value;
		setSort(selectedSortOption);
		if (e.target.value === "") {
			router.push("");
		} else {
			router.push(`/?sort=${selectedSortOption}`);
		}
	};

	//add event listener to scroll please see handleScroll function
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	//change states depending where the user has scrolled to
	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop + 2 >=
			document.documentElement.offsetHeight
		) {
			setAtBottom(true);
		}
		if (window.pageYOffset === 0) {
			setAtTop(true);
		} else {
			setAtTop(false);
		}
	}

	//if atBottom is true run increaseNoOfFonts function
	useEffect(() => {
		if (!atBottom) return;
		increaseNoOfFonts();
	}, [atBottom]);

	//increase the number of fonts and then set atBottom back to false
	const increaseNoOfFonts = () => {
		setNumberOfFonts((prevnum) => prevnum + 12);
		setAtBottom(false);
	};

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
					filterSelection={filterSelection}
					setFilterSelection={setFilterSelection}
				/>

				<div className="w-full flex flex-col h-screen  overflow-scroll">
					{/* --------- Search Bar ---------- */}
					<div className="relative w-full flex flex-col justify-center flex-grow-1 px-2 sm:px-5 md:px-32 pt-5 bg-white">
						<div className="w-full h-fit flex">
							<div className="flex basis-28 sm:basis-auto items-center justify-center mr-2 sm:mr-5">
								<Image src={GoogleFontIcon} alt="google icon" />
								<div className="hidden lg:block text-2xl">Google Font</div>
							</div>

							<div className="rounded-full px-2 flex flex-grow items-center bg-[#F3F7FC]">
								<div className="flex flex-grow items-center sm:mx-2 h-full sm:border-r-2">
									<div className="mx-2">
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
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
											/>
										</svg>
									</div>
									<input
										className="w-[50%] sm:flex-grow bg-[#F3F7FC] outline-none h-full rounded-xl"
										type="text"
										placeholder="Search Font"
										onChange={(e) => setSearch(e.target.value)}
									/>
								</div>

								<div className="relative hidden lg:flex flex-l-2 items-center rounded-md hover:bg-slate-300 p-1">
									Sort by:
									<select
										className="bg-transparent outline-none"
										value={sort}
										onChange={handleSort}
									>
										<option value="">Trending</option>
										<option value="popularity">Most Popular</option>
										<option value="date">Newest</option>
										<option value="alpha">Name</option>
									</select>
								</div>
							</div>

							<div className="flex items-center justify-center ml-2 sm:ml-5">
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
										d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
									/>
								</svg>
							</div>
						</div>

						{/* --------- Filter ---------- */}
						<div className="pt-5 mb-5">
							<button
								className={`border-2 rounded-full duration-200 ${
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
						</div>
					</div>

					{/* --------- Font Cards ---------- */}
					<div className="flex flex-col overflow-x-hidden" id="myCardList">
						{fontList?.fontsList.map((fontItem: FontItem) => (
							<FontCard
								key={fontItem.family}
								fontItem={fontItem}
								sampleText={sampleText}
								fontSize={fontSize}
							/>
						))}
					</div>
				</div>
			</main>
		</>
	);
}

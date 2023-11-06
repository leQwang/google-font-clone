import React, { useState, useRef, useEffect } from "react";
import AsideButton from "./AsideButton";

function Aside(props: any) {
	const {
		isFiltered,
		setIsFiltered,
		sampleText,
		setSampleText,
		language,
		setLanguage,
		filterSelection,
		setFilterSelection,
	} = props;

	const [openLanguage, setOpenLanguage] = useState<boolean>(true);
	const [openStroke, setOpenStroke] = useState<boolean>(true);
	const [openTechnology, setOpenTechnology] = useState<boolean>(true);
	const [openClassification, setOpenClassification] = useState<boolean>(true);

	// const openLanguage = useRef(null)
	// const openTechnology = useRef(null);

	// const toggleOpenTechnology = () => {
	// 	const technologyDiv = openTechnology.current;

	// 	if (technologyDiv) {
	// 	  technologyDiv.style.display =
	// 		technologyDiv.style.display === 'flex' ? 'none' : 'flex';
	// 	}
	// };
	// Question of using Ref, how to rotate the arrow

	function handleVariable(selection: string) {
		if (filterSelection.includes(selection)) {
			//if it include the vfonly then turn it off
			const temp = filterSelection.filter((each: string) => selection != each); //temp arry not including vfonly
			setFilterSelection(temp);
		} else {
			//not include vfonly then add in vfonly
			const temp = [...filterSelection, selection];
			setFilterSelection(temp);
		}
	}

	function handleStroke(stroke: string) {
		let temp = filterSelection.filter(
			(each: string) =>
				each !== "Serif" && each !== "Slab+Serif" && each !== "Sans+Serif"
		); // Array without any stroke

		// Check if the stroke exists in the array
		if (filterSelection.includes(stroke)) {
			// If it exists, remove it
			temp = temp.filter((each: string) => each !== stroke);
		} else {
			// If it doesn't exist, push it
			temp.push(stroke);
		}

		setFilterSelection(temp);
		console.log(filterSelection);
	}

	return (
		<div>
			{isFiltered && (
				<div className="absolute left-0 top-0 z-10 lg:relative w-[300px] bg-gray-50 border h-screen overflow-y-scroll">
					<div className="flex flex-row justify-end p-2">
						<div className="flex mr-3 hover:bg-blue-100 text-blue-500 fill-blue-500 justify-between p-1 rounded-md">
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
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
							<div className="pl-2">Reset all</div>
						</div>

						<div
							className="flex items-center cursor-pointer"
							onClick={() => setIsFiltered(!isFiltered)}
						>
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
						</div>
					</div>
					<div>
						<div className="font-bold flex justify-start">Preview</div>
						<div className="flex-col pt-5 flex justify-center items-center">
							<input
								className="w-[90%] h-24 mb-2 rounded-lg bg-[#DBE2EF]"
								type="textbox"
								placeholder="Type something"
								onChange={(e) => setSampleText(e.target.value)}
							/>
							<div className="flex w-[90%]">
								<label className="mr-5" htmlFor="">
									Font Size
								</label>
								<select
									className="flex-grow"
									defaultValue=""
									name="fontSizeSelect"
									id="fontSizeSelect"
								>
									<option value="">16</option>
									<option value="2">2</option>
								</select>
							</div>
						</div>
					</div>
					<hr className="my-5 mx-auto h-[2px] w-[90%] bg-[#DBE2EF]" />

					<div>
						<div className="font-semibold mb-5">Filter</div>
						<div className="flex flex-col items-center mb-8">
							<div className="flex flex-col w-[90%]">
								<div
									className="relative flex justify-between cursor-pointer mb-2 hover:bg-slate-100"
									onClick={() => setOpenLanguage((n: any) => !n)}
								>
									<div className="flex h-8">
										<div className="pr-5">
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
													d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
												/>
											</svg>
										</div>
										<div>Language</div>
									</div>

									<div className={`${openLanguage ? "" : "rotate-180"} duration-100`}>
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
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									</div>
								</div>
								<div
									className={`justify-between duration-150 w-full h-8  ${
										openLanguage ? "flex" : "hidden"
									}`}
								>
									<select
										className="flex-grow bg-[#DBE2EF]"
										name="languageSelection"
										id="languageSelection"
									>
										<option value="">All language</option>
									</select>
								</div>
							</div>
						</div>

						{/* Technology--------------------------------------- */}

						<div className="flex flex-col items-center mb-8">
							<div className="flex flex-col w-[90%]">
								<div
									onClick={() => setOpenTechnology((n: any) => !n)}
									className="relative flex justify-between cursor-pointer mb-2 hover:bg-slate-100"
								>
									<div className="flex h-8">
										<div className="pr-5">
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
													d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
												/>
											</svg>
										</div>
										<div>Techonology</div>
									</div>

									<div className={`${openTechnology ? "" : "rotate-180"} duration-100`}>
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
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									</div>
								</div>
								<div
									className={`justify-between duration-150 w-full h-8 mb-5 ${
										openTechnology ? "flex" : "hidden"
									}`}
								>
									<div className="flex flex-wrap">
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"vfonly"}
											selectionName={"vfonly"}
										/>
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"coloronly"}
											selectionName={"Color"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Decorative Stroke------------------------------------------- */}

						<div className="flex flex-col items-center mb-8">
							<div className="flex flex-col w-[90%]">
								<div
									onClick={() => setOpenStroke((n: any) => !n)}
									className="relative flex justify-between cursor-pointer mb-2 hover:bg-slate-100"
								>
									<div className="flex h-8">
										<div className="pr-5">
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
													d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
												/>
											</svg>
										</div>
										<div>Decorative Stroke</div>
									</div>

									<div className={`${openStroke ? "" : "rotate-180"} duration-100`}>
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
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									</div>
								</div>
								<div
									className={`justify-between w-full h-fit ${
										openStroke? "flex" : "hidden"
									}`}
								>
									<div className="flex flex-wrap">
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleStroke}
											selection={"Serif"}
											selectionName={"Serif"}
										/>

										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleStroke}
											selection={"Slab+Serif"}
											selectionName={"Slab Serif"}
										/>

										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleStroke}
											selection={"Sans+Serif"}
											selectionName={"Sans Serif"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Classification------------------------------------------- */}

						<div className="flex flex-col items-center mb-8">
							<div className="flex flex-col w-[90%]">
								<div
									onClick={() => setOpenClassification((n: any) => !n)}
									className="relative flex justify-between cursor-pointer mb-2 hover:bg-slate-100"
								>
									<div className="flex h-8">
										<div className="pr-5">
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
													d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
												/>
											</svg>
										</div>
										<div>Classification</div>
									</div>

									<div className={`${openClassification ? "" : "rotate-180"} duration-100`}>
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
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									</div>
								</div>
								<div
									className={`justify-between duration-150 w-full h-fit mb-5 ${
										openClassification ? "flex" : "hidden"
									}`}
								>
									<div className="flex flex-wrap">
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"Display"}
											selectionName={"Display"}
										/>
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"Handwriting"}
											selectionName={"Handwriting"}
										/>
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"Monospace"}
											selectionName={"Monospace"}
										/>
										<AsideButton
											filterSelection={filterSelection}
											handleSelection={handleVariable}
											selection={"Symbols"}
											selectionName={"Symbols"}
										/>
									</div>
								</div>
							</div>
						</div>



						
					</div>

					<div></div>
				</div>
			)}
		</div>
	);
}

export default Aside;

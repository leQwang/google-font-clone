import React from "react";

function AsideButton(props:any) {
    const { filterSelection, handleSelection, selection, selectionName } = props;
	return (
		<button
			className={`flex w-fit py-2 px-3 rounded-xl mr-2 mb-3 text-sm font-semibold ${
				filterSelection.includes(selection) ? "bg-blue-100" : "bg-[#DBE2EF]"
			}`}
			onClick={() => handleSelection(selection)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={`w-6 h-6 mr-1 ${
					filterSelection.includes(selection) ? "block" : "hidden"
				}`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 12.75l6 6 9-13.5"
				/>
			</svg>
            {selectionName}
		</button>
	);
}

export default AsideButton;

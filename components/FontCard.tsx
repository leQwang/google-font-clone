import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer"; // Import useInView

function FontCard(props: any) {
	const { fontItem, sampleText, fontSize } = props;
	const [fontLoaded, setFontLoaded] = useState(false);
	const [ref, inView] = useInView(); // Use useInView to detect when the component is in view

	// Load the font dynamically when the component is in view
	useEffect(() => {
		if (inView) {
			const fontLink = document.createElement("link");
			fontLink.href = `https://fonts.googleapis.com/css?family=${concatAndReplaceSpace(
				fontItem.family
			)}`;
			fontLink.rel = "stylesheet";
			fontLink.onload = () => setFontLoaded(true);
			document.head.appendChild(fontLink);

			return () => {
				document.head.removeChild(fontLink);
			};
		}


	}, [inView, fontItem.family]);

	function concatAndReplaceSpace(inputString: string) {
		let modifiedString = inputString.replace(/ /g, "%20");
		return modifiedString;
	}

	return (
		<div ref={ref}>
			<Helmet></Helmet>
			{/* <Link href={`/specimen/${fontItem.family}`}> */}
			<Link href={`/fonts/${fontItem.family}?size=${fontSize}`}>
				<div className="w-full h-fit flex flex-col justify-center rounded-md py-3 hover:bg-neutral-200 text-wrap">
					<div className="w-full flex text-lg">
						<div className={`font-semibold`}>{fontItem.family}</div>
					</div>
					<div
						style={{
							fontSize: `${fontSize}px`,
							fontFamily: fontItem.family,
						}}
						className={fontLoaded ? "loaded-font" : ""}
					>
						<div className="sample-text">
							{sampleText !== ""
								? sampleText
								: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex tempora explicabo facilis dolore incidunt animi odit quis sed, aliquam vero, voluptates impedit illo quia veritatis minus libero. Expedita, dolorum."}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default FontCard;

import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FontContext } from "../pages/index";
import type { FontItem, FontItemList } from "../pages/index";
// import type { FontItemList } from "../pages/index";
import Link from "next/link";

function isFontItemList(data: FontItemList | null): data is FontItemList {
	return data !== null;
}

function FontCardContainer(props:any) {
  const {sampleText, fontSize} = props;
	const context = useContext(FontContext);
  // const [first, setfirst] = useState(context?.fontsList)
  // console.log("Inside font container", context)
  // useEffect(() => {
  //   setfirst(context?.fontsList);
  // }, [context])
  
  // console.log("Is it true", isFontItemList(context))
	if (isFontItemList(context)) {
		return (
			<div>
        <Helmet>
          
        </Helmet>
        <ul>
          {context?.map((fontItem: FontItem) => (
            <li key={fontItem.family}>
              <Link href={`/specimen/${fontItem.family}`}>
                <div className="w-screen h-10 flex flex-col justify-center rounded-md hover:bg-neutral-200">
                  <div className="w-full flex text-lg">
                    <div className="font-semibold">{fontItem.family}</div>
                    <div></div>
                  </div>
                  <div className={`text-[${fontSize}px]`}>{sampleText}</div>
                  <div></div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
		);
	} else {
		return null; // Handle the case where context is null
	}
}

export default FontCardContainer;
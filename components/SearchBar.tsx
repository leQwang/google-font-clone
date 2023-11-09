import React from 'react'
import GoogleFontIcon from "../public/GoogleFontIcon.png";
import Image from "next/image";

function SearchBar(props:any) {
  const { setSearch, sort, handleSort } = props;
  return (
    <div className="w-full h-fit flex">
							<div className="flex basis-28 sm:basis-auto items-center justify-center mr-2 sm:mr-5">
								<Image src={GoogleFontIcon} alt="google icon" />
								<div className="hidden lg:block text-2xl">Google Font</div>
							</div>

							<div className="rounded-full px-2 flex flex-grow items-center bg-[#F3F7FC]">
								<div className="flex flex-grow items-center sm:mx-2 h-full lg:border-r-2">
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
  )
}

export default SearchBar
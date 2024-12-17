"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'

import "../../../styles/scss/faqs.css"



export default function FAQ({ faqs }: { faqs: any }) {
    const router = useRouter()
    console.log(faqs)
    
    const getQuery = (name) => {
        const value = useSearchParams().get(name)
        return value == null ? '' : value
    }

    const [searchString, setSearchString] = useState(getQuery('filter'))
    const [expandAll, setExpandAll] = useState(false)
    
    const handleSearchStringChange = (e) => {
        setSearchString(e.target.value)
    }
    
    const handleExpandAll = () => {
        setExpandAll(true)
    }

    const handleCollapseAll = () => {
        setExpandAll(false)
    }

    const searchFAQs = () => {
        return faqs.filter( faq => faq.question.toLowerCase().includes(searchString.toLowerCase()))
    }

    useEffect(() => {
        router.push(`?filter=${searchString}`)
    }, [searchString]);

    return (
        <div className="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4">
            <h1 className="text-center dark:text-white lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">FAQ's</h1>
            <div className="lg:mt-6 bg-gray-100 dark:bg-gray-800 md:mt-5 mt-4 lg:py-7 lg:px-6 md:p-6 py-6 px-4 lg:w-8/12 w-full mx-auto">
                <div className="flex justify-between md:flex-row flex-col">
                    <div className="md:mb-0 mb-8 md:text-left text-center">
                        <h2 className="font-medium dark:text-white text-xl leading-5 text-gray-800 lg:mb-2 mb-4">Questions</h2>
                        <p className="font-normal dark:text-gray-300 text-sm leading-5 text-gray-600 md:w-8/12 md:ml-0 w-11/12 mx-auto">If the list of questions is long, Please use the search function to find your questions.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex bg-white md:justify-center justify-between items-center px-4 py-3 w-full">
                          <input className="focus:outline-none bg-white pe-10"  type="text" placeholder="Search questions" value={searchString} onChange={handleSearchStringChange} />
                          <div className="absolute inset-y-0 end-3 flex items-center pe-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="container flex flex-1">
                    <div className="pt-3">
                        <button onClick={handleExpandAll} type="button" className="px-3 py-2 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-900 hover:bg-gray-300 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase">expand all</button>
                    </div>
                    <div className="pt-3 pl-3">
                        <button onClick={handleCollapseAll} type="button" className="px-3 py-2 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-900 hover:bg-gray-300 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase">collapse all</button>
                    </div>
                </div>
            </div>
            <div className="lg:w-8/12 w-full mx-auto">
                <hr className="w-full lg:mt-5 md:mt-6 md:mb-8 my-8 border-gray-400" />
                { searchFAQs().map( (q, index) => (
                <div key={index}>
                    <div className="w-full md:px-6">
                    <details className="rounded group" open={expandAll}>
                        <summary className="list-none flex flex-wrap items-center cursor-pointer">
                        <div id="mainHeading" className="flex justify-between items-center w-full">
                            <div className="">
                                <p className="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800"><span className="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">Q{index+1}.</span> {q.question}</p>
                            </div>
                            <div className="flex w-10 items-center justify-center">
                            <div className="border-8 border-transparent border-l-gray-600 ml-2 group-open:rotate-90 transition-transform origin-left"></div>
                            </div>
                        </div>
                        </summary>
                        <div className="mt-6 w-full">
                        <div dangerouslySetInnerHTML={{__html: q.answer_html}}></div>
                        </div>
                    </details>
                    </div>                
                    <hr className="w-full lg:mt-5 my-8 border-gray-400" />
                </div>
                ))}
            </div>
        </div>       
    );
}
'use client'
import Image from "next/image";
import React from "react";
import getRandomWork from "./api/get-random-work";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";
import RandomWorkSnippetSkeleton from "./components/random-work-snippet-skeleton";
import RandomWorkSnippet from "./components/random-work-snippet";
import RandomWorkSnippetError from "./components/random-work-snippet-error";

const DashboardLogo = () => {
    const [inert, setInert] = React.useState<boolean>(true);
    const [animateOutLogo, setAnimateOutLogo] = React.useState<boolean>(false);
    const [showLogo, setShowLogo] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [randomWork, setRandomWork] = React.useState<WorkSnippetProps|null>(null);

    const handleLoadRandomWork = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await getRandomWork();
            const randomWorkSearchResponse: WorkSearchResponse = await response.json();
            const randomWork = randomWorkSearchResponse.docs.length > 0 ? randomWorkSearchResponse.docs[0] : null;
            setRandomWork(randomWork);
        } catch (e: unknown) {
            setError(true);
        } finally {
            await new Promise(r => setTimeout(r, 3000)).then(() => setLoading(false));
        }
    }

    React.useEffect(() => {
        if(!showLogo)
            handleLoadRandomWork();
    }, [showLogo]);

    const buttonText = showLogo ? "Discover New Books" : "Discover a new book";

    return (
        <div className="animate-fade-in-background mask-t-from-90% mask-b-from-80% mask-x-from-80% mask-radial-from-80% bg-cover bg-no-repeat bg-[url(/blue-background.jpg)]">
            <div className="flex flex-col items-center relative p-10">
                <div className={`w-full [transition:min-height_350ms] ${animateOutLogo ? 'min-h-[288px]' : 'min-h-0'}`}>
                    <div 
                        className={`w-full ${showLogo ? 'block' : 'hidden'} ${animateOutLogo ? 'animate-fade-out-logo opacity-100' : 'animate-fade-in-logo-delay opacity-0'} `}
                        onAnimationEnd={() => animateOutLogo ? setShowLogo(false) : null}
                    >
                        <div className="relative aspect-[3/2] min-w-0 max-w-md m-auto">
                            <Image 
                                src="/dashboard-logo.jpg"
                                alt="Dashboard logo"
                                fill
                                className="select-none mask-x-from-80% mask-t-from-70% mask-b-from-90%"
                            />
                        </div>
                    </div>
                    <div className={`${showLogo ? 'hidden' : 'flex justify-center'} animate-fade-in-logo opacity-0`}>
                        {
                            loading ? <RandomWorkSnippetSkeleton /> :
                            error || !randomWork ? <RandomWorkSnippetError /> :
                            <RandomWorkSnippet work={randomWork}/>
                        }
                    </div>
                </div>
                <div 
                    className="animate-fade-in-logo-text opacity-0"
                    onAnimationEnd={() => setInert(false)}
                    inert={inert}
                >
                    <div className={`mask-x-from-90% bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 [transition:scale_350ms] ${loading ? '' : 'hover:scale-105'}`}>
                        <button
                            className="w-50 cursor-pointer px-6 py-1 disabled:cursor-default"
                            type="button"
                            title="Discover a new book"
                            onClick={() => showLogo ? setAnimateOutLogo(true) : handleLoadRandomWork()}
                            disabled={loading}
                        >
                            {
                                loading ? <div className="h-1 my-[7px] rounded-full bg-sky-200 animate-pulse" /> :
                                <p className="text-center text-gray-800 font-serif text-white text-sm">{buttonText}</p>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLogo;
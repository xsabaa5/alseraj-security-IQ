import SplineScene from "./SplineScene";

export default function Hero(){
    return (
        <div className="relative w-screen h-screen flex justify-center items-center  top-0 ">
            <div className=" absolute ">
                <h1 className="space-y-2">
                <span className="leading-normal bg-linear-to-r from-blue-300 via-white to-pink-400 bg-clip-text text-transparent l block text-center text-2xl sm:text-2xl md:text-4xl lg:text-6xl ">Technology.Security.Reliability </span>
                <span className="block bg-slate-500 bg-clip-text text-transparent text-center text-xl sm:text-2xl md:text-4xl lg:text-3xl">Delivering Technology and Security with Reliable Performance</span>
                </h1>
            </div>
        <SplineScene />
        </div>
    )
}

import { ToolbarProps } from "react-big-calendar"

export const calendarTools = ({ date, onNavigate }: ToolbarProps) => {
  const goToBack = () => {
    onNavigate("PREV")
  }

  const goToNext = () => {
    onNavigate("NEXT")
  }
  const goToHome = () => {
    onNavigate("TODAY")
  }
  const month = date.toLocaleString("es", { month: "long" })

  return (
    <div className="flex justify-between">
      <div></div>
      <div className="">
      <section className="container max-w-2xl mx-auto p-2">
      <div className="flex items-start justify-center">
        <div className="flex flex-col shadow-md w-20 md:w-28 relative">
          <div className="absolute -top-2 left-4 w-2 h-4 bg-gray-400"></div>
          <div className="absolute -top-2 right-4 w-2 h-4 bg-gray-400"></div>
          <span className="bg-sky-400 text-center text-white font-bold text-lg p-1 md:p-2 uppercase">{month}</span>
          {/* <span className="text-2xl md:text-4xl text-green-800 font-bold bg-white text-center px-3 pt-3 pb-2">day</span>
          <span className="text-sm md:text-md bg-white text-green-600 text-center md:p-1 border-t-2 border-gray-100 border-dashed">year</span> */}
        </div>
      </div>
    </section>
      </div>
      <div className="">
        <button
          type="button"
          className="text-white bg-[#f1f1f1] mb-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={goToBack}
          title="Previous"
        >
          <svg
            className="w-6 h-6 text-sky-400 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 10 16"
          >
            <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="text-white bg-[#f1f1f1] mb-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={goToHome}
          title="Home"
        >
          <svg
            className="w-6 h-6 text-sky-400 dark:text-white"
            viewBox="0 0 448 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="text-white bg-[#f1f1f1] mb-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={goToNext}
          title="Next"
        >
          <svg
            className="w-6 h-6 text-sky-400 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 10 16"
          >
            <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

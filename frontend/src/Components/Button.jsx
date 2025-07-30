export default function Button({label, onClick}){
    return <button onClick={onClick} type="button" className="w-full bg-slate-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>

}
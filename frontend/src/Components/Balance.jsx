export default function Balance({balance}){
    return(
        <div className="flex mt-4">
            <div className="text-lg font-bold">
                Balance
            </div>
            <div className="text-lg font-semibold ml-4">
                Rs. {balance}
            </div>
        </div>
    )
}
import CardList from "../../components/Cards/CardList";

const Buy = () => {
    const handleCLick = (e: any) => {
        console.log("carte à acheter")
    }
    
    return (
        <div>
            <CardList fetchMethod = "all" handleClick={handleCLick}/>
        </div>
    );
}

export default Buy;
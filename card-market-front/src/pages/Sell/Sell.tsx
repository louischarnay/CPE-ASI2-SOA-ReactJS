import CardList from "../../components/Cards/CardList";

const Sell = () => {
    const handleCLick = (id: any) => {
        console.log(id)
    }
    
    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick}/>
        </div>
    );
}

export default Sell;
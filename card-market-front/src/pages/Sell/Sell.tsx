import CardList from "../../components/Cards/CardList";

const Sell = () => {
    const handleCLick = async (id: any) => {
        const response = null

        // TODO NOTIF
    }
    
    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick}/>
        </div>
    );
}

export default Sell;
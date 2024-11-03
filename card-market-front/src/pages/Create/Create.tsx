import { useSelector } from "react-redux";
import CardPreview from "../../components/Cards/CardPreview";
import CreateForm from "../../components/CreateForm/CreateForm";
import CardProps from "../../models/CardProps";
import './Create.css'

const Create = () => {

    const generatedCard: CardProps = useSelector((state: any) => state.cardReducer.generatedCard)

    const handleCLick = (e: any) => {
        console.log('creating card')
    }

    const isRed = () => {
        if (generatedCard && generatedCard.id) {
            return true
        } else {
            return false
        }
    }

    return (<div className="create-container">
        <CreateForm></CreateForm>
        <div className="center-card">
            <div className="width-card">
                {
                    isRed() && 
                        <CardPreview name={generatedCard.name} description={generatedCard.description} family={generatedCard.family} affinity={generatedCard.affinity} imgUrl={generatedCard.imgUrl} smallImgUrl={generatedCard.smallImgUrl} id={generatedCard.id} hp={generatedCard.hp} energy={generatedCard.energy} defence={generatedCard.defence} attack={generatedCard.attack} price={generatedCard.price} handleCLick={handleCLick} isClickable={false}></CardPreview>
                }
            </div>
        </div>
    </div>)
}

export default Create;
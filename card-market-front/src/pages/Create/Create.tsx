import CardPreview from "../../components/Cards/CardPreview";
import CreateForm from "../../components/CreateForm/CreateForm";
import './Create.css'

const Create = () => {
    const handleCLick = (e:any) => {
        console.log('selling card')
    }

    return (<div className="create-container">
        <CreateForm></CreateForm>
        <div className="center-card">
            <div className="width-card">
            <CardPreview name={""} description={""} family={""} affinity={""} imgUrl={""} smallImgUrl={""} id={0} hp={0} energy={0} defense={0} attack={0} price={0} handleCLick={handleCLick}></CardPreview>
            </div>
        </div>
    </div>)
}

export default Create;
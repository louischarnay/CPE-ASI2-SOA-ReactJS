import CardPreview from "../../components/Cards/CardPreview";
import CreateForm from "../../components/CreateForm/CreateForm";
import './Create.css'

const Create = () => {
    return (<div className="create-container">
    <CreateForm></CreateForm>
    <CardPreview name={""} description={""} family={""} affinity={""} imgUrl={""} smallImgUrl={""} id={0} hp={0} energy={0} defense={0} attack={0} price={0}></CardPreview>
    </div>)
}

export default Create;
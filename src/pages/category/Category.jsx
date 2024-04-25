import { useParams } from "react-router-dom"

const Category = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>Category</div>
  )
}

export default Category
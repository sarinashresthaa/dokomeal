import menuData from "@/data/menu.json";
import { useParams } from "react-router-dom";

const MenuDetail = () => {
    const {id}= useParams();
    const item = menuData.categories.flatMap((category) => category.items)
    .find((item) => item.id === Number(id) )
  return (
    <div>
      <h1>{item?.name} </h1>
      
    </div>
  )
}

export default MenuDetail

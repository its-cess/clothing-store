import "./directory.styles.scss";

import CatergoryItem from "../category-item/category-item.component";

const Directory = ({categories}) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CatergoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory;
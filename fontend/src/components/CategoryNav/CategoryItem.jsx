import "./CategoryItem.css"

const CategoryItem = ({ name, icon, isText }) => {
  return (
    <button className="category-item">
      <div className="category-icon">
        {isText ? <span className="text-icon">{icon}</span> : <span dangerouslySetInnerHTML={{ __html: icon }} />}
      </div>
      <span className="category-name">{name}</span>
    </button>
  )
}

export default CategoryItem

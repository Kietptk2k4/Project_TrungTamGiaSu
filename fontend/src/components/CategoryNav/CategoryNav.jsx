import CategoryItem from "./CategoryItem"
import "./CategoryNav.css"

const CategoryNav = () => {
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const handleCategoryClick = (categoryName) => {
//     setSelectedCategory(categoryName)
//   }
  const categories = [
    {
      name: "Toán",
      icon: "√x",
      isText: true,
    },
    {
      name: "Ngữ văn",
      icon: '<i class="fa-solid fa-book"></i>',
    },
    {
      name: "Tiếng Anh",
      icon: '<i class="fa-solid fa-language"></i>',
    },
    {
      name: "Piano",
      icon: '<i class="fa-solid fa-music"></i>',
    },
    
  ]

  return (
    <div className="category-nav-container">
      <div className="category-nav">
        {categories.map((category, index) => (
          <CategoryItem key={index} name={category.name} icon={category.icon} isText={category.isText} />
        ))}
      </div>
    </div>
  )
}

export default CategoryNav

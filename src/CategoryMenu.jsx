import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function CategoryMenu(props) {
  const { categories, selectCategory } = props
  return (
    <DropdownButton
      className='quiz-btn'
      id='dropdown-basic-button'
      title='Categories'
    >
      {categories.map((category) => (
        <Dropdown.Item
          key={category.key}
          as='button'
          onClick={() => selectCategory(category.id)}
          //   href={`'#/action-${category.id}'`}
        >
          {category.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

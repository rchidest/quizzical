import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function ItemsMenu(props) {
  const { title, items, selectItem } = props;
  return (
    <DropdownButton
      className="quiz-btn"
      id="dropdown-basic-button"
      title={title}
    >
      {items.map((item) => (
        <Dropdown.Item
          key={item.key}
          as="button"
          onClick={() => selectItem(item.id)}
        >
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

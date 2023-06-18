import { useState } from "react";
import { CaretDownFill } from "react-bootstrap-icons";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

function CustomToggle({ eventKey, isOpened }) {
  const [isOpen, setIsOpen] = useState(isOpened || false);
  const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen(!isOpen));

  return (
    <button
      className={isOpen ? "toggle opened me-3" : "toggle me-3"}
      type="button"
      onClick={decoratedOnClick}
    >
      <CaretDownFill size={20} />
    </button>
  );
}

export default CustomToggle;
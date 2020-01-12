import ReactSelect from "react-select";
import styled from "styled-components";

const PREFIX = "select";
const CONTROL = `${PREFIX}__control`;
const VALUE_CONTAINER = `${PREFIX}__value-container`;
const INDICATOR = `${PREFIX}__dropdown-indicator`;

const Select = styled(ReactSelect).attrs({
  classNamePrefix: PREFIX,
})`
  width: 320px;

  .${CONTROL} {
    width: 320px;
    border: thin solid #ccc;
    border-radius: 5px;
    min-height: 34px;
    outline: none;
  }
  .${VALUE_CONTAINER} {
    padding: 0 8px;
  }

  .${INDICATOR} {
    padding: 6px;
  }
`;

export default Select;

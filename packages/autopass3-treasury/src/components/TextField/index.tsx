import { FC, useState } from "react";
import {
  TextFieldAreaContainer,
  TextFieldAreaInput,
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel,
} from "./style";

interface IProps {
  label: string;
  type: string;
  value?: string;
  handleChange: (text: string) => void;
}

const TextField: FC<IProps> = ({ label, type, handleChange, value }) => {
  const [text, setText] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const handleChangeText = (e: string) => {
    handleChange(e);
    setText(e);
  };

  if (type === "textarea") {
    return (
      <TextFieldAreaContainer>
        <TextFieldAreaInput
          value={text}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => handleChangeText(e.target.value)}
        ></TextFieldAreaInput>
        <TextFieldLabel isText={text.length > 0} isFocus={focus}>
          {label}
        </TextFieldLabel>
      </TextFieldAreaContainer>
    );
  }
  return (
    <TextFieldContainer>
      <TextFieldInput
        type={type}
        value={value || text}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => handleChangeText(e.target.value)}
      ></TextFieldInput>
      <TextFieldLabel
        isText={(value?.length && value.length > 0) || text.length > 0}
        isFocus={focus}
      >
        {label}
      </TextFieldLabel>
    </TextFieldContainer>
  );
};

export default TextField;

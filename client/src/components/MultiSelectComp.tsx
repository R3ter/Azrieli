import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { MenuButtonProps } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GenresColor } from "../util/Genres";

const MultiSelectMenu = (props: MultiSelectMenuProps): JSX.Element => {
  const { label, options, buttonProps } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.value.current
  );
  props.value.current = selectedOptions;

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }: { onClose: Function }) => (
        <>
          <MenuButton
            type="button"
            marginTop={5}
            marginBottom={5}
            borderWidth={1}
            p={2}
            px={4}
            _focus={{
              outline: "none",
            }}
          >
            {`${label}`}
            <ChevronDownIcon />
          </MenuButton>
          <Divider />
          {selectedOptions.map((e: string) => {
            return (
              <Badge
                borderRadius={15}
                margin={1}
                padding={1}
                colorScheme={GenresColor[e] || "red"}
              >
                {e}
              </Badge>
            );
          })}
          <MenuList>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  props.value.current = [];
                  onClose();
                }}
              >
                Clear all
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              defaultValue={selectedOptions}
              title={undefined}
              type="checkbox"
              onChange={(values: string[]) => {
                setSelectedOptions(values.filter((_) => _.length));
                props.onChange?.(values);
              }}
            >
              {options.map((option) => {
                return (
                  <MenuItemOption
                    key={`multiselect-menu-${option}`}
                    type="checkbox"
                    value={option}
                  >
                    {option}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

MultiSelectMenu.displayName = "MultiSelectMenu";

export type MultiSelectMenuProps = {
  label: string;
  options: string[];
  onChange?: (selectedValues: string[]) => void;
  buttonProps?: MenuButtonProps;
  value: { current: string[] };
};

export default MultiSelectMenu;

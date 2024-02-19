import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Option,
  Select,
  Stack,
  Switch,
  Textarea,
} from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import ThemeProvider from "./components/ThemeProvider";
import { useFlag } from "./hooks/useFlag";
import { caesar, Language } from "./utils/algorithms";

type TextValue = {
  key: number;
  text: string;
  result: string;
  lang: Language;
};

const ResultText: React.FC<{ value: TextValue; isDecrypting: boolean }> = ({
  value,
  isDecrypting,
}) => (
  <Typography level="inherit" sx={{ mt: 2 }}>
    <Typography level="body-sm">
      {isDecrypting ? "Decrypt: " : "Encrypt: "}
    </Typography>
    {value.result}
  </Typography>
);

const CaesarCipherTab: React.FC<{
  value: TextValue;
  switchValue: boolean;
  onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSwitchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLangChange: (
    e: React.SyntheticEvent | null,
    newValue: Language | null
  ) => void;
}> = ({
  value,
  switchValue,
  onTextAreaChange,
  onSwitchChange,
  onKeyChange,
  onLangChange,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Textarea
      placeholder="Type something here…"
      minRows={3}
      value={value.text}
      onChange={onTextAreaChange}
      endDecorator={
        <Typography level="body-xs" sx={{ ml: "auto" }}>
          {value.text.length} character(s)
        </Typography>
      }
    />
    <Stack
      sx={{
        gap: 2,
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Switch
        color={switchValue ? "primary" : "danger"}
        slotProps={{ input: { "aria-label": "dark mode" } }}
        startDecorator={
          <Typography
            sx={{
              color: switchValue ? "text.tertiary" : "danger.600",
            }}
          >
            Encrypt
          </Typography>
        }
        endDecorator={
          <Typography
            sx={{
              color: switchValue ? "primary.500" : "text.tertiary",
            }}
          >
            Decrypt
          </Typography>
        }
        checked={switchValue}
        onChange={onSwitchChange}
      />
      <Select defaultValue={Language.en} onChange={onLangChange}>
        <Option value={Language.en}>EN</Option>
        <Option value={Language.ua}>UA</Option>
      </Select>

      <Input
        placeholder="Enter or select a key"
        type="number"
        value={value.key}
        onChange={onKeyChange}
        sx={{ width: "150px" }}
        slotProps={{
          input: {
            min: 0,
            step: 1,
          },
        }}
      />
    </Stack>
  </Box>
);

function App() {
  const [SwitchValue, enableSwitch, disableSwitch] = useFlag(false);
  const [value, setValue] = useState<TextValue>({
    text: "",
    result: "",
    lang: Language.en,
    key: 0,
  });

  useEffect(() => {
    handleEncryptDecrypt();
  }, [SwitchValue, value.key, value.lang, value.text]);

  const handleEncryptDecrypt = () => {
    const { text, key, lang } = value;
    const alphabet =
      lang === Language.en
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        : "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя";
    const b_encrypt = !SwitchValue;
    const b_keep_chars = true;
    const b_block_of_five = false;

    const result = caesar(
      text,
      key,
      alphabet,
      b_encrypt,
      b_keep_chars,
      b_block_of_five
    );

    setValue((prevValue) => ({
      ...prevValue,
      result: result,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? enableSwitch() : disableSwitch();
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, key: Number(e.target.value) });
  };

  const handleLangChange = (
    e: React.SyntheticEvent | null,
    newValue: Language | null
  ) => {
    setValue({ ...value, text: "", lang: newValue as Language });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setValue({ ...value, text: newText });
  };

  return (
    <ThemeProvider>
      <Box sx={{ p: { xs: 2, sm: 4, md: 6, lg: 8 }, mx: "auto" }}>
        <Tabs
          variant="outlined"
          aria-label="Pricing plan"
          defaultValue={0}
          sx={{
            borderRadius: "lg",
            boxShadow: "sm",
            overflow: "auto",
          }}
        >
          <TabList
            sx={{
              pt: 1,
              justifyContent: "center",
              [`&& .${tabClasses.root}`]: {
                flex: "initial",
                bgcolor: "transparent",
                "&:hover": {
                  bgcolor: "transparent",
                },
                [`&.${tabClasses.selected}`]: {
                  color: "primary.plainColor",
                  "&::after": {
                    height: 2,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab indicatorInset variant="soft" sx={{ flexGrow: 1 }}>
              Caesar
            </Tab>
            <Tab indicatorInset variant="soft" sx={{ flexGrow: 1 }}>
              Playfair
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <CaesarCipherTab
              value={value}
              switchValue={SwitchValue}
              onTextAreaChange={handleTextAreaChange}
              onSwitchChange={handleSwitchChange}
              onKeyChange={handleKeyChange}
              onLangChange={handleLangChange}
            />
            <ResultText value={value} isDecrypting={SwitchValue} />
          </TabPanel>
          <TabPanel value={1}>
            <Typography level="inherit">
              Best for professional developers building enterprise or data-rich
              applications.
            </Typography>
          </TabPanel>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}

export default App;

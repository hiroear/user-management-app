// extendTheme： グローバルな cssを chakraUIで設定する
import { extendTheme } from "@chakra-ui/react";

// extendThemeの()内に {オブジェクト} で cssを書いて定義していく
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800"
      }
    }
  }
});
export default theme;

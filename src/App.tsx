import { ChakraProvider } from "@chakra-ui/react";
import { LoginUserProvider } from "./providers/LoginUserProvider";

import theme from "./theme/theme";
import { Router } from "./router/Router";

export default function App() {
  return (
    <div className="App">
      {/* Chakra UIを使う場合、ルートのコンポーネントで <ChakraProvider>で囲う。囲った中で ChakraUIが使っていけるので必ず / のコンポーネントで囲う
          theme={ChakraUIで設定したグローバルCSSのコンポーネント} とすることで、システム全体にグローバルCSSを ChakraUIで設定することができる */}
      <ChakraProvider theme={theme}>
        {/*↓ <LoginUserProvider>で囲った配下のコンポーネントで LoginUserContext(のグローバルな state) が参照できる */}
        <LoginUserProvider>
          <Router />
        </LoginUserProvider>
      </ChakraProvider>
    </div>
  );
}

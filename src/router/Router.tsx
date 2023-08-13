import { FC, memo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { homeRoutes } from "./homeRoutes";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        {/*↓ /home 配下のルーティングを mapで生成。 (match: {url})= "/home" */}
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`} // 例: "/home/user_management"
                >
                  {/* TOPのログインページからログインして /home に遷移した時にヘッダーを表示させる。ログインページではヘッダーは表示しない */}
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
        {/* 上のどこにも当てはまらない URL全て */}
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

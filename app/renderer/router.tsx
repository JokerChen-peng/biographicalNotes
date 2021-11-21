import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import TemplateList from '@src/container/templateList';
import Resume from '@src/container/resume';
import ROUTER  from '@src/common/constants/router';
import useReadDirAssetsTemplateHooks from './Hooks/useReadDirAssetsTemplateHooks';
import useThemeActionHooks from './hooks/useThemeActionHooks';

function Router(){
  const readDirAssetsTemplateHooks = useReadDirAssetsTemplateHooks();
  const initThemeConfig = useThemeActionHooks.useInitThemeConfig();
  // 👇 进行初始化工作
  useEffect(() => {
    readDirAssetsTemplateHooks();
  }, []);
  useEffect(() => {
    // ...
    initThemeConfig();
  }, []);
  return(
    <HashRouter>
      <Switch>
        <Route path={ROUTER.root} exact>
          <Root/>
        </Route>
        <Route path={ROUTER.templateList} exact>
          <TemplateList />
        </Route>
        <Route path={ROUTER.resume} exact>
          <Resume />
        </Route>
      </Switch>
      <Redirect to={ROUTER.root}/>
    </HashRouter>
  )
}
export default Router
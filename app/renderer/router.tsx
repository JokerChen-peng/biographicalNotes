import React, { useEffect } from 'react';
import { HashRouter,Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
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
    <CacheSwitch>
      <CacheRoute path={ROUTER.root} exact component={Root} />
      <CacheRoute path={ROUTER.resume} exact component={Resume} />
      <CacheRoute path={ROUTER.templateList} exact component={TemplateList} />
      <Redirect from={ROUTER.root} exact to={ROUTER.root} />
    </CacheSwitch>
  </HashRouter>
  )
}
export default Router
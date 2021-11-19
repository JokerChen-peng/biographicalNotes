import React, { useEffect } from 'react';
import './index.less';
import { ROUTER_ENTRY,ROUTER_KEY} from '@src/common/constants/router';
import { useHistory } from 'react-router';
import { shell } from 'electron'
import Logo from '@assets/logo.png';
import { isHttpOrHttpsUrl } from '@common/utils/router'
import { useSelector,useDispatch} from 'react-redux'
function Root() {
   const history = useHistory();
   const dispatch = useDispatch();
   const appName = useSelector((state:any)=>state.globalModel.appName)
   useEffect(() => {
    setTimeout(() => {
      console.log('3s 后修改...');
      dispatch({
        type: 'globalModel/setStore',
        payload: {
          key: 'appName',
          values: 'visResumeMook',
        },
      });
    }, 3000);
  }, []);

  useEffect(() => {
    console.log('appName = ', appName);
  }, [appName]);
   const onRouterTolink = (router:TSRouter.Item) => {
     if (isHttpOrHttpsUrl(router.url)){
      shell.openExternal(router.url)
     }else{
      history.push(router.url)
     }
   }
  return (
    <div styleName="root">
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">JRResume</div>
        <div styleName="tips">一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div styleName="action">
          {ROUTER_ENTRY.map((router:TSRouter.Item) => {
            return (
              <div key={router.key} styleName="item" onClick={()=>onRouterTolink(router)}>{router.text}</div>
            );
          })}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright © 2021-{new Date().getFullYear()} All Rights Reserved. Copyright By Moses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Root;
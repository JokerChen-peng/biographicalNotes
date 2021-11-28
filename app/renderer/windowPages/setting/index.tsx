
import React, { useEffect, useState } from 'react';
import './index.less';
import { ipcRenderer } from 'electron';
import { getUserStoreDataPath } from '@common/utils/appPath';
import { useReadGlobalConfigFile, useUpdateGlobalConfigFile,} from '@src/hooks/useGlobalConfigActionHooks';


function Setting() {
  const onHideWindow = () => {
    ipcRenderer.send('Electron:SettingWindow-hide-event');
  };
  const onMinWindow = () => {
    ipcRenderer.send('Electron:SettingWindow-min-event');
  };
  const [resumeSavePath, setResumeSavePath] = useState('');
    // 👇 1. 引入 Hooks，进行读取文件内容和更新内容
    const readAppConfigThemeFile = useReadGlobalConfigFile();
    const updateGlobalConfigFile = useUpdateGlobalConfigFile();
    useEffect(() => {
      readAppConfigThemeFile().then((value: { [key: string]: any }) => {
        // 👇 2.1 如果存在默认路径，以此为主
        if (value?.resumeSavePath) {
          setResumeSavePath(value?.resumeSavePath);
        } else {
          // 👇 2.2 不存在默认路径，则设置默认路径并更新文件内容
          getUserStoreDataPath().then((appPath: string) => {
            setResumeSavePath(`${appPath}resumeCache`);
            updateGlobalConfigFile('resumeSavePath', `${appPath}resumeCache`);
          });
        }
      });
    }, []);
  const onSave = () => {};
  const onChangePath = () => {
    // 1. 向主进程发送消息，因为 dialog 模块只能在主进程中调用
    ipcRenderer.send('open-save-resume-path', '');
    // 2. 监听从主进程发送回来的消息
    ipcRenderer.on('reply-save-resume-path', (event, arg: string[]) => {
      if (arg) {
        if (arg.length > 0){
          setResumeSavePath(arg[0]);
          updateGlobalConfigFile('resumeSavePath', arg[0]);
        } 
      } else {
        console.log('自定义存储路径失败');
      }
    });
  };
  return (
    <div styleName="container">
       <div styleName="menu">
        <div styleName="hide" onClick={onHideWindow}>
          x
        </div>
        <div styleName="min" onClick={onMinWindow}>
          -
        </div>
      </div>
      <div styleName="content">
        <p styleName="label">修改简历数据储存路径</p>
        <div styleName="input">
          <div styleName="value">{resumeSavePath || '当前存储路径为：'}</div>
          <div styleName="update-btn" onClick={onChangePath}>
            更改路径
          </div>
          </div>
      </div>
    </div>
  );
}

export default Setting;
import React, { useEffect, useState } from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import { onAddToolbar, onDeleteToolbar } from './utils';
import {useDispatch} from 'react-redux';
function ResumeToolbar() {
  const height = document.body.clientHeight;
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const dispatch = useDispatch()
  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: TSResume.SliderItem[] = [];
      let _unAddToolbarList: TSResume.SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
        if (s.require) _addToolbarList.push(s);
        if (!s.require) _unAddToolbarList.push(s);
      });
      setAddToolbarList(_addToolbarList);
      setUnAddToolbarList(_unAddToolbarList);
      changeResumeToolbarKeys(_addToolbarList.map((s)=>s.key))
    }
  }, []);
  const changeResumeToolbarKeys =(moduleKeys:string[])=>{
    if(moduleKeys.length>0){
      dispatch({
        type:'templateModel/setStore',
        payload:{
          key:'resumeToolbarKeys',
          values:moduleKeys,
        }
      })
    }
  }

  // 添加模块
  const onAddSliderAction = (moduleToolbar: TSResume.SliderItem) => {
    const nextAddSliderList = onAddToolbar(addToolbarList, moduleToolbar);
    setAddToolbarList(nextAddSliderList);
    const nextUnAddSliderList = onDeleteToolbar(unAddToolbarList, moduleToolbar);
    setUnAddToolbarList(nextUnAddSliderList);
    changeResumeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
  };

  // 删除模块
  const onDeleteSliderAction = (moduleSlider: TSResume.SliderItem) => {
    if (!moduleSlider.require) {
      const nextAddSliderList = onDeleteToolbar(addToolbarList, moduleSlider);
      setAddToolbarList(nextAddSliderList);
      const nextUnAddSliderList = onAddToolbar(unAddToolbarList, moduleSlider);
      setUnAddToolbarList(nextUnAddSliderList);
      changeResumeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
    }
  };

  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        {!!addToolbarList.length && (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              已添加模块
            </div>
            <div styleName="content">
              {addToolbarList.map((toolbar: TSResume.SliderItem) => {
                return (
                  <div styleName="box" key={toolbar.key} onClick={() => onDeleteSliderAction(toolbar)}>
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{toolbar.name}</div>
                        <div styleName="summary">{toolbar.summary}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!!unAddToolbarList.length && (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              未添加模块
            </div>
            <div styleName="content">
              {unAddToolbarList.map((toolbar: TSResume.SliderItem) => {
                return (
                  <div styleName="box" key={toolbar.key} onClick={() => onAddSliderAction(toolbar)}>
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{toolbar.name}</div>
                        <div styleName="summary">{toolbar.summary}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;

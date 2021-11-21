/**
 * @desc 头像
 * @author pengdaokuan
 */
import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import uploadIcon from '@assets/icon/upload.png';
import MyButton from '@common/components/MyButton';
import useUpdataResumeHook from '../../../../useUpdateResumeHook'
import ImageUpload from '@src/common/components/MyUpload/ImageUpload';

function Avatar() {
  const updateResumeHook = useUpdataResumeHook();
  const base: TSResume.Base = useSelector((state: any) => state.resumeModel.base);
  const onUpdateUserAvatar =(avatarUrl:string) =>{
    updateResumeHook<string>('base/avatar',avatarUrl)
  }
  return (
    <div styleName="box">
      {!base?.avatar&&(
         <ImageUpload
         icon={uploadIcon}
         accept="image/*"
         multiple={false}
         onAfterChange={(files: TSUpload.File[]) => {
           onUpdateUserAvatar(files[0]?.base64URL);
         }}
       />
      )
      }{
        base?.avatar&&(
          <div></div>
        )
      }
      <div styleName="avatar">
        <img src={base?.avatar} />
        <div styleName="mask">
            <MyButton size="small" className="btn-change" onClick={() => onUpdateUserAvatar('')}>
              更换
            </MyButton>
          </div>
      </div>
    </div>
  );
}

export default Avatar
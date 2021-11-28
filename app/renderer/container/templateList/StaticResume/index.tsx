import React from 'react';
import './index.less';
// 👇 引入所有的静态模版
import * as TemplateList from '@src/container/templates';
// 👇 引入上边写好的 Footer 组件
import Footer from '../Footer';
import MyScrollBox from '@common/components/MyScrollBox';
import { useSelector } from 'react-redux';
import MyEmpty from '@common/components/MyEmpty';
import EmptyPng from '@assets/icon/empty.png';
import MyButton from '@common/components/MyButton';
import { shell } from 'electron';
const VALID_TEMPLATE = [0];
function StaticResume() {
  const HEADER_HEIGHT = 76; // 距离头部距离
  const height = document.body.clientHeight;
  const selectTemplate: TSTemplate.Item = useSelector((state: any) => state.templateModel.selectTemplate);
  //下面判断该模版是否合法且存在组件模版
  const isIncludeTemplate = VALID_TEMPLATE.includes(selectTemplate.templateIndex);
  const isValidTemplate = selectTemplate.templateId && selectTemplate.templateIndex !== -1;
  return (
    <div styleName="container">
      <MyScrollBox maxHeight={height - HEADER_HEIGHT}>
        {isValidTemplate && isIncludeTemplate && (
          <>
            {selectTemplate.templateIndex===0&&<TemplateList.TemplateOne />}
            <Footer />
          </>
        )}
         {/* 👇 3. 缺省页说明 */}
         {isValidTemplate && !isIncludeTemplate && (
          <LackDesc label="暂未开发此模版，欢迎点击下方按钮进行模版贡献" />
        )}
        {!isValidTemplate && (
          <LackDesc label="暂无模版数据，欢迎点击下方按钮进行模版贡献" />
        )}
      </MyScrollBox>
    </div>
  );
}

export default StaticResume;
const LackDesc = React.memo(({ label }: { label: string }) => {
  return (
    <div styleName="empty">
      <MyEmpty imgSrc={EmptyPng} label={label} />
      <div styleName="footer">
        <MyButton
          size="middle"
          className="use-btn"
          onClick={() => {
            shell.openExternal('https://github.com/JokerChen-peng/biographicalNotes');
          }}
        >
          贡献模版
        </MyButton>
      </div>
    </div>
  );
});


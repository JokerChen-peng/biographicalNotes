// 模块路径
const ROUTER = {
  root: '/',
  resume: '/resume',
  templateList: '/templateList',
};
export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
  resume: 'resume',
  templateList: 'templateList',
};
export const ROUTER_ENTRY: TSRouter.Item[] = [
  {
    url: 'https://github.com/JokerChen-peng/biographicalNotes',
    key: 'intro',
    text: '介绍',
  },
  {
    url: ROUTER.resume,
    key: ROUTER_KEY.resume,
    text: '简历',
  },
  {
    url: 'https://github.com/JokerChen-peng/biographicalNotes',
    key: 'code',
    text: '源码',
  },
  {
    url: ROUTER.templateList,
    key: ROUTER_KEY.templateList,
    text: '模版',
  },
]
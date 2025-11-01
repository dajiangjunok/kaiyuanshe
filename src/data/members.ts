import { Member } from '../types/member';

export const members: Member[] = [
  {
    name: '白宦成',
    gender: '男',
    city: '深圳',
    email: 'huancheng.bai@kaiyuanshe.org',
    website: 'https://www.ixiqin.com',
    github: 'https://github.com/bestony',
    nickname: '白宦成.Bestony',
    githubUsername: 'bestony',
    alternativeEmail: 'xiqingongzi@gmail.com',
    details: []
  },
  {
    name: '蔡芳芳',
    gender: '女',
    city: '深圳',
    website: 'https://www.infoq.cn/u/caifangfang/publish',
    position: '编辑',
    details: []
  },
  {
    name: '晁倩',
    gender: '女',
    city: '上海',
    email: 'queenachao@kaiyuanshe.org',
    github: 'https://github.com/QueenaChao',
    bio: '晁倩：但行好事莫问前程\n\n本职：AI开发者生态社区经理\n\n开源社\n1、2023年开源社活动组组长\n2、2023年执行委员会成员\n3、2018-2023年 中国开源年会（COScon23）组委会核心成员\n4、2019-2022年 开源社活动组副组长',
    nickname: '啊Q',
    githubUsername: 'QueenaChao',
    alternativeEmail: 'Queenachao@Outlook.com',
    details: []
  },
  {
    name: '陈莉君',
    gender: '女',
    city: '西安',
    github: 'https://github.com/cljcore',
    githubUsername: 'cljcore',
    details: []
  },
  {
    name: '陈玄',
    gender: '男',
    city: '上海',
    email: 'chenxuan@kaiyuanshe.org',
    github: 'https://github.com/AmbitionCX',
    bio: '纯洁心灵·逐梦开源圈圈圈圈圈圈圈圈圈圈圈圈圈圈圈',
    nickname: 'Ambition',
    githubUsername: 'AmbitionCX',
    alternativeEmail: 'chenxuanamazing@gmail.com',
    details: []
  },
  {
    name: '陈阳',
    gender: '女',
    city: '北京',
    email: 'emily@kaiyuanshe.org',
    github: 'https://github.com/sssuyx',
    position: '高级项目经理',
    nickname: 'Emily',
    githubUsername: 'sssuyx',
    alternativeEmail: 'emilychen522@gmail.com',
    details: []
  },
  {
    name: '陈轶姝',
    gender: '女',
    city: '上海',
    email: 'chenyishu@kaiyuanshe.org',
    bio: 'INFJ魔法绿老头，半吊子新闻选手\n兴趣爱好比较广泛，爱剪辑，喜爱阅读网络文学和剧本杀，追番和追剧两不误。\n希望能与大家线上交流，请多多关心吧！',
    nickname: '铁铁',
    details: []
  },
  {
    name: '陈梓立',
    gender: '男',
    city: '广州',
    email: 'tison@kaiyuanshe.org',
    website: 'https://www.tisonkun.org/',
    github: 'https://github.com/tisonkun',
    bio: '夜天之书作者, Engula 社区, ASF member, Apache Flink committer\nApache Curator PMC, StreamNative Community Manager',
    achievements: ['2021 中国开源先锋 33 人'],
    nickname: 'tison',
    githubUsername: 'tisonkun',
    alternativeEmail: 'wander4096@gmail.com',
    details: []
  },
  {
    name: '崔晨洋',
    gender: '男',
    city: '上海',
    email: 'cuichenyang@kaiyuanshe.org',
    bio: '城市：北京\n地址：https://github.com/yoshino-s\n介绍：百度基础安全部/DevSecOps',
    details: []
  },
  {
    name: '代立冬',
    gender: '男',
    city: '北京',
    email: 'dailidong@kaiyuanshe.org',
    github: 'https://github.com/davidzollo',
    company: '白鲸开源',
    position: 'CEO',
    achievements: ['2021 中国开源先锋 33 人'],
    githubUsername: 'davidzollo',
    details: []
  }
];

// 工具函数：根据姓名查找成员
export const findMemberByName = (name: string): Member | undefined => {
  return members.find(member => member.name === name);
};

// 工具函数：根据昵称查找成员
export const findMemberByNickname = (nickname: string): Member | undefined => {
  return members.find(member => member.nickname === nickname);
};

// 工具函数：根据城市筛选成员
export const findMembersByCity = (city: string): Member[] => {
  return members.filter(member => member.city === city);
};

// 工具函数：根据性别筛选成员
export const findMembersByGender = (gender: '男' | '女'): Member[] => {
  return members.filter(member => member.gender === gender);
};

// 工具函数：筛选有GitHub的成员
export const findMembersWithGithub = (): Member[] => {
  return members.filter(member => member.github || member.githubUsername);
};

// 工具函数：筛选有网站的成员
export const findMembersWithWebsite = (): Member[] => {
  return members.filter(member => member.website);
};

// 工具函数：搜索成员
export const searchMembers = (keyword: string): Member[] => {
  const lowercaseKeyword = keyword.toLowerCase();
  return members.filter(member => 
    member.name.toLowerCase().includes(lowercaseKeyword) ||
    member.nickname?.toLowerCase().includes(lowercaseKeyword) ||
    member.bio?.toLowerCase().includes(lowercaseKeyword) ||
    member.city?.toLowerCase().includes(lowercaseKeyword) ||
    member.position?.toLowerCase().includes(lowercaseKeyword) ||
    member.company?.toLowerCase().includes(lowercaseKeyword)
  );
};

// 获取所有城市列表
export const getAllCities = (): string[] => {
  const cities = members
    .map(member => member.city)
    .filter((city): city is string => city !== undefined);
  return [...new Set(cities)].sort();
};

// 获取所有职位列表
export const getAllPositions = (): string[] => {
  const positions = members
    .map(member => member.position)
    .filter((position): position is string => position !== undefined);
  return [...new Set(positions)].sort();
};

// 获取所有公司列表
export const getAllCompanies = (): string[] => {
  const companies = members
    .map(member => member.company)
    .filter((company): company is string => company !== undefined);
  return [...new Set(companies)].sort();
};
 
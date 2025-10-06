import { NGOOrganization, CategoryInfo, NGOCategory } from '@/types/ngo';

export const categoryInfo: CategoryInfo[] = [
  {
    id: 'education',
    name: '教育公益',
    description: '专注于教育扶贫、乡村教育、教育资源均衡化等领域',
    color: '#3B82F6',
    icon: '📚'
  },
  {
    id: 'healthcare',
    name: '医疗健康',
    description: '提供医疗援助、健康普及、疾病防控等服务',
    color: '#EF4444',
    icon: '🏥'
  },
  {
    id: 'environment',
    name: '环境保护',
    description: '致力于生态保护、环境治理、可持续发展',
    color: '#10B981',
    icon: '🌱'
  },
  {
    id: 'poverty',
    name: '扶贫济困',
    description: '帮助贫困群体脱贫致富，改善生活条件',
    color: '#F59E0B',
    icon: '🤝'
  },
  {
    id: 'elderly',
    name: '养老助老',
    description: '关爱老年人群体，提供养老服务和精神慰藉',
    color: '#8B5CF6',
    icon: '👴'
  },
  {
    id: 'children',
    name: '儿童关爱',
    description: '保护儿童权益，促进儿童健康成长',
    color: '#EC4899',
    icon: '👶'
  },
  {
    id: 'disabled',
    name: '助残服务',
    description: '为残障人士提供康复、就业、生活等全方位支持',
    color: '#6366F1',
    icon: '♿'
  },
  {
    id: 'disaster',
    name: '灾害救助',
    description: '应急救援、灾后重建、防灾减灾',
    color: '#DC2626',
    icon: '🚨'
  },
  {
    id: 'culture',
    name: '文化传承',
    description: '保护和传承中华优秀传统文化',
    color: '#059669',
    icon: '🎭'
  },
  {
    id: 'animal',
    name: '动物保护',
    description: '保护野生动物，关爱流浪动物',
    color: '#7C3AED',
    icon: '🐾'
  },
  {
    id: 'community',
    name: '社区服务',
    description: '促进社区发展，增进邻里和谐',
    color: '#0891B2',
    icon: '🏘️'
  },
  {
    id: 'technology',
    name: '科技公益',
    description: '运用科技力量解决社会问题',
    color: '#7C2D12',
    icon: '💻'
  }
];

export const mockNGOData: NGOOrganization[] = [
  {
    id: '1',
    name: '中国青少年发展基金会',
    englishName: 'China Youth Development Foundation',
    description: '致力于通过资助服务、利民便民、扶弱济困等方式，促进青少年的健康成长。',
    logo: '',
    website: 'https://www.cydf.org.cn',
    category: 'education',
    location: {
      province: '北京市',
      city: '北京市',
      district: '东城区',
      address: '北京市东城区前门东大街10号',
      coordinates: { lat: 39.9042, lng: 116.4074 }
    },
    foundedYear: 1989,
    scale: 'national',
    focusAreas: ['rural_education', 'child_protection', 'youth_development'],
    contactInfo: {
      email: 'info@cydf.org.cn',
      phone: '010-64035547',
      address: '北京市东城区前门东大街10号'
    },
    socialMedia: {
      wechat: 'CYDF_1989',
      weibo: '@中国青少年发展基金会'
    },
    certifications: ['全国性公募基金会', '5A级社会组织'],
    achievements: [
      {
        id: 'a1',
        title: '希望工程30周年',
        description: '希望工程累计接受捐款150多亿元，资助贫困学生600多万名',
        year: 2019,
        type: 'milestone'
      }
    ],
    projects: [
      {
        id: 'p1',
        name: '希望工程',
        description: '资助贫困地区失学儿童重返校园',
        startDate: '1989-10-30',
        status: 'ongoing',
        impact: '已帮助600多万名贫困学生完成学业'
      }
    ]
  },
  {
    id: '2',
    name: '中华慈善总会',
    englishName: 'China Charity Federation',
    description: '以弘扬慈善文化、发展慈善事业、救助困难群众为宗旨的全国性慈善组织。',
    logo: '',
    website: 'https://www.chinacharityfederation.org',
    category: 'poverty',
    location: {
      province: '北京市',
      city: '北京市',
      district: '西城区',
      address: '北京市西城区北三环中路甲29号院华龙大厦A座',
      coordinates: { lat: 39.9707, lng: 116.3975 }
    },
    foundedYear: 1994,
    scale: 'national',
    focusAreas: ['poverty_alleviation', 'medical_assistance', 'disaster'],
    contactInfo: {
      email: 'ccf@ccf.org.cn',
      phone: '010-68294002',
      address: '北京市西城区北三环中路甲29号院华龙大厦A座'
    },
    socialMedia: {
      wechat: 'CCF_1994',
      weibo: '@中华慈善总会'
    },
    certifications: ['全国性公募基金会', '5A级社会组织'],
    achievements: [
      {
        id: 'a2',
        title: '慈善事业突出贡献奖',
        description: '荣获民政部颁发的慈善事业突出贡献奖',
        year: 2020,
        type: 'award'
      }
    ]
  },
  {
    id: '3',
    name: '中国绿化基金会',
    englishName: 'China Green Foundation',
    description: '专门从事生态环境建设的全国性公募基金会，致力于国土绿化和生态文明建设。',
    logo: '',
    website: 'https://www.cgf.org.cn',
    category: 'environment',
    location: {
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      address: '北京市朝阳区和平街东土城路9号',
      coordinates: { lat: 39.9629, lng: 116.4165 }
    },
    foundedYear: 1985,
    scale: 'national',
    focusAreas: ['climate_action', 'sustainable_development', 'wildlife_protection'],
    contactInfo: {
      email: 'cgf@cgf.org.cn',
      phone: '010-84239217',
      address: '北京市朝阳区和平街东土城路9号'
    },
    socialMedia: {
      wechat: 'LVHUA_1985',
      weibo: '@中国绿化基金会'
    },
    certifications: ['全国性公募基金会', '4A级社会组织'],
    projects: [
      {
        id: 'p2',
        name: '蚂蚁森林公益项目',
        description: '通过数字化方式鼓励公众参与植树造林',
        startDate: '2016-08-01',
        status: 'ongoing',
        impact: '累计种植真树超过2亿棵'
      }
    ]
  },
  {
    id: '4',
    name: '上海联劝公益基金会',
    englishName: 'Shanghai United Foundation',
    description: '专注于培育和支持民间公益组织发展的公募基金会。',
    logo: '',
    website: 'https://www.lianquan.org',
    category: 'community',
    location: {
      province: '上海市',
      city: '上海市',
      district: '黄浦区',
      address: '上海市黄浦区复兴中路505号',
      coordinates: { lat: 31.2304, lng: 121.4737 }
    },
    foundedYear: 2009,
    scale: 'municipal',
    focusAreas: ['volunteer_service', 'community', 'capacity_building'],
    contactInfo: {
      email: 'info@lianquan.org',
      phone: '021-54510557',
      address: '上海市黄浦区复兴中路505号'
    },
    socialMedia: {
      wechat: 'SULF_2009',
      weibo: '@上海联劝公益基金会'
    },
    certifications: ['公募基金会', '4A级社会组织']
  },
  {
    id: '5',
    name: '北京春苗慈善基金会',
    englishName: 'Beijing Spring Bud Charity Foundation',
    description: '专注于儿童医疗救助和健康服务的慈善组织。',
    logo: '',
    website: 'https://www.chunmiao.org',
    category: 'children',
    location: {
      province: '北京市',
      city: '北京市',
      district: '海淀区',
      address: '北京市海淀区学院路30号',
      coordinates: { lat: 39.9906, lng: 116.3644 }
    },
    foundedYear: 2010,
    scale: 'municipal',
    focusAreas: ['child_protection', 'medical_assistance', 'health_education'],
    contactInfo: {
      email: 'info@chunmiao.org',
      phone: '010-82319999',
      address: '北京市海淀区学院路30号'
    },
    socialMedia: {
      wechat: 'CHUNMIAO_2010',
      weibo: '@北京春苗慈善基金会'
    },
    certifications: ['非公募基金会', '3A级社会组织'],
    projects: [
      {
        id: 'p3',
        name: '春苗医疗救助',
        description: '为贫困家庭儿童提供医疗费用资助',
        startDate: '2010-05-01',
        status: 'ongoing',
        impact: '已救助患病儿童超过5000名'
      }
    ]
  },
  {
    id: '6',
    name: '深圳壹基金公益基金会',
    englishName: 'One Foundation',
    description: '以"尽我所能，人人公益"为愿景的公益平台。',
    logo: '',
    website: 'https://www.onefoundation.cn',
    category: 'disaster',
    location: {
      province: '广东省',
      city: '深圳市',
      district: '罗湖区',
      address: '深圳市罗湖区深南东路5016号京基一百大厦A座',
      coordinates: { lat: 22.5431, lng: 114.1315 }
    },
    foundedYear: 2011,
    scale: 'national',
    focusAreas: ['emergency_response', 'disaster', 'child_protection'],
    contactInfo: {
      email: 'info@onefoundation.cn',
      phone: '0755-25339511',
      address: '深圳市罗湖区深南东路5016号京基一百大厦A座'
    },
    socialMedia: {
      wechat: 'OneFDN',
      weibo: '@壹基金'
    },
    certifications: ['全国性公募基金会', '5A级社会组织'],
    achievements: [
      {
        id: 'a3',
        title: '全球华人慈善榜十大慈善项目',
        description: '壹乐园计划获得全球华人慈善榜十大慈善项目',
        year: 2018,
        type: 'award'
      }
    ]
  },
  {
    id: '7',
    name: '爱德基金会',
    englishName: 'Amity Foundation',
    description: '以推动我国社会发展与进步为宗旨的全国性公募基金会。',
    logo: '',
    website: 'https://www.amityfoundation.org',
    category: 'healthcare',
    location: {
      province: '江苏省',
      city: '南京市',
      district: '玄武区',
      address: '南京市玄武区汉中路71号',
      coordinates: { lat: 32.0603, lng: 118.7969 }
    },
    foundedYear: 1985,
    scale: 'national',
    focusAreas: ['medical_assistance', 'rural_education', 'poverty_alleviation'],
    contactInfo: {
      email: 'info@amityfoundation.org',
      phone: '025-83260800',
      address: '南京市玄武区汉中路71号'
    },
    socialMedia: {
      wechat: 'AMITY_1985',
      weibo: '@爱德基金会'
    },
    certifications: ['全国性公募基金会', '5A级社会组织']
  },
  {
    id: '8',
    name: '中国残疾人福利基金会',
    englishName: 'China Disabled Persons\' Federation Foundation',
    description: '致力于改善残疾人状况，促进残疾人平等参与社会生活的基金会。',
    logo: '',
    website: 'https://www.cdpf.org.cn',
    category: 'disabled',
    location: {
      province: '北京市',
      city: '北京市',
      district: '西城区',
      address: '北京市西城区西直门南小街186号',
      coordinates: { lat: 39.9362, lng: 116.3667 }
    },
    foundedYear: 1984,
    scale: 'national',
    focusAreas: ['disability_support', 'medical_assistance', 'vocational_training'],
    contactInfo: {
      email: 'cdpf@cdpf.org.cn',
      phone: '010-66580142',
      address: '北京市西城区西直门南小街186号'
    },
    socialMedia: {
      wechat: 'CDPF_1984',
      weibo: '@中国残疾人福利基金会'
    },
    certifications: ['全国性公募基金会', '5A级社会组织']
  },
  {
    id: '9',
    name: '腾讯公益慈善基金会',
    englishName: 'Tencent Foundation',
    description: '腾讯公司发起的企业基金会，致力于推动"科技向善"理念。',
    logo: '',
    website: 'https://gongyi.qq.com',
    category: 'technology',
    location: {
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      address: '深圳市南山区科技中一路腾讯大厦',
      coordinates: { lat: 22.5392, lng: 113.9345 }
    },
    foundedYear: 2007,
    scale: 'national',
    focusAreas: ['digital_inclusion', 'education', 'rural_development'],
    contactInfo: {
      email: 'foundation@tencent.com',
      phone: '0755-86013388',
      address: '深圳市南山区科技中一路腾讯大厦'
    },
    socialMedia: {
      wechat: 'TencentFoundation',
      weibo: '@腾讯公益'
    },
    certifications: ['非公募基金会', '4A级社会组织']
  },
  {
    id: '10',
    name: '中国妇女发展基金会',
    englishName: 'China Women\'s Development Foundation',
    description: '致力于妇女发展与性别平等的全国性公募基金会。',
    logo: '',
    website: 'https://www.cwdf.org.cn',
    category: 'children',
    location: {
      province: '北京市',
      city: '北京市',
      district: '东城区',
      address: '北京市东城区建国门内大街15号',
      coordinates: { lat: 39.9075, lng: 116.4212 }
    },
    foundedYear: 1988,
    scale: 'national',
    focusAreas: ['gender_equality', 'women_empowerment', 'child_protection'],
    contactInfo: {
      email: 'cwdf@cwdf.org.cn',
      phone: '010-65103478',
      address: '北京市东城区建国门内大街15号'
    },
    socialMedia: {
      wechat: 'CWDF_1988',
      weibo: '@中国妇女发展基金会'
    },
    certifications: ['全国性公募基金会', '5A级社会组织'],
    projects: [
      {
        id: 'p4',
        name: '春蕾计划',
        description: '救助贫困地区失学女童重返校园',
        startDate: '1989-04-01',
        status: 'ongoing',
        impact: '已帮助369万女童重新走进课堂'
      }
    ]
  }
];

export const provinceList = [
  '北京市', '天津市', '上海市', '重庆市',
  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
  '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '海南省',
  '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
  '内蒙古自治区', '广西壮族自治区', '宁夏回族自治区', '新疆维吾尔自治区', '西藏自治区',
  '香港特别行政区', '澳门特别行政区', '台湾省'
];
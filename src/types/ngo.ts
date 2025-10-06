export interface NGOOrganization {
  id: string;
  name: string;
  englishName?: string;
  description: string;
  logo: string;
  website?: string;
  category: NGOCategory;
  location: Location;
  foundedYear?: number;
  scale: OrganizationScale;
  focusAreas: FocusArea[];
  contactInfo: ContactInfo;
  socialMedia?: SocialMedia;
  certifications?: string[];
  achievements?: Achievement[];
  projects?: Project[];
}

export interface Location {
  province: string;
  city: string;
  district?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface SocialMedia {
  wechat?: string;
  weibo?: string;
  douyin?: string;
  bilibili?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  type: 'award' | 'recognition' | 'milestone';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'planning' | 'ongoing' | 'completed' | 'paused';
  impact?: string;
}

export type NGOCategory = 
  | 'education'      // 教育公益
  | 'healthcare'     // 医疗健康
  | 'environment'    // 环境保护
  | 'poverty'        // 扶贫济困
  | 'elderly'        // 养老助老
  | 'children'       // 儿童关爱
  | 'disabled'       // 助残服务
  | 'disaster'       // 灾害救助
  | 'culture'        // 文化传承
  | 'animal'         // 动物保护
  | 'community'      // 社区服务
  | 'technology'     // 科技公益
  | 'other';         // 其他

export type FocusArea = 
  | 'rural_education'      // 乡村教育
  | 'medical_assistance'   // 医疗援助
  | 'climate_action'       // 气候行动
  | 'poverty_alleviation'  // 脱贫攻坚
  | 'senior_care'          // 养老照护
  | 'child_protection'     // 儿童保护
  | 'disability_support'   // 残障支持
  | 'emergency_response'   // 应急响应
  | 'cultural_heritage'    // 文化遗产
  | 'wildlife_protection'  // 野生动物保护
  | 'volunteer_service'    // 志愿服务
  | 'digital_inclusion'    // 数字包容
  | 'mental_health'        // 心理健康
  | 'food_security'        // 食品安全
  | 'water_sanitation'     // 水利卫生
  | 'sustainable_development' // 可持续发展
  | 'human_rights'         // 人权保护
  | 'gender_equality'      // 性别平等
  | 'youth_development'    // 青年发展
  | 'entrepreneurship'     // 创业扶持
  | 'research_advocacy';   // 研究倡导

export type OrganizationScale = 
  | 'national'    // 全国性
  | 'regional'    // 区域性
  | 'provincial'  // 省级
  | 'municipal'   // 市级
  | 'local';      // 地方性

export interface CategoryInfo {
  id: NGOCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface FilterOptions {
  categories: NGOCategory[];
  provinces: string[];
  scales: OrganizationScale[];
  focusAreas: FocusArea[];
  searchKeyword?: string;
}
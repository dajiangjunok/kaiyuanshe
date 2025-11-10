import React, { useState } from 'react'
import styles from './index.module.css'

const AboutPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageAlt, setImageAlt] = useState<string>('')

  const openModal = (imageSrc: string, alt: string = '') => {
    setSelectedImage(imageSrc)
    setImageAlt(alt)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setImageAlt('')
  }
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src="/img/about/banner.jpeg"
          alt="开源社"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>你好， 开源社</h1>
          <p className={styles.heroSubtitle}>
            KAIYUANSHE - 致力于推动开源发展的社区
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Content Area */}
        <main className={styles.contentArea}>
          {/* Introduction Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>一、我们从何而来</h2>
            <p className={styles.text}>
              开源社（"KAIYUANSHE®"）成立于 2014 年，是由志愿贡献于开源事业的个人成员，依 "贡献、共识、共治" 原则所组成，始终维持 "厂商中立、公益、非营利" 的理念，以 "立足中国、贡献全球，推动开源成为新时代的生活方式" 为愿景，以 "开源治理、国际接轨、社区发展、项目孵化" 为使命，旨在共创健康可持续发展的开源生态体系。
            </p>
            
            <div className={styles.imageContainer}>
              <img src="/img/about/where.webp" alt="开源社四大使命" className={styles.contentImage} />
              <p className={styles.imageCaption}>开源社四大使命</p>
            </div>

            <p className={styles.text}>
              开源社是中国领先的，纯社区驱动，中立开放的组织，积极与支持开源的社区、高校、企业、社会组织以及政府相关单位紧密合作，同时也是全球开源许可证认证组织 OSI 在中国的首个成员；获选由中国科协科学技术传播中心、中国计算机学会、中国通信学会、中国科学院软件研究所联合评选的"开源创新榜单-年度开源社区"。
            </p>

            <p className={styles.text}>
              开源社自2016年起连续举办中国开源年会（COSCon），持续发布 《中国开源年度报告》，联合发起了"中国开源先锋榜"、"中国开源码力榜"等，在海内外产生了广泛的影响力。十余年来，开源社链接了数万名开源人，集聚了上千名社区成员及志愿者、海内外数百位讲师，合作了数百家赞助、媒体、社区伙伴，在各方支持下持续发展壮大。
            </p>
          </section>

          {/* What We Do Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>二、我们在做什么</h2>
            
            <div className={styles.imageContainer}>
              <img src="/img/about/how.webp" alt="开源社的工作" className={styles.contentImage} />
              <p className={styles.imageCaption}>开源社的工作</p>
            </div>

            <h3 className={styles.subsectionTitle}>开源治理</h3>
            <p className={styles.text}>
              2014年，开源社与欧洲最知名的开源治理社区 OSS-Watch 合作，在开源社官网提供开源治理工具；设立法律咨询委员会为社区免费提供开源治理咨询服务。
            </p>

            <p className={styles.text}>
              自 2015 年开始，陆续发布了《中国开源年度报告》（早期名：《中国开源生态系统年度报告》），以及开源社区参与调查报告等。
            </p>

            <p className={styles.text}>
              2016 年 1 月，开源社加入 Open Source Initiative (OSI，开源促进会) ，是 OSI 联盟的首家中国成员。
            </p>

            <p className={styles.text}>
              2019 年，开源社参与编制首个中英双语国际开源许可证 "木兰宽松许可证"，并推动许可证 MulanPSL v2 通过 OSI 认证，被批准为国际类别开源许可证（International licenses）。
            </p>

            <p className={styles.text}>
              2020 年，开源社参与了中国电子技术标准化研究院发起之《开源社区贡献者贡献度评估参考框架》编制；同年，开源社发布了欢迎开源协作的《开源人宣言》。
            </p>

            <p className={styles.text}>
              2021 年，开源社联合腾源会发起了"WeOpen Good 开源公益计划"，推动用开源技术赋能公益组织。2024 年，开源社发起"OpenGood 开源公益"行动，获评为"2024年中国开放科学优秀行动"，并发布业界首批针对开源公益的 OpenGood 开源公益优秀案例。
            </p>

            <p className={styles.text}>
              2022 年，开源社参与中国电子技术标准化研究院与国防科技大学联合组织的木兰开放作品许可证编制工作；参与《信息技术 开源 开源项目评估模型参考架构》标准的制定；参与中国科协"科创中国"开源创新榜评审工作；联合 X-lab 开放实验室审校出版译作《拥抱开源》和《开放式协作:开源软件的生产与维护》两本书籍。
            </p>

            <p className={styles.text}>
              2024 年，开源社参与并募集国内的社区和公司支持 OSI 发布的开源人工智能定义（Open Source AI Definition），同时参与编写中国信通院的《开源大模型应用指南1.0》和《开源办公室（OSPO）洞察报告（2024）》等报告。
            </p>

            <p className={styles.text}>
              2025 年，开源社受邀作为 Linux 基金会"主权 AI 圆桌"的亚太区代表，积极参与国际议题对话，为全球开源与主权人工智能治理贡献亚洲视角与实践经验。同年，发起围绕开源治理与社区发展的系列线上专题讲座"醒源大讲堂"。
            </p>

            <p className={styles.text}>
              2023-2025年，开源社连续三年参与到 Open Source Congress（开源国会）的组织与讨论，作为来自中国、代表亚洲的社区力量，在全球开源舞台上持续发出重要声音。
            </p>

            <div className={styles.imageContainer}>
              <img src="/img/about/2024.webp" alt="开源治理" className={styles.contentImage} />
            </div>

            <h3 className={styles.subsectionTitle}>国际/跨境接轨</h3>
            <p className={styles.text}>
              开源社始终秉持「带进来、走出去」的理念，积极与全球顶尖的开源社区、基金会和企业建立合作，包括：
            </p>

            <ul className={styles.list}>
              <li>Apache Software Foundation (ASF)</li>
              <li>CNCF Foundation</li>
              <li>COSCUP</li>
              <li>Ethereum Foundation</li>
              <li>FOSSASIA</li>
              <li>FOSDEM</li>
              <li>FreeBSD Foundation</li>
              <li>freeCodeCamp</li>
              <li>GNOME Foundation</li>
              <li>GitHub</li>
              <li>GOSIM</li>
              <li>Linux Foundation</li>
              <li>Node.js Foundation</li>
              <li>Open Innovation Networks (OIN)</li>
              <li>Open Source Hardware Association (OSHWA)</li>
              <li>Open Source Initiative (OSI)</li>
              <li>OpenChain</li>
              <li>OpenInfra Foundation</li>
              <li>OSS Watch</li>
              <li>RISC-V Foundation</li>
              <li>Rust Foundation</li>
              <li>Amazon Web Services（AWS）</li>
              <li>Google</li>
              <li>Microsoft</li>
              <li>...</li>
            </ul>

            <p className={styles.text}>
              我们持续推动与国内外机构的深入交流与合作，积极为本土优质开源项目对接国际资源、参与全球生态、加入如 ASF 等国际基金会孵化器搭建桥梁。
            </p>

            <p className={styles.text}>
              同时，开源社及中国开源年会（COSCon）凭借其中立、开放与专业的定位，已获得多家国际顶级基金会、企业及社区的长期关注与积极参与，成为中国开源走向国际的重要窗口。
            </p>

            <div className={styles.imageContainer}>
              <img src="/img/about/COSCon.webp" alt="Stefano Maffulli with Board Directors" className={styles.contentImage} />
              <p className={styles.imageCaption}>Stefano Maffulli with Board Directors of KAIYUANSHE: Emily Chen, Nadia Jiang (photo credits), and Ted Liu.</p>
            </div>

            <h3 className={styles.subsectionTitle}>社区发展</h3>
            <p className={styles.text}>
              开源社连续十年举办"中国开源年会COSCon"，海内外开源大咖和厂商云集，与超百家开源社区合作，主会场和各地 KCC 分会场联动，打造开源社区盛会。最早在2015 年 10 月，我们在 ASF 支持下主办了 Apache 中国路演；2016-2024连续九年举办了中国开源年会 (COSCon) ，现已成为国内最具影响力的开源盛会，COSCon 连续多年荣获思否评选的 "中国最受开发者欢迎的技术活动"。
            </p>

            <div className={styles.imageContainer}>
              <img src="/img/about/exhibition1.webp" alt="2021-2024年中国开源年会" className={styles.contentImage} />

                <img src="/img/about/exhibition2.webp"  className={styles.contentImage} />

              <p className={styles.imageCaption}>2021-2024年中国开源年会</p>
            </div>

            <div className={styles.imageGrid}>
            
              <img 
                src="/img/about/coscon-1.webp"  
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/coscon-1.webp', 'COSCon 合影')}
                alt="COSCon 合影"
              />
              <img 
                src="/img/about/coscon-2.webp"  
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/coscon-2.webp', 'COSCon 合影')}
                alt="COSCon 合影"
              />
              <img 
                src="/img/about/coscon-3.webp"  
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/coscon-3.webp', 'COSCon 合影')}
                alt="COSCon 合影"
              />
              <img 
                src="/img/about/coscon-4.webp"  
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/coscon-4.webp', 'COSCon 合影')}
                alt="COSCon 合影"
              />
             
            </div>
            <p className={styles.imageCaption}>COSCon 合影</p>

            <p className={styles.text}>
              我们发展和汇聚了规模庞大、类型广泛的开源社区合作伙伴，与诸多社区共同营造友好、平等、互助的开源合作氛围，并积极作为国内各类开源活动的社区合作伙伴，如：开放原子开源生态大会/开发者大会、COPU开源中国开源世界大会、CCF中国开源年度大会、外滩大会开源嘉年华、FOSSASIA Summit、GOSIM China、CommunityOverCode ASIA（ApacheCon）、KubeCon China、OSCAR开源产业大会、GOTC全球开源技术峰会、GDPS全球开发者先锋大会、RISC-V Summit China、Dev.together开发者生态峰会、OSPO Summit、中关村开源生态论坛、OpenInfra Days China、上海开源产业生态大会、LF AI&DATA AICON、中日韩三国IT局长OSS会议暨东北亚开源软件推进论坛、木兰开源峰会、GitHub Universe、CSDN 1024程序员节、蚂蚁开源技术沙龙、华为云开源开发者论坛、字节跳动开源Open Day、AWS Community Day等，推动各类社区生态的交流与融合。
            </p>

            <div className={styles.imageGrid}>
              <img 
                src="/img/about/community-1.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-1.webp', '社区合作活动')}
              />
              <img 
                src="/img/about/community-2.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-2.webp', '社区合作活动')}
              />
              <img 
                src="/img/about/community-3.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-3.webp', '社区合作活动')}
              />
              <img 
                src="/img/about/community-4.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-4.webp', '社区合作活动')}
              />
              <img 
                src="/img/about/community-5.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-5.webp', '社区合作活动')}
              />
              <img 
                src="/img/about/community-6.webp" 
                alt="社区合作活动" 
                className={styles.gridImage} 
                onClick={() => openModal('/img/about/community-6.webp', '社区合作活动')}
              />
            </div>
            <p className={styles.imageCaption}>社区合作活动合影</p>

            <h3 className={styles.subsectionTitle}>中国开源年度报告</h3>
            <p className={styles.text}>
              中国开源的开发者调查、生态环境报告、深度专题分析，特别是整合了 GitHub 和 Gitee 这两大国内外开源代码平台的统计数据，同时也开放了统计程序的代码。
            </p>

            <ul className={styles.list}>
              <li>2015 年：<a href="https://kaiyuanshe.github.io/document/china-os-report-2015" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/document/china-os-report-2015</a></li>
              <li>2016 年：<a href="https://github.com/kaiyuanshe/2016-China-Open-Source-Report" target="_blank" rel="noopener noreferrer">https://github.com/kaiyuanshe/2016-China-Open-Source-Report</a></li>
              <li>2018 年：<a href="https://kaiyuanshe.github.io/2018-China-Open-Source-Report" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/2018-China-Open-Source-Report</a></li>
              <li>2019 年：<a href="https://kaiyuanshe.github.io/2019-China-Open-Source-Report" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/2019-China-Open-Source-Report</a></li>
              <li>2020 年：<a href="https://kaiyuanshe.github.io/document/china-os-report-2020" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/document/china-os-report-2020</a></li>
              <li>2021 年：<a href="https://kaiyuanshe.github.io/document/china-os-report-2020" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/document/china-os-report-2020</a></li>
              <li>2022 年：<a href="https://kaiyuanshe.feishu.cn/wiki/wikcnnJ8b90pOoDRFzXngfRslkd" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.feishu.cn/wiki/wikcnnJ8b90pOoDRFzXngfRslkd</a></li>
              <li>2023 年：<a href="https://kaiyuanshe.github.io/2023-China-Open-Source-Report" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/2023-China-Open-Source-Report</a></li>
              <li>2024 年：<a href="https://kaiyuanshe.github.io/2024-China-Open-Source-Report" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.github.io/2024-China-Open-Source-Report</a></li>
            </ul>

            <div className={styles.imageContainer}>
              <img src="/img/about/kaiyuan.webp" alt="历届中国开源年度报告" className={styles.contentImage} />
              <p className={styles.imageCaption}>历届中国开源年度报告</p>
            </div>

            <h3 className={styles.subsectionTitle}>开源项目</h3>
            <p className={styles.text}>
              在开源项目方面，开源社联合社区贡献者开发了多个开源项目，详情请查看开源社 GitHub 仓库：
            </p>
            <ul className={styles.list}>
              <li><a href="https://github.com/kaiyuanshe" target="_blank" rel="noopener noreferrer">https://github.com/kaiyuanshe</a></li>
            </ul>

            <h3 className={styles.subsectionTitle}>开源教育</h3>
            <p className={styles.text}>
              2014 年起，开源社发起中国第一批开源进校园系列巡回演讲活动"开源者行"，旨在中国高校中推广开源技术和文化。
            </p>

            <p className={styles.text}>
              2017 年，开源社执委会下设立开源教育组、高校合作组等专注开源教育的工作组；2025 年，转为开源教育 SIG 组。
            </p>

            <p className={styles.text}>
              2018 年，开源社在第三届中国开源年会上出品了最早的开源教育分论坛，此后每届 COSCON 上均设置有开源教育及人才培养相关论坛。
            </p>

            <p className={styles.text}>
              2019 年，开源社在华东师范大学捐赠设立"中国开源软件教育基金"，该项目是中国首个开源教育基金，资金用于围绕开源教育相关的学生培养、学生奖励、开源创新创业、开源社团、社会实践等活动。
            </p>

            <p className={styles.text}>
              2020 年，开源社发布系列开源教育视频课程《开源特训营》，系统教学开源入门；同年作为组委会成员参与中科院软件所、openEuler社区在举办的"暑期2020"活动（即首届"开源之夏"），并与主办方联合发起"大咖说开源"系列讲座，为高校同学介绍开源理念、开源文化，讲解参与开源社区的方式方法。此后持续与开源之夏保持合作。
            </p>

            <p className={styles.text}>
              2022 年，开源社作为首届中国计算机学会 GitLink 编程夏令营（GLCC）社区合作伙伴；次年，开源社成为 GLCC 2023 顾问委员会成员。
            </p>

            <p className={styles.text}>
              2023 年，开源社在COSCon'23发起国内首个青少年开源论坛，由OpenTeens社区举办，聚焦小初高同学的开源启蒙和开源实践探索分享。
            </p>
          </section>

          {/* How We Operate Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>三、我们如何运作</h2>
            <p className={styles.text}>
              开源社由个人正式成员选举组成理事会，由理事会任命组成执行委员会以及项目委员会。执行委员会负责各个工作组的日常运作，项目委员会负责各个项目的孵化推进，并设立由企业、高校、社区与个人开源专家组成的顾问委员会，以及法律咨询委员会。
            </p>

            <div className={styles.imageContainer}>
              <img src="/img/about/operation1.webp" alt="开源社组织架构（2025）" className={styles.contentImage} />
              <p className={styles.imageCaption}>开源社组织架构（2025）</p>
            </div>

            <div className={styles.imageContainer}>
              <img src="/img/about/lishi.webp" alt="开源社 2025 届理事会" className={styles.contentImage} />
              <p className={styles.imageCaption}>开源社 2025 届理事会</p>
            </div>

            <p className={styles.text}>
              2025届理事（依姓氏拼音排序）：陈阳、江波（理事长）、李明康、梁尧（执行长）、林旅强（副理事长）、许银、庄表伟（项目委员会主席）
            </p>
          </section>

          {/* Contact Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>四、联系我们</h2>
            <ul className={styles.contactList}>
              <li>官网：<a href="https://kaiyuanshe.cn" target="_blank" rel="noopener noreferrer">https://kaiyuanshe.cn</a></li>
              <li>社交媒体账号：
                <ul className={styles.subList}>
                  <li>公众号：开源社KAIYYUANSHE</li>
                  <li>X（Twitter）：@开源社KAIYUANSHE</li>
                  <li>Linkedin：@kaiyuanshe</li>
                </ul>
              </li>
              <li>联系邮箱：contact@kaiyuanshe.org</li>
            </ul>

            <div className={styles.highlightBox}>
              <h3>近期重要活动：</h3>
              <p>12月6至7日将举办第十届中国开源年会（COSCon'25）</p>
              <p>Open Source, Open Intelligence｜第十届中国开源年会议题征集正式启动！</p>
            </div>
          </section>

          {/* Acknowledgments Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>鸣谢</h2>
            <p className={styles.text}>
              特别感谢我们的年度合作伙伴们对开源社和开源事业的长期支持。
            </p>
            
            <div className={styles.imageContainer}>
              <img src="/img/about/thanks1.webp" alt="合作伙伴" className={styles.contentImage} />
            </div>
          </section>

          {/* Brief Introduction Box */}
          <section className={styles.briefSection}>
            <div className={styles.briefBox}>
              <h3 className={styles.briefTitle}>开源社简介</h3>
              <p className={styles.briefText}>
                开源社（英文名称为"KAIYUANSHE®"）成立于 2014 年，是由志愿贡献于开源事业的个人志愿者，依 "贡献、共识、共治" 原则所组成的开源社区。开源社始终维持 "厂商中立、公益、非营利" 的理念，以 "立足中国、贡献全球，推动开源成为新时代的生活方式" 为愿景，以 "开源治理、国际接轨、社区发展、项目孵化" 为使命，旨在共创健康可持续发展的开源生态体系。
              </p>
              
              <p className={styles.briefText}>
                开源社积极与支持开源的社区、高校、企业、社会组织以及政府相关单位紧密合作，同时也是全球开源许可证认证组织 OSI 在中国的首个成员，获选由中国科协科学技术传播中心、中国计算机学会、中国通信学会、中国科学院软件研究所联合评选的"开源创新榜单-年度开源社区"。
              </p>
              
              <p className={styles.briefText}>
                自2016年起连续举办中国开源年会（COSCon），持续发布《中国开源年度报告》，联合发起了"中国开源先锋榜"、"中国开源码力榜"等，在海内外产生了广泛的影响力。十余年来，开源社链接了数万名开源人，集聚了上千名社区成员及志愿者、海内外数百位讲师，合作了数百家赞助、媒体、社区伙伴，在各方支持下持续发展壮大。
              </p>
            </div>
          </section>

          {/* Help Section */}
          <section id="help" className={styles.section}>
            <img
              src="/img/about/help.gif"
              alt="帮助"
              className={styles.heroImage}
            />
          </section>
        </main>
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseButton} onClick={closeModal}>
              ×
            </button>
            <img 
              src={selectedImage} 
              alt={imageAlt} 
              className={styles.modalImage}
            />
            {imageAlt && <p className={styles.modalCaption}>{imageAlt}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutPage

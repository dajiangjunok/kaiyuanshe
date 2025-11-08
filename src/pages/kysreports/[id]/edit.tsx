import { useCallback, useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Tag,
  App as AntdApp,
  Select,
} from 'antd';
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Users,
  FileText,
  ImageIcon,
  Save,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import styles from './edit.module.css';

import VditorEditor from '@/components/vditorEditor/VditorEditor';
// import QuillEditor from '@/components/quillEditor/QuillEditor';
import UploadCardImg from '@/components/uploadCardImg/UploadCardImg';

import { getArticleById, updateArticle } from '@/pages/api/article';

const { TextArea } = Input;

export default function EditArticlePage() {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const rId = Array.isArray(id) ? id[0] : id;
  const [loading, setLoading] = useState(true);

  const [article, setArticle] = useState<Record<string, unknown>>();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cloudinaryImg, setCloudinaryImg] = useState<Record<string, unknown>>();
  const [category] = useState('kys_annual_report');



  // 编辑器处理
  const handleVditorEditorChange = useCallback(
    (value: string) => {
      form.setFieldValue('content', value);
    },
    [form]
  );

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      console.log(values);
      setIsSubmitting(true);

      const updateArticleRequest = {
        title: values.title || '',
        description: values.description || '',
        content: values.content || '',
        source_link: values.source || '',
        category: category,
        cover_img: cloudinaryImg?.secure_url || previewUrl, // 当用户未修改封面则使用详情返回的previewUrl
        tags: tags,
        license: values.license || '',
        author: values.author || '',
        editor: values.editor || '',
        translator: values.translator || '',
      };

      const result = await updateArticle(article.ID, updateArticleRequest);
      if (result.success) {
        message.success(result.message);
        router.push('/kysreports');
      } else {
        message.error(result.message || '更新年度报告失败');
      }
    } catch (error: unknown) {
      console.error('更新年度报告失败:', error);
      message.error('更新年度报告出错，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');
      console.log('添加标签后:', newTags);
    }
    setInputVisible(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    console.log('删除标签后:', newTags);
  };

  useEffect(() => {
    if (!router.isReady || !rId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getArticleById(rId);

        if (response.success) {
          setArticle(response?.data);
          form.setFieldsValue({
            title: response.data?.title,
            description: response.data?.description,
            content: response.data?.content,
            source: response.data?.source_link,
            category: response.data?.category,
            cover: response.data?.cover_img,
            author: response.data?.author,
            translator: response.data?.translator || '',
            editor: response.data?.editor,
            license: response.data?.license,
          });
          setPreviewUrl(response.data?.cover_img || '');
          setTags(response.data?.tags || []);
        }
      } catch {
        message.error('加载失败');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, rId, form, message]);

  if (!loading && !article) {
    return (
      <div className={styles.error}>
        <h2>年度报告不存在</h2>
        <p>抱歉，找不到您要查看的年度报告</p>
        <Link href="/kysreports" className={styles.backButton}>
          返回年度报告列表
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.header}>
        <Link href="/kysreports" className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          返回年度报告列表
        </Link>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.form}
        initialValues={{
          publishImmediately: true,
        }}
      >
        <div className={styles.formGrid}>
          {/* 左侧表单 */}
          <div className={styles.leftColumn}>
            {/* 基本信息 */}
            <Card className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FileText className={styles.sectionIcon} />
                基本信息
              </h2>

              <Form.Item
                label="年度报告标题"
                name="title"
                rules={[{ required: true, message: '请输入年度报告标题' }]}
              >
                <Input
                  placeholder="请输入年度报告标题"
                  className={styles.input}
                  maxLength={30}
                  showCount
                />
              </Form.Item>
              <Form.Item
                label="年度报告描述"
                name="description"
                rules={[{ required: true, message: '请输入年度报告描述' }]}
              >
                <TextArea
                  rows={2}
                  maxLength={60}
                  showCount
                  placeholder="请输入年度报告描述"
                />
              </Form.Item>
              <Form.Item
                label="年度报告内容"
                name="content"
                rules={[{ required: true, message: '请输入年度报告内容' }]}
              >
                <VditorEditor
                  value={form.getFieldValue('content')}
                  onChange={handleVditorEditorChange}
                  height={900}
                />
              </Form.Item>
            </Card>
          </div>

          {/* 右侧表单 */}
          <div className={styles.rightColumn}>
            {/* 年度报告封面 */}
            <Card className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <ImageIcon className={styles.sectionIcon} />
                年度报告封面
              </h2>
              <Form.Item
                name="cover"
                rules={[{ required: true, message: '请上传年度报告封面' }]}
              >
                <UploadCardImg
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  cloudinaryImg={cloudinaryImg}
                  setCloudinaryImg={setCloudinaryImg}
                  form={form}
                />
              </Form.Item>
            </Card>

            {/* 原文链接 */}
            <Card className={styles.section}>
              <Form.Item
                label="原文链接"
                name="source"
                rules={[
                  {
                    type: 'url',
                    message: '请输入有效的链接地址',
                  },
                ]}
              >
                <Input placeholder="请输入原文链接" className={styles.input} />
              </Form.Item>
              <Form.Item
                label="版权声明"
                name="license"
                rules={[{ message: '请选择版权声明' }]}
              >
                <Select placeholder="请选择版权声明">
                  <Select.Option value="CCO">CCO(公共领域贡献)</Select.Option>
                  <Select.Option value="CC-4.0">CC-4.0(知识共享 4.0 国际许可协议)</Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                label="分类"
                name="category"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Select.Option value="original">原创</Select.Option>
                  <Select.Option value="translation">翻译</Select.Option>
                  <Select.Option value="archive">归档</Select.Option>
                </Select>
              </Form.Item> */}
            </Card>

            {/* 参与人员 */}
            <Card className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Users className={styles.sectionIcon} />
                作者与协作者
              </h2>

              <div className={styles.formRow}>
                <Form.Item
                  label="作者"
                  name="author"
                  rules={[{ required: true, message: '请输入作者姓名' }]}
                >
                  <Input placeholder="请输入作者" maxLength={10} showCount />
                </Form.Item>
              </div>

              <div className={styles.formRow}>
                <Form.Item label="翻译" name="translator">
                  <Input
                    placeholder="请输入翻译（可选）"
                    maxLength={10}
                    showCount
                  />
                </Form.Item>
              </div>
              <div className={styles.formRow}>
                <Form.Item label="编辑" name="editor">
                  <Input
                    placeholder="请输入编辑"
                    maxLength={10}
                    showCount
                  />
                </Form.Item>
              </div>
            </Card>

            {/* 标签 */}
            <Card className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Plus className={styles.sectionIcon} />
                年度报告标签
              </h2>

              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveTag(tag)}
                    className={styles.tag}
                  >
                    {tag}
                  </Tag>
                ))}
                {inputVisible ? (
                  <Input
                    type="text"
                    size="small"
                    className={styles.tagInput}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleAddTag}
                    onPressEnter={handleAddTag}
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setInputVisible(true)}
                    className={styles.addTagButton}
                  >
                    <Plus className={styles.addTagIcon} />
                    添加标签
                  </button>
                )}
              </div>
            </Card>

          </div>
        </div>

        {/* 提交按钮 */}
        <div className={styles.submitSection}>
          <Button onClick={() => router.back()} className={styles.cancelButton}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            <Save className={styles.submitIcon} />
            {isSubmitting ? '更新中...' : '更新年度报告'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

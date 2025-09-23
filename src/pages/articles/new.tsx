import { useCallback, useState } from 'react';
import { Form, Input, Button, Card, Tag, App as AntdApp, Select } from 'antd';
import {
  ArrowLeft,
  Users,
  FileText,
  ImageIcon,
  Save,
  Plus,
  Link as LinkIcon,
} from 'lucide-react';
import Link from 'next/link';
import styles from './new.module.css';

import VditorEditor from '@/components/vditorEditor/VditorEditor';
// import QuillEditor from '@/components/quillEditor/QuillEditor';
import UploadCardImg from '@/components/uploadCardImg/UploadCardImg';

import { createArticle } from '../api/article';
import router from 'next/router';

const { TextArea } = Input;

export default function NewArticlePage() {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();

  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cloudinaryImg, setCloudinaryImg] = useState<any>();

  // 编辑器处理
  const handleVditorEditorChange = useCallback(
    (value: string) => {
      form.setFieldValue('content', value);
    },
    [form]
  );

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      setIsSubmitting(true);

      const createArticleRequest = {
        title: values.title || '',
        description: values.description || '',
        content: values.content || '',
        source_link: values.source || '',
        category: values.category || '',
        license: values.license || '',
        cover_img: cloudinaryImg?.secure_url || '',
        tags: tags,
        author: values.author || '',
        translator: values.translator || '',
      };

      const result = await createArticle(createArticleRequest);
      if (result.success) {
        message.success(result.message);
        router.push('/articles');
      } else {
        message.error(result.message || '创建文章失败');
      }
    } catch (error) {
      console.error('创建文章失败:', error);
      message.error('创建文章出错，请重试');
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

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.header}>
        <Link href="/blogs" className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          返回文章列表
        </Link>
      </div>

      <div className={styles.titleSection}>
        <h1 className={styles.title}>新建文章</h1>
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
                label="文章标题"
                name="title"
                rules={[{ required: true, message: '请输入文章标题' }]}
              >
                <Input
                  placeholder="请输入文章标题"
                  className={styles.input}
                  maxLength={30}
                  showCount
                />
              </Form.Item>
              <Form.Item
                label="文章描述"
                name="description"
                rules={[{ required: true, message: '请输入文章描述' }]}
              >
                <TextArea
                  rows={2}
                  maxLength={60}
                  showCount
                  placeholder="请输入文章描述"
                />
              </Form.Item>
              <Form.Item
                label="文章内容"
                name="content"
                rules={[{ required: true, message: '请输入文章内容' }]}
              >
                {/* <QuillEditor
                  value={form.getFieldValue('content')}
                  onChange={handleQuillEditorChange}
                /> */}
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
            {/* 文章封面 */}
            <Card className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <ImageIcon className={styles.sectionIcon} />
                文章封面
              </h2>
              <Form.Item
                name="cover"
                rules={[{ required: true, message: '请上传文章封面' }]}
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
                rules={[{ required: true, message: '请选择版权声明' }]}
              >
                 <Select placeholder="请选择版权声明">
                  <Select.Option value="CCO">CCO(公共领域贡献)</Select.Option>
                  <Select.Option value="CC-4.0">CC-4.0(知识共享 4.0 国际许可协议)</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="分类"
                name="category"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Select.Option value="original">原创</Select.Option>
                  <Select.Option value="translation">翻译</Select.Option>
                  <Select.Option value="archive">归档</Select.Option>
                </Select>
              </Form.Item>
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
                文章标签
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
          <Link href="/blogs" className={styles.cancelButton}>
            取消
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            <Save className={styles.submitIcon} />
            {isSubmitting ? '创建中...' : '创建文章'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

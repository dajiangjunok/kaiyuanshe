import { useState } from "react"
import { Form, Input, DatePicker, Upload, Button, Card, message } from "antd"
import { UploadIcon, Save, X } from "lucide-react"
import styles from "./new.module.css"
import UploadCardImg from "@/components/uploadCardImg/UploadCardImg"
import router from "next/router"
import { createCommunity } from "../api/comunity"

const { TextArea } = Input

export default function NewCityPage() {
    const [form] = Form.useForm()
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cloudinaryImg, setCloudinaryImg] = useState<Record<string, unknown>>();

    const handleSubmit = async (values: Record<string, unknown>) => {
        try {
            console.log('表单数据:', values);
            setIsSubmitting(true);

            // 格式化日期
            const formatDate = (date: any) => {
                if (!date) return '';
                return date.format('YYYY-MM-DD HH:MM:ss');
            };

            const createCommunityRequest = {
                city: String(values.cityName || ''),
                intro: String(values.description || ''),
                cover: String(cloudinaryImg?.secure_url || ''),
                register_link: String(values.applyLink || ''),
                start_date: formatDate(values.createTime) || '',
            };

            console.log('提交数据:', createCommunityRequest);

            // 调用创建社区接口
            const result = await createCommunity(createCommunityRequest);
            if (result.success) {
                message.success(result.message);
                router.push('/community');
            } else {
                message.error(result.message || '创建博客失败');
            }
        } catch (error: unknown) {
            console.error('创建社区失败:', error);
            message.error('创建社区出错，请重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
         router.push('/community');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>新增城市社区</h1>
                <p className={styles.subtitle}>创建一个新的开源社城市社区</p>
            </div>

            <Card className={styles.formCard}>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}
                    initialValues={{
                        publishImmediately: true,
                    }}>
                    <Form.Item
                        label="城市名称"
                        name="cityName"
                        rules={[{ required: true, message: "请输入城市名称" }]}
                    >
                        <Input
                            size="large"
                            placeholder="例如：北京、上海、深圳"
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label="社区介绍"
                        name="description"
                        rules={[{ required: true, message: "请输入社区介绍" }]}
                    >
                        <TextArea
                            rows={5}
                            placeholder="请描述这个城市社区的特色、活动和目标..."
                            className={styles.textarea}
                        />
                    </Form.Item>

                    <Form.Item
                        label="城市 Logo"
                        name="logo"
                        rules={[{ message: "请上传城市 Logo" }]}
                    >
                        <UploadCardImg
                            previewUrl={previewUrl}
                            setPreviewUrl={setPreviewUrl}
                            cloudinaryImg={cloudinaryImg}
                            setCloudinaryImg={setCloudinaryImg}
                            form={form}
                        />
                    </Form.Item>

                    <Form.Item
                        label="创建时间"
                        name="createTime"
                        rules={[{ required: true, message: "请选择创建时间" }]}
                    >
                        <DatePicker
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="选择日期"
                            className={styles.datePicker}
                        />
                    </Form.Item>

                    <Form.Item
                        label="申请链接"
                        name="applyLink"
                        rules={[
                            { required: true, message: "请输入申请链接" },
                            { type: "url", message: "请输入有效的 URL" },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="https://example.com/apply"
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item className={styles.actions}>
                        <Button
                            size="large"
                            onClick={handleReset}
                            icon={<X size={18} />}
                            className={styles.cancelBtn}
                            disabled={isSubmitting}
                        >
                            取消
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            icon={<Save size={18} />}
                            className={styles.submitBtn}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            创建社区
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
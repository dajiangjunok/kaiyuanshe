import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input, Avatar, App as AntdApp, Spin, Empty } from 'antd';
import { MessageCircle, Send, Reply, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './CommentSection.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Comment, 
  getComments, 
  createComment, 
  updateComment, 
  deleteComment,
  getCommentReplies
} from '@/pages/api/comment';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface CommentSectionProps {
  targetType: 'article' | 'event';
  targetId: number;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: number, content: string) => Promise<void>;
  onEdit: (commentId: number, content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
  currentUserId?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  onReply, 
  onEdit, 
  onDelete, 
  currentUserId 
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editContent, setEditContent] = useState(comment.content);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  const isOwner = currentUserId === comment.user_id;

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment.ID, replyContent);
    setReplyContent('');
    setIsReplying(false);
    // 回复后刷新回复列表
    if (showReplies) {
      loadReplies();
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    await onEdit(comment.ID, editContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(comment.ID);
  };

  const loadReplies = async () => {
    if (repliesLoaded) return;
    
    setLoadingReplies(true);
    try {
      const response = await getCommentReplies(comment.ID);
      if (response.code === 200) {
        setReplies(response.data || []);
        setRepliesLoaded(true);
      }
    } catch (error) {
      console.error('加载回复失败:', error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies && !repliesLoaded) {
      loadReplies();
    }
  };

  const formatTime = (time: string) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm');
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <Avatar 
          src={comment.user.avatar} 
          size={40}
          className={styles.commentAvatar}
        >
          {comment.user.username[0]}
        </Avatar>
        <div className={styles.commentMeta}>
          <span className={styles.commentAuthor}>{comment.user.username}</span>
          <span className={styles.commentTime}>{formatTime(comment.created_at)}</span>
        </div>
        {isOwner && (
          <div className={styles.commentActions}>
            <Button
              type="text"
              size="small"
              icon={<Edit size={14} />}
              onClick={() => setIsEditing(true)}
              className={styles.actionButton}
            />
            <Button
              type="text"
              size="small"
              icon={<Trash2 size={14} />}
              onClick={handleDelete}
              className={styles.actionButton}
              danger
            />
          </div>
        )}
      </div>

      <div className={styles.commentBody}>
        {isEditing ? (
          <div className={styles.editForm}>
            <TextArea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              placeholder="编辑评论..."
            />
            <div className={styles.editActions}>
              <Button size="small" onClick={() => setIsEditing(false)}>
                取消
              </Button>
              <Button 
                type="primary" 
                size="small" 
                onClick={handleEdit}
                disabled={!editContent.trim()}
              >
                保存
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.commentContent}>
            {comment.content}
          </div>
        )}

        <div className={styles.commentFooter}>
          <Button
            type="text"
            size="small"
            icon={<Reply size={14} />}
            onClick={() => setIsReplying(!isReplying)}
            className={styles.replyButton}
          >
            回复
          </Button>
          {comment.reply_count > 0 && (
            <Button
              type="text"
              size="small"
              icon={showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              onClick={toggleReplies}
              className={styles.repliesButton}
            >
              {comment.reply_count} 条回复
            </Button>
          )}
        </div>

        {isReplying && (
          <div className={styles.replyForm}>
            <TextArea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
              placeholder="写下你的回复..."
            />
            <div className={styles.replyActions}>
              <Button size="small" onClick={() => setIsReplying(false)}>
                取消
              </Button>
              <Button 
                type="primary" 
                size="small" 
                icon={<Send size={14} />}
                onClick={handleReply}
                disabled={!replyContent.trim()}
              >
                回复
              </Button>
            </div>
          </div>
        )}

        {showReplies && (
          <div className={styles.repliesContainer}>
            {loadingReplies ? (
              <div className={styles.loadingReplies}>
                <Spin size="small" />
                <span>加载回复中...</span>
              </div>
            ) : (
              <div className={styles.repliesList}>
                {replies.map((reply) => (
                  <CommentItem
                    key={reply.ID}
                    comment={reply}
                    onReply={onReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ targetType, targetId }) => {
  const { message } = AntdApp.useApp();
  const { session, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadComments = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(!append);
      const response = await getComments({
        target_type: targetType,
        target_id: targetId,
        page: pageNum,
        page_size: 10,
        order: 'desc'
      });

      if (response.code === 200) {
        const newComments = response.data || [];
        setComments(prev => append ? [...prev, ...newComments] : newComments);
        setHasMore(newComments.length === 10);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('加载评论失败:', error);
      message.error('加载评论失败');
    } finally {
      setLoading(false);
    }
  }, [targetType, targetId, message]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      message.warning('请先登录后发表评论');
      return;
    }

    setSubmitting(true);
    try {
      const response = await createComment({
        content: newComment,
        target_type: targetType,
        target_id: targetId
      });

      if (response.code === 200) {
        message.success('评论发表成功');
        setNewComment('');
        // 重新加载评论列表
        loadComments();
      } else {
        message.error(response.message || '发表评论失败');
      }
    } catch (error) {
      console.error('发表评论失败:', error);
      message.error('发表评论失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (commentId: number, content: string) => {
    if (!isAuthenticated) {
      message.warning('请先登录后回复评论');
      return;
    }

    try {
      const response = await createComment({
        content,
        target_type: targetType,
        target_id: targetId,
        parent_id: commentId
      });

      if (response.code === 200) {
        message.success('回复成功');
        // 刷新评论列表
        loadComments();
      } else {
        message.error(response.message || '回复失败');
      }
    } catch (error) {
      console.error('回复失败:', error);
      message.error('回复失败');
    }
  };

  const handleEdit = async (commentId: number, content: string) => {
    try {
      const response = await updateComment(commentId, { content });
      if (response.code === 200) {
        message.success('评论更新成功');
        // 更新本地评论状态
        setComments(prev => 
          prev.map(comment => 
            comment.ID === commentId ? { ...comment, content } : comment
          )
        );
      } else {
        message.error(response.message || '更新评论失败');
      }
    } catch (error) {
      console.error('更新评论失败:', error);
      message.error('更新评论失败');
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      const response = await deleteComment(commentId);
      if (response.code === 200) {
        message.success('评论删除成功');
        // 从本地状态中移除评论
        setComments(prev => prev.filter(comment => comment.ID !== commentId));
      } else {
        message.error(response.message || '删除评论失败');
      }
    } catch (error) {
      console.error('删除评论失败:', error);
      message.error('删除评论失败');
    }
  };

  const loadMore = () => {
    loadComments(page + 1, true);
  };

  return (
    <div className={styles.commentSection}>
      <div className={styles.commentHeader}>
        <h3 className={styles.commentTitle}>
          <MessageCircle size={20} />
          评论 ({comments.length})
        </h3>
      </div>

      {/* 发表评论 */}
      {isAuthenticated ? (
        <div className={styles.commentForm}>
          <div className={styles.commentFormHeader}>
            <Avatar 
              src={session?.user?.avatar} 
              size={40}
            >
              {session?.user?.username?.[0]}
            </Avatar>
            <div className={styles.commentFormMeta}>
              <span className={styles.commentFormAuthor}>
                {session?.user?.username}
              </span>
            </div>
          </div>
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            placeholder="写下你的评论..."
            className={styles.commentTextArea}
          />
          <div className={styles.commentFormActions}>
            <Button
              type="primary"
              icon={<Send size={16} />}
              onClick={handleSubmitComment}
              loading={submitting}
              disabled={!newComment.trim()}
              className={styles.submitButton}
            >
              发表评论
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.loginPrompt}>
          <p>请先登录后发表评论</p>
        </div>
      )}

      {/* 评论列表 */}
      <div className={styles.commentsList}>
        {loading && comments.length === 0 ? (
          <div className={styles.loading}>
            <Spin size="large" />
            <p>加载评论中...</p>
          </div>
        ) : comments.length === 0 ? (
          <Empty 
            description="暂无评论，来发表第一条评论吧！"
            className={styles.emptyComments}
          />
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment.ID}
                comment={comment}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                currentUserId={session?.user?.uid ? parseInt(session.user.uid) : undefined}
              />
            ))}
            {hasMore && (
              <div className={styles.loadMoreContainer}>
                <Button 
                  type="link" 
                  onClick={loadMore}
                  loading={loading}
                  className={styles.loadMoreButton}
                >
                  加载更多评论
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
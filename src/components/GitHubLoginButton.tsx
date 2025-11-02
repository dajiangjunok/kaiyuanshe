import React from 'react';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

interface GitHubLoginButtonProps {
  loading?: boolean;
  onLoading?: (loading: boolean) => void;
  className?: string;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({ 
  loading = false, 
  onLoading,
  className 
}) => {
  const handleGitHubSignIn = async () => {
    try {
      onLoading?.(true);
      await signIn('github', { 
        callbackUrl: '/' 
      });
    } catch (error) {
      console.error('GitHub 登录失败:', error);
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <Button
      type="default"
      icon={<Github size={18} />}
      onClick={handleGitHubSignIn}
      loading={loading}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        height: '40px',
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4078c0';
        e.currentTarget.style.color = '#4078c0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#d9d9d9';
        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.88)';
      }}
    >
      使用 GitHub 登录
    </Button>
  );
};

export default React.memo(GitHubLoginButton);
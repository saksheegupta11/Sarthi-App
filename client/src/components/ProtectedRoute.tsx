import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import ProfileSetupModal from './ProfileSetupModal';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || (isAuthenticated && profileLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && !userProfile?.name;

  return (
    <>
      <ProfileSetupModal open={showProfileSetup} />
      {children}
    </>
  );
}
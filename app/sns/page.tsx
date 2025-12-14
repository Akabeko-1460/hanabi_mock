"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Social/Sidebar";
import { Widgets } from "@/components/Social/Widgets";
import { SocialTab } from "@/components/Social/SocialTab";
import { PostModal } from "@/components/Social/PostModal";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export default function CommunityPage() {
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const { profile } = useProfile(user);
  const router = useRouter();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handlePost = () => {
    // Optionally trigger a refresh or just rely on Firestore listener in SocialTab
    console.log("Post created");
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  // Don't render if not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
        userProfile={profile}
        onPost={handlePost}
      />

      <div className="flex w-full">
        {/* Left Sidebar */}
        <Sidebar onPostClick={() => setPostModalOpen(true)} />

        {/* Main Feed (Center) */}
        <main className="flex-1 w-full border-x border-white/20 min-h-screen">
          <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-white/20">
            <div className="flex w-full">
              <div className="flex-1 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 py-4 cursor-pointer relative">
                <div className="w-2 h-2 bg-gradient-to-tr from-orange-500 to-red-600 rotate-45" />
                <span className="font-bold text-white">おすすめ</span>
              </div>
              <div className="flex-1 hover:bg-white/10 transition-colors text-center py-4 text-white/50 font-medium cursor-pointer">
                フレンド
              </div>
            </div>
          </div>

          <div className="pb-20">
            <div className="p-4">
              <SocialTab />
            </div>
          </div>
        </main>

        {/* Right Widgets */}
        <Widgets />
      </div>
    </div>
  );
}

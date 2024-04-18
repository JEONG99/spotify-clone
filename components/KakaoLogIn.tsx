import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const KakaoLogIn = () => {
  const supabase = useSupabaseClient();
  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
  };

  return (
    <Button
      className="bg-transparent px-6 py-2 font-semibold text-lg"
      onClick={signInWithKakao}
    >
      로그인
    </Button>
  );
};

export default KakaoLogIn;

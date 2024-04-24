"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UploadModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useUploadModal();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      genre: "",
      song: null,
      image: null,
    },
  });
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const image = values.image[0];
      const song = values.song[0];
      if (!image || !song || !user) {
        toast.error("필드를 채워주세요");
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, song, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        toast.error("노래 업로드에 실패했어요");
        return;
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (imageError) {
        setIsLoading(false);
        toast.error("이미지 업로드에 실패했어요");
        return;
      }

      const { error: uploadError } = await supabase.from("songs").insert({
        title: values.title,
        genre: values.genre,
        song_path: songData.path,
        image_path: imageData.path,
      });
      if (uploadError) {
        setIsLoading(false);
        toast.error("업로드에 실패했어요");
        return;
      }

      router.refresh();
      setIsLoading(false);
      toast.success("업로드에 성공했어요");
      onClose();
    } catch (e) {
      toast.error("다시 시도해 주세요");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="노래 추가"
      description="mp3 파일을 업로드해 주세요"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="노래 제목"
        />
        <Input
          id="genre"
          disabled={isLoading}
          {...register("genre", { required: true })}
          placeholder="노래 장르"
        />
        <div>
          <div className="pb-1">노래 파일 선택</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
            className="pl-[6px] file:text-neutral-300 cursor-pointer"
          />
        </div>
        <div>
          <div className="pb-1">이미지 선택</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
            className="pl-[6px] file:text-neutral-300 cursor-pointer"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-neutral-900 hover:bg-neutral-900/50"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
